import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import marked from "marked";
import katex from "katex";
import { number } from "joi";

const PostContainer = styled.div`
    display: grid;
    width: 100%;
    margin: 2.5rem auto;
    grid-area: f;
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: auto;
    grid-template-areas:
    "t"
    "b"
    "i"
    "c"
    "f";
`;
const Title = styled.div`
    grid-area: t;
    text-align: left;
    font-size: 12em;
    color: #f0f0f0;
    padding: 0 20% 1.5rem 20%;
    cursor: pointer;
    text-transform: uppercase;
`;
const Banner = styled.img`
    display: inline-block;
    grid-area: b;
    padding: 2px ${props => props.theme.horizontalPadding};
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #121319;
    max-height: 50em;
`;
const Info = styled.div`
    grid-area: i;
    padding: 1rem calc(20% + 1rem);
`;
const InfoElement = styled.div`
    display: inline-block;
    padding: .25em 1em;
    background-color: rgba(0,0,0,0.15);
    color: rgba(255,255,255,0.65);
    border-radius: .25em;
    font-size: 0.75em;
    cursor: default;

    :not(:last-child) {
        margin-right: .5em;
    }
`;
const Content = styled.div`
    grid-area: c;
    padding: 2rem 20%;
    font-size: 1.25rem;
`;
const Footer = styled.div`
    grid-area: f;
    margin: auto;
    width: 80%;
    height: 1px;
    background: rgba(255,255,255,0.1);
`;
const ExpandButton = styled.div`
    grid-area: f;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.5);;
    text-align: center;
    font-size: 0.8rem;
    line-height: 2.5rem;
    height: 2.5rem;
    width: 80%;
    margin: auto;
    margin-bottom: 10em;
    user-select: none;
`;

export interface IMetadata {
    date: Date;
    author?: string;
    image?: string;
    edits?: number;
    tags?: string[];
}

export interface IPost {
    title: string;
    content: string;
    metadata: IMetadata;
}

interface IProps {
    post?: any; // Used to directly pass post data from feed.
    query?: any;
    retracted?: boolean;
}
interface IState {
    post: IPost | null;
    expanded: boolean;
    imageWidth: number;
    windowWidth: number;
    message?: string;
    processedContent?: string;
}

const max_retracted_char_count = 500;

export class PostView extends React.Component<IProps, IState> {

