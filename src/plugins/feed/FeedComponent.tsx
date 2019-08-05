import * as React from 'react';
import styled from 'styled-components'
import { PostView, IPost } from '../reader/PostView';

// TODO: Implement a responsive sidebar layout.
/*const FeedContainer = styled.div`
    display: grid;
    width: 100vw;
    margin: 0;
    grid-template-columns: 15% auto;
    grid-template-rows: auto;
    grid-template-areas:
    "s f f f"
    "s f f f";
`;*/
const FeedContainer = styled.div`
    display: grid;
    width: 100vw;
    margin: 0;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "f f f"
    "f f f";
`;
/*const Sidebar = styled.aside`
    grid-area: s;
`;*/
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

    componentWillMount() {
        this.setState({
            posts: [],
            currentDescendingPostIndex: 0,
            loading: true,
            loadedAll: false
        });
    }
    
    componentDidMount() {
        this.loadPosts(5);
    }
    
    loadPosts(quantity: number) {
        const query = {
            from_descending_index: this.state.currentDescendingPostIndex,
            to_descending_index: this.state.currentDescendingPostIndex + quantity
        };

        PostView.fetchPost(query, (posts: IPost[]) => {
            this.setState({
                currentDescendingPostIndex: this.state.currentDescendingPostIndex + quantity,
                posts: [...this.state.posts, ...posts],
                loading: false,
                loadedAll: posts.length < quantity
            });
        });
    }
    
    render() {
        return (
            <FeedContainer>
                {/*<Sidebar>
                </Sidebar>*/}
                <Feed>
                   { this.state.posts.map((post, key) => {
                       console.log('returning post ', post);
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