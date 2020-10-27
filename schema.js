const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String
        name: String!
        phone: String!
        email: String
        password: String!
        status: Boolean
        role: String
        city: String
        sexe: String
        resetPasswordToken: String
    }

    type Query {
        current: User
        allUser: [User]
    }

    type Mutation {
        register(username: String!, name: String!, phone: String!, email: String!, password: String!): String
        login(username: String!, password: String!): String
    }
`;

module.exports = typeDefs;