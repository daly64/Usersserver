import { prismaGetAllUsers, prismaGetUserById, prismaCreateUser, prismaUpdateUser, prismaDeleteUser, } from "../services/prisma/userCRUD.js";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
const getAllUsers = prismaGetAllUsers;
const getUser = (parent, data) => {
    return prismaGetUserById(parseInt(data.id));
};
const createUser = (parent, data) => {
    return prismaCreateUser(data.input);
};
const updateUser = (parent, data) => {
    return prismaUpdateUser(parseInt(data.id), data.input);
};
const deleteUser = (parent, data) => {
    const deletedUser = prismaDeleteUser(parseInt(data.id));
    return deletedUser !== null;
};
let currentNumberVar = 0;
const currentNumber = () => currentNumberVar;
const numberIncremented = {
    subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
};
const allUsers = {
    subscribe: () => pubsub.asyncIterator(["ALLUSERS"]),
};
// In the background, increment a number every second and notify subscribers when it changes.
function incrementNumber() {
    currentNumberVar++;
    pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumberVar });
    setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();
function backAllUsers() {
    pubsub.publish("ALLUSERS", { allUsers: prismaGetAllUsers });
    setTimeout(backAllUsers, 0);
}
// Start
backAllUsers();
const resolvers = {
    Query: { getAllUsers, getUser, currentNumber },
    Mutation: { createUser, updateUser, deleteUser },
    Subscription: { numberIncremented, allUsers },
};
export default resolvers;
