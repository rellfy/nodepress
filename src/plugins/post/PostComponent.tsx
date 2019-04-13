import * as React from 'react';
import { Route } from 'react-router';

interface IProps { }
interface IState { }

class PostComponent extends React.Component<IProps, IState> {

    render() {
        return (
            <div>
                Post panel!
            </div>
        )
    }
}

const PostRouteComponent = <Route path="/post" component={PostComponent} />

export { PostRouteComponent }
module.exports = PostComponent;