// const { log } = require("console");

// const routes = {}

// routes.userHandler = (resP, callback) => {
//     const acceptedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
//     console.log(resP.method);
//     if (acceptedMethods.indexOf(resP.method) > -1) {
//         console.log('Method is allowed');
//         _users.get(resP, () => {
//             callback(200, 'Method Allowed');
//         })
//     } else {
//         callback(405, 'Method Not Allowed');
//     }
//     const response = {
//         message: 'This is a user handler response',
//         method: resP.method,
//     }

//     _users.get(resP, callback)
// }

// const _users = {
// }

// _users.get = (resP, callback) => {
//     callback(200);
// }



// module.exports = routes;