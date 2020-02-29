import Fastify from 'fastify';
import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { Router } from "../../components/router/Router";
import { IPost, IPostDocument, PostModel } from "../post/PostModel";
import Mongoose from "mongoose";
import { ServerResponse, IncomingMessage, ClientRequest } from 'http';

class ReaderRoute extends Route {

    public get route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/read/:post',
            // auth: true,
            schema : { indexRoute: true },
            handler: this.process.bind(this)
        });
    }
}

export { ReaderRoute }