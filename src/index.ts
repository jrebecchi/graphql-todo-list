import express, { NextFunction, Request, Response } from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './graphql/Schema';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

dotenv.config();

declare global {
    namespace Express {
        export interface Request {
            user: any;
        }
    }
}

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true });

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

const app = express();

app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    credentials: true,
}));

app.use(jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://nusid.net/krypton-auth/.well-known/jwks.json`
    }),
    algorithms: [ 'RS256' ]
}));

app.use(function (err, req, res, next) {
    next();
});

app.use('/',
    graphqlHTTP((req: Request) => {
        const context: any = {}
        if (req.user) {
            context.userId = req.user[process.env.USER_ID_FIELD_NAME as string || '_id']
        }
        return {
            schema: Schema,
            graphiql: true,
            context
        }
    })
);

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log("Listening on port " + port) });