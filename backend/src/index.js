"use strict";

import express from 'express'
import bodyParser from 'body-parser';
import jwtMiddleware from './middlewares/checkAuth.middleware.js';
import userRouter from './routes/users.route.js';
import bookRouter from './routes/books.route.js';
import borrowBookRouter from './routes/borrowBook.route.js';
import authRouter from './routes/auth.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

const init = () => {

   const options = {
      definition: {
         openapi: "3.0.0",
         info: {
            title: "Book Library REST API",
            version: "1.0.0",
            description: "Book Library REST API",
         },
         components: {
            securitySchemes: {
               bearerAuth: {
                  type: 'http',
                  in: 'header',
                  name: 'Authorization',
                  description: 'Bearer token to access these api endpoints',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
               },
            },
         },
         security: [
            {
               bearerAuth: [],
            },
         ],
         servers: [
            {
               url: "http://localhost:3000"
            }
         ]
      },
      apis: ["./src/routes/*.js", "./src/models/*.js"]
   }

   const specs = swaggerJSDoc(options);

   const app = express();
   const port = process.env.PORT ?? 3000;

   app.use(bodyParser.json());
   app.use('/api/auth', authRouter)
   app.use('/api/borrow-book', jwtMiddleware, borrowBookRouter);
   app.use('/api/users', jwtMiddleware, userRouter);
   app.use('/api/books', jwtMiddleware, bookRouter);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

   app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
   })
}

init();