import Mongoose from 'mongoose';
import Joi, { strict, string } from 'joi';

export interface IDirectMessage {
    from: Mongoose.Types.ObjectId;
    to: Mongoose.Types.ObjectId;
    content: string;
}

class Model {

    static get Name(): string {
        return 'direct_message';
    }

    static get Schema(): Mongoose.Schema {

        const options: Mongoose.SchemaOptions = {
            strict: true,
            shardKey: true,
            collection: 'direct_messages'
        };

        const schema = new Mongoose.Schema({
            from: { type: Mongoose.Types.ObjectId, required: true },
            to: { type: Mongoose.Types.ObjectId, required: true },
            content: { type: String, required: true }
        }, options);

        return Model.Hook(schema);
    }

    static get JoiSchema(): Joi.SchemaLike {
        return Joi.object().keys({
            from: Joi.object(),
            to: Joi.object(),
            content: Joi.string().max(1000)
        });
    }

    static Hook(Schema: Mongoose.Schema): Mongoose.Schema {

        Schema.pre('validate', function(next) {
            const { error, value } = Joi.validate(this, Model.JoiSchema);
            
            next(error ? new Mongoose.Error(error.message) : undefined);
        });

        return Schema;
    }
}

type IDirectMessageDocument = IDirectMessage & Mongoose.Document;

const DirectMessageModel: Mongoose.Model<IDirectMessageDocument> = Mongoose.model<IDirectMessageDocument>(Model.Name, Model.Schema);

export { DirectMessageModel };