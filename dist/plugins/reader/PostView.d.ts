import * as React from "react";
export interface IMetadata {
    date: Date;
    author?: string;
    image?: string;
    edits?: number;
    tags?: string[];
}
export interface IPost {
    title: string;
    content: string;
    metadata: IMetadata;
}
interface IProps {
    post?: any;
    query?: any;
    retracted?: boolean;
}
interface IState {
    post: IPost | null;
    expanded: boolean;
    imageWidth: number;
    windowWidth: number;
    message?: string;
    processedContent?: string;
}
export declare class PostView extends React.Component<IProps, IState> {
    componentWillMount(): void;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    private setPost;
    static fetchPost(query: any): Promise<any>;
    private onImageLoad;
    private handleResize;
    private expand;
    private renderExpandButton;
    private getSuffix;
    private processMarked;
    private processKatex;
    private renderInfo;
    render(): JSX.Element;
}
export {};
