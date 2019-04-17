import * as React from 'react';
import styled from 'styled-components'

interface IProps { }
interface IState {
    textbox: string;
    title: string;
}

const PostPanel = styled.div`
    display: grid;
    width: 80vw;
    margin: 3vh auto;
    grid-template-columns: repeat(4, 20vw);
    grid-template-rows: 7vh 83vh;
    grid-template-areas:
    "h h h ."
    "p p p s";
`;
const Title = styled.input`
    grid-area: h;
    position: relative;
    height: 85%;
    background-color: rgba(255,255,255,0.025);
    outline: none;
    border: none;
    color: #f0f0f0;
    font-size: 1.5em;
    font-weight: 100;
    text-align: left;
    padding: 0.5% 2.5%;
`;
const TextBox = styled.textarea`
    grid-area: p;
    background-color: rgba(255,255,255,0.025);
    outline: none;
    border: none;
    color: #f0f0f0;
    max-width: 100%;
    min-width: 100%;
    padding: 2.5%;
    resize: none;
    font-size: 1em;
`;
const Sidebar = styled.aside`
    grid-area: s;
`;
const SidebarButton = styled.div`
    transition: background 0.2s, color 0.2s;
    background: rgba(0,200,255,0.15);
    color: #ccc;
    text-align: center;
    padding: 20px;
    width: 75%;
    margin: auto;
    cursor: default;

    &.active {
        background: #00aaee;
        color: #f0f0f0;
        cursor: pointer;
    }    
`;

class PostComponent extends React.Component<IProps, IState> {

    componentWillMount() {
        this.setState({
            textbox: '',
            title: ''
        });
    }

    get canPublish() {
        return this.state.textbox.length > 0 && this.state.title.length > 0;
    }

    updateInput(event: React.ChangeEvent<any>) {
        // @ts-ignore
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    }

    publish() {
        if (!this.canPublish)
            return;

        console.log('CLICKED');
    }

    render() {
        return (
            <div>
                <PostPanel>
                    <Title name="title"
                           placeholder="Post title"
                           value={this.state.title}
                           onChange={this.updateInput.bind(this)} />
                    <TextBox name="textbox"
                             placeholder="Write your quality content here"
                             onChange={this.updateInput.bind(this)}>{this.state.textbox}</TextBox>
                    <Sidebar>
                        <SidebarButton className={this.canPublish ? 'active' : ''}
                                       onClick={this.publish.bind(this)}>Publish</SidebarButton>
                    </Sidebar>
                </PostPanel>
            </div>
        )
    }
}

module.exports = PostComponent;