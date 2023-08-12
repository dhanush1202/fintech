const exp = require('express')
const userApp = exp.Router();
const expressAsyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jsonwetoken = require('jsonwebtoken')

require("dotenv").config()

userApp.post('/signin', expressAsyncHandler(async (request, response) => {
let userCollectionObject = request.app.get("userCollectionObject");
    let newuserobj = request.body
    let userofDB = await userCollectionObject.findOne({name:newuserobj.name})
    if(userofDB !== null){
        response.send({message:'User already exists'})
    }
    else{
        let hashedPass = await bcrypt.hash(newuserobj.password, 6)
        newuserobj.password = hashedPass
        await userCollectionObject.insertOne(newuserobj)
        response.send({message:'New user created'})
    }
}))

userApp.post('/login', expressAsyncHandler(async (request, response) => {
let userCollectionObject = request.app.get("userCollectionObject");
    let newuserobj = request.body;
    let userisfound = await userCollectionObject.findOne({ name: newuserobj.name });
    
    if (userisfound === null) {
        response.send({ message: 'User not found' });
    } else {
        let status = await bcrypt.compare(newuserobj.password, userisfound.password); // Compare passwords
        if (status) {
            let token = jsonwetoken.sign({ name: userisfound.name }, process.env.SECERET_KEY, { expiresIn: 100000 });
            response.send({ message: 'Success', payload: token, userobj: userisfound });
        } else {
            response.send({ message: 'Invalid Password' });
        }
    }
}));

module.exports = userApp;