    public componentWillMount() {
        this.setPost(this.props.post);
        this.setState({
            expanded: !this.props.retracted,
            imageWidth: 0,
            windowWidth: window.innerWidth
        });

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            // highlight: (code: any, lang: any) => {
            //     //if (typeof lang === 'undefined') {
            //        // return hljs.highlightAuto(code).value;
            //     //} else if (lang === 'nohighlight') {
            //         //return code;
            //     //}
                
            //     ///return hljs.highlight(lang, code).value;
                
            //     return code;
            // },
        });
    }

    public async componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);

        if (this.props.post != null)
            return;

        const path = location.pathname;
        let pathPostName = path.slice(path.lastIndexOf('/') + 1, path.indexOf('?') > -1 ? path.indexOf('?') : path.length);

        const query = this.props.query ?? { post_title: pathPostName };
        const post = await PostView.fetchPost(query);

        if (post == null) {
            this.setState({
                message: 'not found'
            });
            return;
        }
        
        await this.setPost(post);
    }
    
    public componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    
    private async setPost(post: IPost) {
        // @ts-ignore - Convert date from string to object.
        post?.metadata.date = new Date(post?.metadata.date);
        // Limit post count.
        let processedContent = this.state?.expanded ?
            post?.content :
            post?.content.substr(0, max_retracted_char_count) ?? '';
        // Check number of times "$$" happens in the split content.
        const katexCount = (processedContent.split('$$').length - 1)
        // Append "$$" to processed content if cut within a katex input.
        if (!this.state?.expanded && katexCount % 2 != 0)
            processedContent += '$$';
        // Process marked.
        processedContent = await this.processMarked(processedContent);
        // Process katex.
        processedContent = this.processKatex(processedContent);

        this.setState({
            post,
            processedContent
        });
    }

    public static async fetchPost(query: any): Promise<any> {
        const formData = JSON.stringify(query);

        return new Promise((resolve) => {
            fetch('/fetch', {
                method: 'post',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (response: any) => {
                try {
                    const post = await response.json();
                    resolve(post);
                } catch(error) {
                    resolve(null);
                }
            });
        });
    }

    private onImageLoad(event: any) {
        this.setState({
            imageWidth: event.target.width
        });
    }

    private handleResize() {
        this.setState({
            windowWidth: window.innerWidth
        });
    }
    
    private expand() {
        if (this.state.expanded || this.state.post == null)
            return;

        // Redirect user to post page.
        let parsedTitle = this.state.post.title.replace(/ /g, '_');
        location.href = location.origin + '/read/' + encodeURI(parsedTitle);
    }

    private renderExpandButton() {
        if (!this.props.retracted || this.state.post == null || this.state.post.content.length <= max_retracted_char_count)
            return;

        return <ExpandButton onClick={this.expand.bind(this)}>view full post</ExpandButton>
    }

    private getSuffix(n: number) {
        if (n >= 11 && n <= 13)
            return "th";
        
        switch (n % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    private processMarked(input: string): Promise<string> {
        return new Promise((resolve, reject) => {
            marked.parse(input, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            });
        });
    }

    private processKatex(input: string): string {
        interface KatexMatch {
            startIndex?: number;
            endIndex: number;
            length?: number;
            string?: string;
        };
        
        const toProcess: KatexMatch[] = [];

        function replaceAdditive(str: string, i: number, length: number, replacement: string): string {
            return str.substr(0, i) + replacement + str.substr(i + length);
        }

        for (let i = input.length; i-- > 1;) {
            const current = toProcess[toProcess.length - 1];
            const foundStart = current != null && current.length == null;
            const foundKatex = input[i] == '$' && input[i - 1] == '$';

            if (!foundKatex)
                continue;

            if (!foundStart) {
                toProcess.push({
                    endIndex: i
                });
                continue;
            }
         
            current.startIndex = i - 1;
            current.length = current.endIndex - current.startIndex - 1;
            current.string = katex.renderToString(input.substr(current.startIndex + 2, current.length - 2));

            // Store current input length.
            let length = input.length;
            // Replace string with processed formula.
            input = replaceAdditive(input, current.startIndex, current.length + 2, current.string);
            // Compensate for length change.
            i -= length - input.length;
        }

        return input;
    }

    private renderInfo(): string[] {
        let info: string[] = [];

        // Publishing date.
        const edits: number = (this.state.post?.metadata.edits ?? 0);
        const edited: boolean = edits > 0;
        console.log('metadata: ', this.state.post?.metadata);
        const published: string = `${edited ? 'First p':'P'}ublished on ${this.state.post?.metadata.date.toLocaleDateString()}`;
        info[info.length] = published;

        // Current edition.     
        const edition: string = (edits+1).toString();
        const currentEdition: string = edited ? `${edition}${this.getSuffix(parseInt(edition))} edition` : '';

        if (currentEdition != '')
            info[info.length] = currentEdition;

        // Author.
        const author = this.state.post?.metadata.author ? `by ${this.state.post?.metadata.author}` : '';

        if (author != '')
            info[info.length] = author;

        // Tags.
        if (this.state.post?.metadata.tags != null)
            info = [...info, ...this.state.post?.metadata.tags];

        return info;
    }

    public render() {
        if (this.state.post == null || this.state.processedContent == null)
            return (
                <div>{ this.state.message ? this.state.message : '' }</div>
            );

        return (
            <PostContainer>
                <Title onClick={this.expand.bind(this)} className="title">{ this.state.post.title }</Title>
                { this.state.post.metadata.image != null &&
                    <ThemeProvider theme={{ horizontalPadding: `${(this.state.windowWidth - this.state.imageWidth)/2}px`}}>
                        <Banner src={this.state.post.metadata.image} onLoad={this.onImageLoad.bind(this)} />
                    </ThemeProvider> }
                <Info>{ this.renderInfo().map((text, key) => {
                    return <InfoElement key={key}>{ text }</InfoElement>
                }) }</Info>
                <Content dangerouslySetInnerHTML={{__html: this.state.processedContent ?? ''}} ></Content>
                { this.renderExpandButton() }
                <Footer />
            </PostContainer>
        )
    }
}