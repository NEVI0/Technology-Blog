const express = require('express');

const PostCtrl = require('../controllers/PostCtrl');
const AuthCtrl = require('../controllers/AuthCtrl');
const UserCtrl = require('../controllers/UserCtrl');

module.exports = (server) => {

    const api = express.Router();
    server.use('', api);

    api.get('/', PostCtrl.getInitialPosts);
    api.get('/all-posts', PostCtrl.getAllPosts);

    api.get('/signup-page', AuthCtrl.signupPage);
    api.get('/success', AuthCtrl.success);

    api.post('/signin', AuthCtrl.signin);
    api.post('/signup', AuthCtrl.signup);
    api.get('/logout', AuthCtrl.logout);

    api.get('/account', UserCtrl.getUser);
    api.get('/delete-account', UserCtrl.deleteAccount);
    api.get('/user-posts', PostCtrl.getAllUserPosts);

    api.get('/detail', PostCtrl.getPostDetails);
    api.get('/delete-post/:id', PostCtrl.deletePostById)
    api.post('/post', PostCtrl.createNewPost);

}