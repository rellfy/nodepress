import Mongoose, { MongooseDocument, DocumentQuery } from 'mongoose';
import Joi, { strict, string } from 'joi';
import Boom from 'boom';

//
// There are three identical schemas in this file. Something is not right.
//

export interface IPost {
    _id?: Mongoose.Types.ObjectId;
    title?: string;
    content?: string;
    metadata?: {
        date: Date,
        author: string
    }
}

class Model {

    static get Name(): string {
        return 'post';
    }

    static get Schema(): Mongoose.Schema {

        const options: Mongoose.SchemaOptions = {
            strict: true,
            collection: 'posts'
        };

        const schema = new Mongoose.Schema({
            _id: { type: Mongoose.Types.ObjectId, auto: true },
            title: { type: String, required: true },
            content: { type: String, required: true },
            metadata: {
                date: { type: Date, required: true },
                author: { type: String, required: true },
            }
        }, options);

        return Model.Hook(schema);
    }

    static get JoiSchema(): Joi.SchemaLike {
        return Joi.object().keys({
            _id: Joi.object(),
            title: Joi.string().min(1),
            content: Joi.string().min(1),
            metadata: Joi.object().keys({
                date: Joi.date(),
                author: Joi.string().min(3)
            })
        });
    }

    static Hook(Schema: Mongoose.Schema): Mongoose.Schema {

        Schema.pre('save', async function() {
            const { error, value } = Joi.validate(Object.assign({}, this), Model.JoiSchema, { allowUnknown: true });

            if (error)
                throw new Mongoose.Error(error.message);

            await Model.DuplicatePostVerification(this);
        });

        return Schema;
    }

    static async DuplicatePostVerification(model: IPostDocument) {

        const query: any = {
            title: new RegExp(model.title ?? '', 'i')
        }
        
        const users = await PostModel.find(query);
        
        if (users.length > 0)
            throw Boom.badRequest('This title is used in another post');
    };
}

export type IPostDocument = Mongoose.Document & IPost;

const PostModel: Mongoose.Model<IPostDocument> = Mongoose.model<IPostDocument>(Model.Name, Model.Schema);

export { PostModel };