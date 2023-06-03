const express = require('express');
const routes = express.Router();
const db = require('../database/connection');
const { uuid } = require('short-uuid');
const bcrypt = require('bcrypt');
const uid = uuid()

const createUsers = routes.post('/register' , async (req , res)=>{
    const {name , email} = req.body;
    const sql = "INSERT INTO users (user_id , name , email , password) VALUES(?,?,?,?)";
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    db.query(sql , [uid , name , email , hashPassword] ,(err)=>{
        res.setHeader('Content-Type','application/json');
        if(err) return res.status(403).json({
            error : true,
            message : "Failed to create account"
        });
        res.status(200).json({
            error : false,
            message : "Created account success"
        })
        
    }) 
});

const loginUsers = routes.post('/login' , (req, res)=>{
    
})

module.exports = {createUsers};
