import Mongoose, { MongooseDocument, DocumentQuery } from 'mongoose';
import Joi, { strict, string } from 'joi';
import Boom from 'boom';

export interface IUser {
    _id?: Mongoose.Types.ObjectId;
    token?: string;
    username?: string;
    role?: string;
    email?: {
        address: string
    };
    credentials?: {
        password: string;
        salt: string;
    }
}

class Model {

    static get Name(): string {
        return 'user';
    }

    static get Schema(): Mongoose.Schema {

        const options: Mongoose.SchemaOptions = {
            strict: true,
            shardKey: true,
            collection: 'users'
        };

        const schema = new Mongoose.Schema({
            _id: { type: Mongoose.Types.ObjectId, auto: true },
            username: { type: String, required: true },
            role: { type: String, required: true },
            token: { type: String, required: true },
            email: {
                address: { type: String }
            },
            credentials: {
                password: { type: String, required: true },
                salt: { type: String, required: true },
            }
        }, options);

        return Model.Hook(schema);
    }

    static get JoiSchema(): Joi.SchemaLike {
        return Joi.object().keys({
            _id: Joi.object(),
            token: Joi.string(),
            username: Joi.string().min(3).max(16).alphanum(),
            role: Joi.string().max(16).alphanum(),
            email: Joi.object().keys({
                address: Joi.string().email()
            }),
            credentials: Joi.object().keys({
                salt: Joi.string().min(3),
                password: Joi.string().min(3),
            })
        });
    }

    static Hook(Schema: Mongoose.Schema): Mongoose.Schema {

        Schema.pre('save', async function() {
            const { error, value } = Joi.validate(Object.assign({}, this), Model.JoiSchema, { allowUnknown: true });

            if (error)
                throw new Mongoose.Error(error.message);

            await Model.RegisterVerification(this);
        });

        return Schema;
    }

    static async RegisterVerification(model: IUserDocument) {

        const query: any = {
            $or: [
                { _id: model._id },
                { username: new RegExp('^' + model.username + '$', 'i') },
                { token: model.token }
            ]
        }
        
        if (model.email != null && model.email.address != null)
            query.$or.push({ 'email.address': model.email.address });

        const users = await UserModel.find(query);

        if (users.length > 0)
            throw Boom.badRequest('An user with the same username or email is already registered');
    };
}

export type IUserDocument = Mongoose.Document & IUser;

const UserModel: Mongoose.Model<IUserDocument> = Mongoose.model<IUserDocument>(Model.Name, Model.Schema);

export { UserModel };