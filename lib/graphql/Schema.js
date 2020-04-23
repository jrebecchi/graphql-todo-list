"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_compose_1 = require("graphql-compose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const Todo_1 = __importDefault(require("../model/Todo"));
const TodoTC = graphql_compose_mongoose_1.composeWithMongoose(Todo_1.default);
graphql_compose_1.schemaComposer.Query.addFields(Object.assign({}, restricAccess({
    todoOne: TodoTC.getResolver('findMany'),
    todoMany: TodoTC.getResolver('findMany'),
    todoCount: TodoTC.getResolver('count'),
    todoPagination: TodoTC.getResolver('pagination')
})));
graphql_compose_1.schemaComposer.Mutation.addFields(Object.assign({}, restricAccess({
    todoCreateOne: TodoTC.getResolver('createOne'),
    todoUpdateOne: TodoTC.getResolver('updateOne'),
    todoRemoveOne: TodoTC.getResolver('removeOne'),
    todoRemoveMany: TodoTC.getResolver('removeMany')
})));
function restricAccess(resolvers) {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve(next => req => {
            if (hasForeignUserId(req.args, req.context.userId))
                throw new Error('Not allowed');
            return next(req);
        });
    });
    return resolvers;
}
function hasForeignUserId(args, userId) {
    const list = [args];
    while (list.length > 0) {
        const element = list.shift();
        for (let [key, value] of Object.entries(element)) {
            if (key === 'userId' && value !== userId) {
                return true;
            }
            if (typeof value === 'object') {
                list.push(value);
            }
        }
    }
    return false;
}
exports.default = graphql_compose_1.schemaComposer.buildSchema();
//# sourceMappingURL=Schema.js.map