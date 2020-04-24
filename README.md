# GraphQL Todo List

A dead simple todo tist backend with GraphQL. 

It works with JsonWebToken and you need to include your auth token in the Authorization header as an OAuth2 Bearer token.

### Installation

1. Clone the repository

```bash
git clone https://github.com/jrebecchi/graphql-todo-list.git
```

2. Set the environement variables

Create a `.env` file:

```bash
cd graphql-todo-list.git
touch .env
```

Edit it by adding 2 variables:
```bash
# JWT secret or public key
SECRET=a_big_big_secret
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/todos
# Port to connect
PORT=5000
```

You are good to go!