const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const {ApolloServer} = require('apollo-server-express');
const typeDefs =  require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const fileUpload = require('express-fileupload');
const cors  = require('cors');



const PORT = 4000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(fileUpload());



connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) =>({req})
})


server.applyMiddleware({app});

app.use('/upload',require('./routes/upload/upload'));

app.listen(PORT,() => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})





