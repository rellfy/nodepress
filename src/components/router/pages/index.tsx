import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { HashRouter, Route, Switch } from 'react-router-dom';
import * as History from 'history';

class Index extends React.Component {

    public static renderString(element: React.ReactElement<any>): string {
        return ReactDOM.renderToString(element);
    }

    public get Element(): React.ReactElement<HashRouter> {
        return (
            <HashRouter basename="/">
                <Switch>
                    { this.props.children }
                </Switch>
            </HashRouter>
        )
    }
}

export { Index }