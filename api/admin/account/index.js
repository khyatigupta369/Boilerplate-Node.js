const AccountController = require('@controller/admin/account/index.js')
const withAdminUser = require('@middleware/withAdminUser.js');
const withPagination = require('@middleware/withPagination.js');

module.exports = function (router) {
    router.post('/create_admin',[withAdminUser], AccountController.addAdminUser);
    router.delete('/delete_admin/:id',[withAdminUser], AccountController.deleteAdminUser);
    router.get('/users',[withAdminUser,withPagination],AccountController.getUsers);
    router.put('/user/:id',[withAdminUser],AccountController.updateUser);
    router.delete('/user/:id',[withAdminUser],AccountController.deleteUser);
}