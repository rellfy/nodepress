import Mongoose from 'mongoose';
export interface IPost {
    _id?: Mongoose.Types.ObjectId;
    title?: string;
    content?: string;
    metadata?: {
        date: Date;
        author: string;
    };
}
export declare type IPostDocument = Mongoose.Document & IPost;
declare const PostModel: Mongoose.Model<IPostDocument>;
export { PostModel };
