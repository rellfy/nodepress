import Fastify from 'fastify';
import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { IPost, IPostDocument, PostModel } from "./PostModel";
import Mongoose from "mongoose";
import { ServerResponse, IncomingMessage } from 'http';

class PostPublish extends Route {

    public get route(): RouteModel {
        return new RouteModel({
            method: 'POST',
            endpoint: '/post',
            auth: true,
            schema : {
                body: {
                    post_title: { type: 'string', required: true },
                    content: { type: 'string', required: true },
                    author: { type: 'string', required: true },
                }
            },
            handler: this.process.bind(this)
        });
    }

    public async process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>) {
        await super.process(request, reply);

        const post: IPost = {
            title: request.body.post_title,
            content: request.body.content,
            metadata: {
                date: new Date(),
                author: request.body.author,
            }
        }

        await PostPublish.createPost(post);
        return { success: true };
    }

    public static async createPost(post: IPost) {
        const objectId = new Mongoose.Types.ObjectId();

        post._id = objectId;

        const document: IPostDocument = await PostModel.create(post);
    }
}

export { PostPublish }