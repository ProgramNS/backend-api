const express = require('express');
const { routesArticles, postRouteArticles, getRouteById } = require('../controller/article');
const { createUsers } = require('../controller/users');
const routes = express.Router();

routes.get('/articles' , routesArticles );
routes.get('/articles/"article_id' , getRouteById);
routes.post('/articles' , postRouteArticles);
routes.post('/register' , createUsers);


module.exports = routes;





