const AccountController = require('@controller/client/account/account.js');
const withUser = require('@middleware/withUser.js');
module.exports = function (router) {
    router.post('/user',AccountController.createUser);
    router.put('/user',[withUser],AccountController.updateUser);
}