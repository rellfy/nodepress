import Fastify from 'fastify';
import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { Router } from "../../components/router/Router";
import Mongoose from "mongoose";
import { ServerResponse, IncomingMessage } from 'http';

class FeedRoute extends Route {

    constructor() {
        super();

        this.initialise(FeedRoute.route());
    }

    public static route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/',
            // auth: true,
            schema : { indexRoute: true },
            handler: this.process.bind(this)
        });
    }
}

class FeedTagRoute extends Route {

    constructor() {
        super();

        this.initialise(FeedRoute.route());
    }

    public static route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/tag/',
            // auth: true,
            schema : { indexRoute: true },
            handler: this.process.bind(this)
        });
    }
}


export { FeedRoute, FeedTagRoute }