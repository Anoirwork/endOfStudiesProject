const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User{
        _id: ID!
        fname: String!
        lname: String!
        email: String!
        number: String!
        password: String!
        gender: String!
        createdAt: String!
        updatedAt: String!
    }

    type Relation {
        _id: ID!
        user: User!
        kid: Kid!
        createdAt: String!
        updatedAt: String!
    }

    type Kid{
        _id: ID!
        name: String!
        number: String!
        email: String!
        birthDay: String!
    }

    type AuthData{
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type updateInput{
        userId: ID!
        newPass: String!
        oldPass: String!
    }

    type wrongAuthData{
        id: Int!
        msg: String!
    }  

    type data {
        data: String!
    }

    input UserInput {
        fname: String!
        lname: String!
        email: String!
        password: String!
        number: String!
        gender: String!
    }

    input KidInput {
        name: String!
        number: Int!
        birthDay: String!
        email: String!
    }
    

    type posData{
        lat: String!
        lng: String!
        currentTime: String!
        kidNumb: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        kidsRelated(userId: String!): [Kid!]!
        user(userId: String!): User!
        retrivePos(a: String): [posData!]!
        retriveLastRoad(kidNumb: String): [posData!]!
    }

    type RootMutation {
        createUser(userInput: UserInput!): AuthData!
        createKid(kidInput: KidInput, userId: String!): Kid!
        relateKid(kidId: ID!, userId: String!): Relation!
        delKid(userId: ID!, kidId: ID!): Int
        updateKid(kidId: ID!, kidInput: KidInput): Kid!
        updateUser(userId: ID!, oldPass: String!,newPass: String!): AuthData!
        savePos(data: String!): data!
    }

    schema{
        query : RootQuery
        mutation: RootMutation
    }

`);
