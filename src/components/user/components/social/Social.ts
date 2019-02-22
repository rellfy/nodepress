import Mongoose from "mongoose";
import { DirectMessageModel, IDirectMessage } from "./DirectMessageModel";

class Social {

    private config: SocialConfig;

    constructor(config: SocialConfig) {
        this.config = config;
    }

    async sendDirectMessage(from: Mongoose.Types.ObjectId, to: Mongoose.Types.ObjectId, message: string) {
        if (message.length > this.config.maxMessageLength)
            throw new Error(`Message is too long (${this.config.maxMessageLength} characters allowed)`);
        
        if (message.replace(/ /g, '') == '')
            throw new Error('You cannot send an empty message');
        
        if (!Mongoose.Types.ObjectId.isValid(to))
            throw new Error('Invalid recipient ID');

        const dm: IDirectMessage = {
            from: new Mongoose.Types.ObjectId(from),
            to: new Mongoose.Types.ObjectId(to),
            content: message
        };

        return DirectMessageModel.create(dm);
    }
}

interface SocialConfig {
    maxMessageLength: number;
} 

export { Social, SocialConfig };