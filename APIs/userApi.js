const exp = require('express');
const userApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jsonwetoken = require('jsonwebtoken');

userApp.use(exp.json());

require("dotenv").config();

let logineduser;

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
}));

userApp.post('/login', expressAsyncHandler(async (request, response) => {
    console.log(request.body);
    let userCollectionObject = request.app.get("userCollectionObject");
    let newuserobj = request.body;
    let userisfound = await userCollectionObject.findOne({ name: newuserobj.name });
    
    if (userisfound === null) {
        response.send({ message: 'User not found' });
    } else {
        logineduser = newuserobj;
        let status = await bcrypt.compare(newuserobj.password, userisfound.password);
        if (status) {
            let token = jsonwetoken.sign({ name: userisfound.name }, process.env.SECERET_KEY, { expiresIn: 100000 });
            response.send({ message: 'Success', payload: token, userobj: userisfound });
        } else {
            response.send({ message: 'Invalid Password' });
        }
    }
}));

userApp.get('/editprofile', expressAsyncHandler(async (request, response) => {
    let userCollectionObject = request.app.get("userCollectionObject");
    let userName = logineduser.name;
    let userFromDB = await userCollectionObject.findOne({ name: userName });

    if (userFromDB) {
        response.send({ message: 'User details fetched', user: userFromDB });
    } else {
        response.status(404).send({ message: 'User not found' });
    }
}));

userApp.put('/editprofile', expressAsyncHandler(async (request, response) => {
    let userCollectionObject = request.app.get("userCollectionObject");
    let updatedUserData = logineduser;
    let userName = updatedUserData.name;
    
    let result = await userCollectionObject.updateOne({ name: userName }, { $set: updatedUserData });
    
    if (result.matchedCount === 1) {
        response.send({ message: 'User details updated' });
    } else {
        response.status(404).send({ message: 'User not found' });
    }
}));

module.exports = userApp;
