const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const  jwt  =  require ( "express-jwt" ); 
const  typeDefs  =  require ( "./schema" ); 
const  resolvers  =  require ( "./resolvers" ); 
const  JWT_SECRET  =  require ( "./constants" );
const path = require('path');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
const app = express();

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/familio',
{ useNewUrlParser: true})
.then(() => console.log('Connected correctly to server!'))
.catch((err) => console.log(err));

const auth = jwt({
  secret: JWT_SECRET,
  algorithms: ['RS256'],
  credentialsRequired: false,
});
app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
      endpoint: "/graphql",
  },
  context: ({ req }) => {
      const user = req.headers.user
          ? JSON.parse(req.headers.user)
          : req.user
          ? req.user
          : null;
      return { user };
  },
});

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
//convert the data received into json
app.use(bodyParser.json());
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));