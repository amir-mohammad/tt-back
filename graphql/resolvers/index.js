const userAdminResolvers = require('./userAdminResolvers/userAdminResolvers');
const brandResolvers = require('./brandResolvers/brandResolvers');

module.exports = {
    Query:{

    },
    Mutation:{
        ...userAdminResolvers.Mutation,
        ...brandResolvers.Mutation
    }
}