import * as React from 'react';
import styled from 'styled-components'
import { PostView } from './PostView';

const ReaderContainer = styled.div`
    display: grid;
    width: 100%;
    margin: 0;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-template-areas:
    "f f f"
    "f f f";
`;

interface IProps { }
interface IState { }

class PostComponent extends React.Component<IProps, IState> {

    componentWillMount() {
        this.setState({ });
    }

    get postTitle(): string {
        return location.pathname.replace(/\//g, '').replace(/_/g, ' ');
    }

    render() {
        return (
            <ReaderContainer>
                <PostView query={{title:'Nodepress'}} />
            </ReaderContainer>
        )
    }
}

module.exports = PostComponent;