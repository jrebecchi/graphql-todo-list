"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const Schema_1 = __importDefault(require("./graphql/Schema"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const publicKey = process.env.PUBLIC_KEY;
console.log(process.env.MONGODB_URI);
mongoose_1.default.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        process.exit(0);
    });
});
const app = express_1.default();
app.use(cors_1.default({
    origin: function (origin, callback) {
        return callback(null, true);
    },
    credentials: true,
}));
app.use((req, res, next) => {
    req.user = { _id: "123" };
    next();
});
app.use('/', express_graphql_1.default((req) => ({
    schema: Schema_1.default,
    graphiql: true,
    context: {
        userId: req.user._id,
    },
})));
app.listen(process.env.PORT || 5000, () => { console.log("Listening on port " + process.env.PORT || 5000); });
//# sourceMappingURL=index.js.map