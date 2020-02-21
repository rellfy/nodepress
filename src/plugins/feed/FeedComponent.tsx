import * as React from 'react';
import styled from 'styled-components'
import { PostView, IPost } from '../reader/PostView';

const FeedContainer = styled.div`
    display: grid;
    width: 100%;
    margin: 0;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "f f f"
    "f f f";
`;
const Feed = styled.div`
    grid-area: f;
`;
const LoadMore = styled.div`
    grid-area: f;
    cursor: pointer;
    border: 2px solid rgba(255,255,255,0.25);;
    text-align: center;
    font-size: 0.9rem;
    line-height: 3.5rem;
    height: 3.5rem;
    width: 100%;
    user-select: none;
`;

interface IProps { }
interface IState { 
    posts: IPost[]
    currentDescendingPostIndex: number;
    loading: boolean;
    loadedAll: boolean;
}

class FeedComponent extends React.Component<IProps, IState> {

    public componentWillMount() {
        this.setState({
            posts: [],
            currentDescendingPostIndex: 0,
            loading: true,
            loadedAll: false
        });
    }
    
    public async componentDidMount() {
        await this.loadPosts(5);
    }
    
    public async loadPosts(quantity: number) {
        const query = {
            from_descending_index: this.state.currentDescendingPostIndex,
            to_descending_index: this.state.currentDescendingPostIndex + quantity
        };

        const posts: IPost[] = await PostView.fetchPost(query);

        this.setState({
            currentDescendingPostIndex: this.state.currentDescendingPostIndex + quantity,
            posts: [...this.state.posts, ...posts],
            loading: false,
            loadedAll: posts.length < quantity
        });
    }
    
    public render() {
        return (
            <FeedContainer>
                {/*<Sidebar>
                </Sidebar>*/}
                <Feed>
                   { this.state.posts.reverse().map((post, key) => {
                       return <PostView retracted post={post} key={key} />
                   }) }
                </Feed>
            { !this.state.loading && !this.state.loadedAll &&
                <LoadMore onClick={() => { this.loadPosts(5) }}>load more</LoadMore> }
            </FeedContainer>
        )
    }
}

module.exports = FeedComponent;