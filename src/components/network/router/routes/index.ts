import { Route } from "../NetRoute";
import { RouteModel } from "../RouteModel";
import { Router } from "../Router";

class Index extends Route {

    constructor() {
        super();

        this.initialise(this.route());
    }

    protected route(): RouteModel {
        return new RouteModel({
            method: 'GET',
            endpoint: '/',
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

module.exports = { Route: Index };