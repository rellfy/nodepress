import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import * as History from 'history';
import { PostRouteComponent } from '../../../plugins/post/PostComponent';

const history = History.createBrowserHistory();

class Page {

    public static render() {
        const element = (
            <Test />
        );

        ReactDOM.render(element, document.getElementById('root'));
    }
}

class Test extends React.Component {

    render() {
        return <div style={{color: 'red'}}>hi there!!!</div>
    }
}

Page.render();
