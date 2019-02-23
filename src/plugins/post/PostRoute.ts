import { Route } from "../../components/router/Route";
import { RouteModel } from "../../components/router/RouteModel";
import { Router } from "../../components/router/Router";

class PostRoute extends Route {

    constructor() {
        super();

        this.initialise(this.route());
    }

    protected route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/post',
            schema : null,
            handler: this.process.bind(this)
        });
    }

    public async process(request: any, reply: any) {
        await super.process(request, reply);
        
        const str = (
            `index page!`
        );

        reply.send(str);
    }
}

export { PostRoute }