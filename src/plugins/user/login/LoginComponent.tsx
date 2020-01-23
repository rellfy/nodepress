import * as React from 'react';
import styled from 'styled-components'

const LoginPanel = styled.div`
    display: block;
    width: 30vw;
    height: 20em;
    position: absolute;
    top: calc((100vh / 2) - 10em);
    left: calc((100vw / 2) - 15vw);
`;
const Title = styled.div`
    height: 3em;
    padding: 1em;
    text-align: center;
    font-size: 2em;
    color: #fff;
`;
const LoginMessageBox = styled.div`
    display: block;
    width: 100%;
    height: 2em;
    padding: 1em;
    text-align: center;
`;
const LoginInput = styled.input`
    width: 75%;
`;
const LoginButton = styled.button`
    width: 75%;
`;

interface IProps { }
interface IState {
    username: string;
    password: string;
}

class LoginComponent extends React.Component<IProps, IState> {

    componentWillMount() {
        this.setState({
            username: '',
            password: ''
        });
    }

    updateInput(event: React.ChangeEvent<any>) {
        // @ts-ignore
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    }

    publish() {
        /*console.log('Publishing...');

        const formData = JSON.stringify({
            post_title: this.state.title,
            author: this.state.author || 'anonynous',
            content: this.state.content
        });

        fetch('/post', {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            this.setState({
                content: '',
                title: ''
            });

            alert('Published');
            location.reload();
        });*/
    }

    render() {
        return (
            <LoginPanel>
                <Title>Login</Title>
                <LoginMessageBox></LoginMessageBox>
                <LoginInput name="username" type="text" />
                <LoginInput name="password" type="password" />
                <LoginButton value="Login" name="submit" type="submit" />
            </LoginPanel>
        )
    }
}

module.exports = LoginComponent;