import Mongoose from 'mongoose';
export interface IUser {
    _id?: Mongoose.Types.ObjectId;
    token?: string;
    username?: string;
    role?: string;
    email?: {
        address: string;
    };
    credentials?: {
        password: string;
        salt: string;
    };
}
export declare type IUserDocument = Mongoose.Document & IUser;
declare const UserModel: Mongoose.Model<IUserDocument>;
export { UserModel };
