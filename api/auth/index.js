const AuthController = require('@controller/admin/auth');
module.exports = function (router) {
    router.post('/login',[],AuthController.login);
    router.post('/ping',[],AuthController.ping);
}