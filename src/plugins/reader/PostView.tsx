import * as React from 'react';
import styled from 'styled-components'

const PostContainer = styled.div`
    display: grid;
    width: 80%;
    margin: 2.5rem auto;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: auto;
    grid-template-areas:
    "t t"
    "b b"
    "i i"
    "c c"
    "f f";
`;
const Title = styled.div`
    grid-area: t;
    text-align: left;
    font-size: 6em;
    color: #f0f0f0;
    padding-bottom: 1.5rem;
    cursor: pointer;
`;
const Banner = styled.div`
    grid-area: b;
    width: 100%;
    border-radius: 0.25rem;
    background-color: white;
    background-size: cover;
    height: 0;
    background-repeat: no-repeat;
    padding-top: 2%;
`;
const Info = styled.div`
    grid-area: i;
    padding: 1rem;
    font-size: 0.75rem;
`;
const Content = styled.div`
    grid-area: c;
    padding: 2rem 0;
    font-size: 1.25rem;
`;
const Footer = styled.div`
    grid-area: f;
    width: 100%;
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
    width: 100%;
    user-select: none;
`;

export interface IPost {
    title: string;
    content: string;
    author: string;
    metadata: any;
}

interface IProps {
    query?: any; // Used to search for a post once mounted.
    post?: any; // Used to directly pass post data from feed.
    retracted?: boolean;
}
interface IState {
    post: IPost | null;
    expanded: boolean;
}

const max_retracted_char_count = 500;

export class PostView extends React.Component<IProps, IState> {

    public componentWillMount() {
        this.setState({
            post: this.props.post,
            expanded: !this.props.retracted
        });
    }

    public componentDidMount() {
        if (this.props.post != null)
            return;

        PostView.fetchPost(this.props.query, (post: any) => {
            this.setState({
                post
            });
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

    public expand() {
        if (this.state.expanded || this.state.post == null)
            return;

        // Redirect user to post page.
        let parsedTitle = this.state.post.title.replace(/ /g, '_');
        location.href = location.origin + '/' + encodeURI(parsedTitle);
    }

    public renderExpandButton() {
        if (!this.props.retracted || this.state.post == null || this.state.post.content.length <= max_retracted_char_count)
            return;

        return <ExpandButton onClick={this.expand.bind(this)}>view full post</ExpandButton>
    }

    public render() {
        if (this.state.post == null || this.Content == null)
            return (
                <div>{/* loading */}</div>
            )

        return (
            <PostContainer>
                <Title onClick={this.expand.bind(this)} className="title">{ this.state.post.title }</Title>
                <Banner />
                <Info />
                <Content>{ this.Content.split('\n').map((paragraph, key) => {
                    return <p key={key}>{ paragraph }</p>
                }) }</Content>
                { this.renderExpandButton() }
                <Footer />
            </PostContainer>
        )
    }
}