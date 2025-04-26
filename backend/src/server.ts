import express from "express";
import app from "./app";
import { Server } from "http";
import { config } from "./app/config";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './app/graphql/schema';
import { resolvers } from './app/graphql/resolver';
import jwt from 'jsonwebtoken';

// const main2 = async () => {
//     let server: Server

//     server = app.listen(config.port, () => {
//         console.log('Rest API server is running on port 5000')
//     })
// }




const main = async (): any => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    interface MyContext {
        user?: any;
    }

    const { url } = await startStandaloneServer(server, {
        context: async ({ req }): Promise<MyContext> => {
          const authHeader = req.headers.authorization || '';
          const token = authHeader.replace('Bearer ', '');
      
          try {
            const user = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN!);
            return { user }; // make available in all resolvers
          } catch (err) {
            // Optionally, throw an error or just return empty context
            return {};
          }
        },
        listen: { port: 4000 },
      });

    /* const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    }); */

    console.log(`🚀 GraphQL Server ready at: ${url}`);
}


main(); 
