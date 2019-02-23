import * as React from 'react';

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

export { PostComponent }