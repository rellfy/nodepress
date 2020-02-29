import * as React from 'react';
import styled from 'styled-components'

const LoginPanel = styled.div`
    transition: width .2s left .2s;
    display: block;
    width: 70vw;
    height: 40em;
    position: absolute;
    top: calc((100vh / 2) - 20em);
    left: calc((100vw / 2) - 35vw);
    background: rgba(0,0,0,0.25);

    @media screen and (min-width: 900px) {
        width: 50vw;
        left: calc((100vw / 2) - 25vw);
    }

    @media screen and (min-width: 1600px) {
        width: 30vw;
        left: calc((100vw / 2) - 15vw);
    }
`;
const Title = styled.div`
    display: block;
    margin: 0;
    width: 100%;
    height: 1.5em;
    padding: 1em 0;
    font-size: 2em;
    text-align: center;
    color: #fff;
`;
const LoginMessageBox = styled.div`
    color: #f0f0f0;
    display: block;
    width: 100%;
    height: 2em;
    padding: 1em 0;
    text-align: center;
`;
const LoginInput = styled.input`
    color: #e0e0e0;
    display: block;
    width: 80%;
    height: 4em;
    padding: 3em;
    text-align: left;
    margin: 2em auto;
    background: rgba(1,1,1,0.25);
    border: none;
`;
const LoginButton = styled.button`
    transition: background-color .1s;
    color: rgba(255,255,255,0.4);
    display: block;
    width: 65%;
    padding: 2em 1em;
    margin: 1em auto;
    background-color: rgba(255,255,255,.05);
    border: 2px solid rgba(0,0,0,0.4);
    cursor: pointer;
    outline: none;

    :hover {
        background-color: rgba(255,255,255,.075);
    }

    :active {
        background-color: rgba(255,255,255,.1);
    }
`;

interface IProps { }
interface IState {
    username: string;
    password: string;
    message: string;
}

class LoginComponent extends React.Component<IProps, IState> {

    componentWillMount() {
        this.setState({
            username: '',
            password: '',
            message: ''
        });
    }

    updateInput(event: React.ChangeEvent<any>) {
        // @ts-ignore
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    }

    login(e: any) {
        e.preventDefault();

        const formData = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });

        fetch('/login', {
            method: 'post',
            body: formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            this.setState({
                password: '',
                message: 'Logging in'
            });

            return response.json();
        }).then((data: any) => {
            this.setState({
                message: data.success ? 'Redirecting...' : 'Login failed'
            });

            if (!data.success)
                return;

            document.cookie = `auth=${data.token}; expires=0; path=/`;
            setTimeout(this.redirect, 250);
        });
    }

    redirect() {
        let params = new URLSearchParams(window.location.search);

        if (params.has('to')) {
            location.href = location.origin + params.get('to');
            return;    
        }

        location.href = location.origin;
    }

    render() {
        return (
            <LoginPanel>
                <Title>Login</Title>
                <LoginMessageBox>{ this.state.message }</LoginMessageBox>
                <form onSubmit={this.login.bind(this)}>
                    <LoginInput
                        onChange={this.updateInput.bind(this)}
                        name="username"
                        type="text"
                        placeholder="Username" />
                    <LoginInput
                        onChange={this.updateInput.bind(this)}
                        name="password"
                        type="password"
                        placeholder="Password" />
                    <LoginButton
                        name="submit"
                        type="submit">dewit</LoginButton>
                </form>
            </LoginPanel>
        )
    }
}

module.exports = LoginComponent;