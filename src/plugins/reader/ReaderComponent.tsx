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

    public componentWillMount() {
        this.setState({ });
    }

    public get postTitle(): string {
        const i = location.pathname.lastIndexOf('/');
        const l = location.pathname.length;
        return location.pathname.substr(i + 1, l - 1)
    }

    public render() {
        return (
            <ReaderContainer>
                <PostView query={{post_title: this.postTitle}} />
            </ReaderContainer>
        )
    }
}

module.exports = PostComponent;