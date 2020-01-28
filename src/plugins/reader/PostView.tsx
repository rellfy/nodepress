import * as React from 'react';
import styled from 'styled-components'

const PostContainer = styled.div`
    display: grid;
    width: 100%;
    margin: 2.5rem auto;
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
    padding: 2px ${props => props.horizontalPadding};
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
    query?: any; // Used to search for a post once mounted.
    post?: any; // Used to directly pass post data from feed.
    retracted?: boolean;
}
interface IState {
    post: IPost | null;
    expanded: boolean;
    imageWidth: number;
    windowWidth: number;
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
    }

    public componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);

        if (this.props.post != null)
            return;

        PostView.fetchPost(this.props.query, (post: any) => {
            this.setPost(post);
        });
    }
    
    public componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    
    private setPost(post: IPost) {
        // @ts-ignore - Convert date from string to object.
        post.metadata.date = new Date(post.metadata.date);

        this.setState({
            post
        });
    }
    
    public get Content(): string {
        if (this.state.post == null)
            return '';

        if (this.state.expanded || this.state.post.content.length <= max_retracted_char_count)
            return this.state.post.content;

        return this.state.post.content.substring(0, max_retracted_char_count - 1);
    }

    public static fetchPost(query: any, cb: any) {
        const formData = JSON.stringify(query);

        fetch('/fetch', {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async (response: any) => {
            const post = await response.json();

            cb(post);
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
        location.href = location.origin + '/' + encodeURI(parsedTitle);
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
        if (this.state.post == null || this.Content == null)
            return (
                <div>{/* loading */}</div>
            );

        return (
            <PostContainer>
                <Title onClick={this.expand.bind(this)} className="title">{ this.state.post.title }</Title>
                { this.state.post.metadata.image != null && <Banner horizontalPadding={`${(this.state.windowWidth - this.state.imageWidth)/2}px`} src={this.state.post.metadata.image} onLoad={this.onImageLoad.bind(this)} /> }
                <Info>{ this.renderInfo().map((text, key) => {
                    return <InfoElement key={key}>{ text }</InfoElement>
                }) }</Info>
                <Content>{ this.Content.split('\n').map((paragraph, key) => {
                    return <p key={key}>{ paragraph }</p>
                }) }</Content>
                { this.renderExpandButton() }
                <Footer />
            </PostContainer>
        )
    }
}