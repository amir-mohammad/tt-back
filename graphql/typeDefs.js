const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type UserAdmin{
        id:ID!
        name:String
        password:String
        mobile:String,
        token:String
    }

    type Brand{
        id:ID!
        name:String!
        image:String
    }

    type Query{
        getAllUserAdmin:[UserAdmin]!
    }

    type Mutation{
        registerUserAdmin(name:String!,mobile:String!,password:String!,confirmPassword:String!):UserAdmin!
        loginAdmin(mobile:String!,password:String!):UserAdmin!


        addBrand(name:String!,image:String!):Brand!
    }




`;

module.exports = typeDefs;