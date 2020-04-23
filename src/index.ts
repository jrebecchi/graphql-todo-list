import express, { NextFunction, Request, Response } from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './graphql/Schema';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

declare global {
    namespace Express {
        export interface Request {
            user: any;
        }
    }
}

const publicKey = process.env.PUBLIC_KEY as string;

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

const app = express();


app.use(cors({
    origin: function(origin, callback){
        return callback(null, true);
    },
    credentials: true,
}));

app.use((req: Request, res: Response, next: NextFunction) => {
    req.user = { _id: "123" };
    next();
});

app.use('/',
    graphqlHTTP((req: Request) => ({
        schema: Schema,
        graphiql: true,
        context: {
            userId: req.user._id,
        },
    }))
);

app.listen(process.env.PORT || 5000, () => { console.log("Listening on port " + process.env.PORT || 5000) });