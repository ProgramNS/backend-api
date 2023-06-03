const express = require('express');
const routes = express.Router();
const db = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

const routesArticles = routes.get('/articles' , (req , res)=>{
    const sql = "SELECT * FROM articles1";
    db.query(sql , (err , fields)=>{
        if (err) throw err;
        res.status(200).json({
            data : fields
        });
    });
});

const getRouteById = routes.get('/articles/:article_id' , (req , res) =>{
    const sql = "SELECT article_id , judul , penjelasan , link FROM articles1 WHERE article_id = ?";
    const id = req.params.article_id;
    db.query(sql , [id] , (err , fields)=>{
        if(err) {
            res.setHeader('Content-Type','application/json');
            res.status(404).json({
                error : true,
                message : "Data Not Found"
            });
        } else {
            res.setHeader('Content-Type','application/json');
            res.status(200).json({
                error : false,
                message : "Data Ditemukan",
                data : [
                    {
                        article : fields
                    }
                ]
            })
        }
    })
})

const postRouteArticles = routes.post('/articles' , (req , res)=>{
    const sql = "INSERT INTO articles1 (article_id , judul , penjelasan , link) VALUES(?,?,?,?)";
    const {judul , penjelasan , link} = req.body;
    const articleId = uuidv4();
    db.query(sql , [articleId, judul , penjelasan , link] , (err)=>{
        if (err) {
            res.setHeader('Content-Type','application/json');
            res.status(400).json({
                erorr : true,
                message : 'Gagal menambahkan article'
            });
            console.log({judul , penjelasan , link});
        } else{
            res.setHeader('Content-Type','application/json');
            res.status(200).json({
                error : false,
                message : 'Berhasil menambahkan article'
            });
        };
    });
});




module.exports = {routesArticles , postRouteArticles , getRouteById};