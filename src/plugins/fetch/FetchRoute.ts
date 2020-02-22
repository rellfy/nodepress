import Fastify from 'fastify';
import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { Router } from "../../components/router/Router";
import Mongoose from "mongoose";
import { ServerResponse, IncomingMessage } from 'http';
import { PostModel, IPostDocument } from '../post/PostModel';
import Boom from 'boom';


class FetchRoute extends Route {

    constructor() {
        super();

        this.initialise(FetchRoute.route());
    }

    public static route(): RouteModel {
        return new RouteModel({
            method: 'POST',
            endpoint: '/fetch',
            // auth: true,
            schema : {
                body: {
                    post_id: { type: 'string', required: false },
                    post_title: { type: 'string', required: false },
                    from_descending_index: { type: 'string', required: false },
                    to_descending_index: { type: 'string', required: false },
                }
            },
            handler: this.process.bind(this)
        });
    }

    public static async process(request: Fastify.FastifyRequest<IncomingMessage>, reply: Fastify.FastifyReply<ServerResponse>) {
        await super.process(request, reply);
        let fetchMultiple = false;

        let query: any = {};

        if (request.body.post_id != null) {
            query._id = request.body.post_id;
        } else if (request.body.post_title != null) {
            // Case insensitive title search.
            query.title = new RegExp(request.body.post_title, 'i');
        } else if (request.body.from_descending_index != null && request.body.to_descending_index != null) {
            fetchMultiple = true;
        } else {
            throw Boom.badRequest();
        }

        let toReturn: IPostDocument | IPostDocument[];

        if (!fetchMultiple) {
            toReturn = await this.fetchPost(query);
        } else {
            toReturn = await this.fetchPosts(parseInt(request.body.from_descending_index), parseInt(request.body.to_descending_index));
        }

        return toReturn;
    }

    public static async fetchPost(query: any): Promise<IPostDocument> {
        if (query._id != null)
            query._id = new Mongoose.Types.ObjectId(query._id);

        const document: IPostDocument | null = await PostModel.findOne(query);

        if (document == null)
            throw Boom.notFound('Document not found');

        return document;
    }

    public static async fetchPosts(from: number, to: number): Promise<IPostDocument[]> {

        const document: IPostDocument[] = await PostModel.find().sort('-date').skip(from).limit(Math.abs(to - from) || 1);

        if (document == null)
            throw Boom.notFound('Document not found');

        return document;
    }
}

export { FetchRoute }