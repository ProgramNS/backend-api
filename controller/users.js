require('dotenv').config()
const express = require('express');
const routes = express.Router();
const db = require('../database/connection');
const { uuid } = require('short-uuid');
const bcrypt = require('bcrypt');
const uid = uuid()
const jwt = require('jsonwebtoken');

const createUsers = routes.post('/register' , async (req , res)=>{
    const {name , email} = req.body;
    const sql = "INSERT INTO user (user_id , name , email , password) VALUES(?,?,?,?)";
    const hashPassword =  await bcrypt.hash(req.body.password, 10);
    db.query(sql , [uid , name , email , hashPassword] ,(err)=>{
        res.setHeader('Content-Type','application/json');
        if(err) return res.status(403).json({
            error : true,
            message : "Failed to create account"
        });
        res.status(201).json({
            error : false,
            message : "Created account success"
        })
        
    }) 
});

const loginUsers = routes.post('/login' , (req, res)=>{
    const {email , password} = req.body;
    const sql = "SELECT * FROM user WHERE email =?";
    const accessToken = jwt.sign({email : email}, process.env.ACCESS_TOKEN_SECRET);
    db.query(sql , [email] , (err , fields)=>{
        if(err) throw err;
        if (fields.length === 0 ) {
            res.status(404).json({
                error : true,
                message : "Email not found"
            });
        } else {
            res.status(200).json({
                error : false,
                message : "success",
                loginResult : {
                    user_id  : fields[0].user_id,
                    name : fields[0].name,
                    email : fields[0].email,
                    token : accessToken
                }
            });
        }
    });
});

module.exports = {createUsers , loginUsers};
