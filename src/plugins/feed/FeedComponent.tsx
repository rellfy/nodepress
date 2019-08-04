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

interface IProps { }
interface IState { 
    posts: IPost[]
}

class FeedComponent extends React.Component<IProps, IState> {

    componentWillMount() {
        this.setState({
            posts: []
        });
    }

    render() {
        return (
            <FeedContainer>
                {/*<Sidebar>
                </Sidebar>*/}
                <Feed>
                   <PostView query={{post_title: 'Nodepress'}} />
                </Feed>
            </FeedContainer>
        )
    }
}

module.exports = FeedComponent;