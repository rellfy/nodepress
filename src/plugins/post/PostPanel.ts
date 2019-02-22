import { Route } from "../../components/network/router/NetRoute";
import { RouteModel } from "../../components/network/router/RouteModel";
import { Router } from "../../components/network/router/Router";

class PostPanel extends Route {

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

export { PostPanel }