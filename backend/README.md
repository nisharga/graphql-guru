# GraphQL API with Bearer Token Authentication

This project implements a GraphQL API using the provided schema and JSON data sources. The API is authenticated using Bearer tokens.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Make sure your `.env` file contains the necessary environment variables:

   ```
   SECRET_ACCESS_TOKEN=your_secret_token
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The server will start on port 4000.

## Authentication

The API requires a Bearer token for authentication. You can generate a test token using:

```
npm run generate-token
```

This will output a token that you can use for testing.

## Testing the API

You can test the API using the provided test script:

```
npm run test-graphql
```

This will run a sample query to fetch a node by ID.

## Making Requests

To make requests to the API, include the Bearer token in the Authorization header:

```
Authorization: Bearer your_token_here
```

### Example Query

```graphql
query GetNode($nodeId: ID!) {
  node(nodeId: $nodeId) {
    _id
    name
    description
    createdAt
    updatedAt
    root
    trigger {
      _id
      name
      description
    }
    responses {
      _id
      name
      description
      platforms {
        integrationId
        build
        localeGroups {
          localeGroupId
          variations {
            name
            responses
          }
        }
      }
    }
    actions {
      _id
      name
      description
    }
  }
}
```

### Example Variables

```json
{
  "nodeId": "6296be3470a0c1052f89cccb"
}
```

## Data Sources

The API uses the following JSON files as data sources:

- `src/app/graphql/data/node.json`
- `src/app/graphql/data/response.json`
- `src/app/graphql/data/resourceTemplate.json`
- `src/app/graphql/data/trigger.json`
- `src/app/graphql/data/action.json`
