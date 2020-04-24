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
```
3. Set where to look up the user id in the token

To create a todos you need to be authentified, thus the system needs to access the user ID from the payload of the decrypted JWT token.
If you use MongoDB there is a lot of chance that the user ID is contained in the `_id` field of payload. It is where the system will look up the ID by default. If the user ID is in another field, provide its name by adding this supplementary variable in the `.env` file:

```bash
# Field name containing the user ID in the JWT token
USER_ID_FIELD_NAME=_id
```

You are good to go!