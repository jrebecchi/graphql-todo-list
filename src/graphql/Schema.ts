import { schemaComposer, Resolver } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import TodoModel from '../model/Todo';

const TodoTC = composeWithMongoose(TodoModel);

schemaComposer.Query.addFields({
    ...restricAccess({
        todoOne: TodoTC.getResolver('findOne'),
        todoMany: TodoTC.getResolver('findMany'),
        todoCount: TodoTC.getResolver('count'),
        todoPagination: TodoTC.getResolver('pagination'),
    })
});

schemaComposer.Mutation.addFields({
    ...restricAccess({
        todoCreateOne: TodoTC.getResolver('createOne'),
        todoUpdateById: TodoTC.getResolver('updateById'),
        todoUpdateOne: TodoTC.getResolver('updateOne'),
        todoRemoveById: TodoTC.getResolver('removeById'),
        todoRemoveOne: TodoTC.getResolver('removeOne'),
        todoRemoveMany: TodoTC.getResolver('removeMany')
    })
});

function restricAccess(resolvers: { [name: string]: Resolver }): { [name: string]: Resolver } {
    Object.keys(resolvers).forEach((k) => {
        resolvers[k] = resolvers[k].wrapResolve(next => req => {
            if (hasForeignUserId(req.args, req.context.userId))
                throw new Error('Not allowed')
            return next(req)
        });
    });
    return resolvers;
}

function hasForeignUserId(args: any, userId: string): boolean {
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

export default schemaComposer.buildSchema();