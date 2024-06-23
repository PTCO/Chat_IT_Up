// NPM Dependencies
const express = require('express');
const bcrypt = require('bcryptjs');

// Sequelize
const db  = require('../db');
const { Users , ChatRequests , Sessions, UserSessions } = db.models

// Passport
const passport = require('passport');
const passportScope = {
    scope: ['profile', 'email']
}

// Middleware
const { updateValidator } = require('../middleware/updateUserValidator'); 
const sessionValidator = require('../middleware/sessionValidator');

const Router = express.Router();

Router.get('/Get/:userid', sessionValidator, async(req, res, next)=>{
    try {
        const user = await Users.findOne({where: { User_ID: req.params.userid}, include: { model: ChatRequests}});
        res.status(201).send(user);
    } catch (error) {
        next(error);
    }
})

Router.put('/Update', updateValidator, async(req, res, next)=>{
    try {

        const { formData } = req.body;
        if(req.body.request === 'Portrait') {
            
            await Users.update({
                Portrait: formData.Portrait
            },
            {
                where: {User_ID: req.body.User_ID  }
            }
            )
            const updatedUser = await Users.findOne({ where: {User_ID: req.body.User_ID}, include: {model: ChatRequests}});
            res.status(201).send({User:  updatedUser, resultMsg: ['']})
        }
        else if(req.body.request === 'Private') {
            await Users.update({
                isPrivate: formData.Status
            },
            {
                where: {User_ID: req.body.User_ID}
            }
            )
            const updatedUser = await Users.findOne({ where: {User_ID: req.body.User_ID}, include: {model: ChatRequests}});
            return res.status(201).send({User:  updatedUser, resultMsg: ['']})
        }
        else if(req.body.request === 'Username') {
            await Users.update({
                Username: formData.newUsername
            },
            {
                where: {Username: formData.currentUsername}
            }
            )

            await Sessions.update(
                {
                    Username: formData.newUsername
                },
                {
                    where: {Username: formData.currentUsername }
                }
            )

            const updatedUser = await Users.findOne({ where: { Username: formData.newUsername}, include: {model: ChatRequests}});
            res.status(201).send({User:  updatedUser, resultMsg: ['Username updated']})
        }
        else if ( req.body.request === 'Email') {
            await Users.update({
                Email: formData.newEmail
            },
            {
                where: {Email: formData.currentEmail}
            }
            )
            const updatedUser = await Users.findOne({ where: { Email: formData.newEmail}, include: {model: ChatRequests}});
            res.status(201).send({User:  updatedUser, resultMsg: ['Email updated']})
        } else {
            await Users.update({
                Password: formData.newPassword,
                confirmedPassword: formData.confirmedPassword
            },
            {
                where: {User_ID: req.body.User_ID}
            }
            )
            const updatedUser = await Users.findOne({ where: {User_ID: req.body.User_ID}, include: {model: ChatRequests} });
            res.status(201).send({User:  updatedUser, resultMsg: ['Password updated']})
        }
    } catch (error) {
        next(error);
    }
})

Router.post('/Check', async(req, res, next)=>{
    try {
        const session = await UserSessions.findOne({ where: { sid: req.body.session}});
        const userID = JSON.parse(session.dataValues.data).userid;
        const user = await Users.findByPk(userID);
        res.status(201).send(user);
    } catch (error) {
        next(error);
    }
})

Router.post('/Signup', async(req, res, next)=>{
    try {
        const { formData } = req.body;

        let error = new Error('');;
        error.status = 400;
        if(Object.keys(formData).length < 4) {
            error.message = ['Please fill in all fields'];
            throw error;
        }

        if(!/^\W|_|\d/gm.test(formData.Password)) {
            error.message = ['Password too weak, add numbers or special characters'];
            throw error;
        }
        const user = await Users.create({
            Username: formData.Username,
            Email: formData.Email,
            Password: formData.Password,
            confirmedPassword: formData.confirmedPassword,
        })
        res.status(201).send(user)
    } catch (error) {
        next(error);
    }
})

Router.post('/SignIn', async(req, res, next)=>{
    try {
        const { formData } = req.body;

        let error = new Error('');
        error.status = 400;
        if(Object.keys(formData).length < 2) {
            error.message = ['Please fill in all fields'];
            throw error;
        }

        const userCheck = await Users.findOne({ where: { Username: formData.Username}, include: {model: ChatRequests}});
        if(!userCheck) {
            error.message = ['Incorrect username'];
            throw error;
        }

        const unHash = await bcrypt.compareSync(formData.Password, userCheck.confirmedPassword);
        if(unHash) {
            req.session.userid = userCheck.User_ID;
            req.session.save();
            res.status(201).send(userCheck)
        }
        else {
            error.message = ['Incorrect password'];
            throw error;
        }
    } catch (error) {
        next(error);
    }
})

Router.get('/LogOut/:userid', async(req, res)=>{
    try {
        req.session.destroy();
        res.status(205).send('User Has been logged out');
    } catch (error) {
        next(error);
    }
})

Router.get('/Google', passport.authenticate("google", passportScope));
Router.get('/Google/Redirect', passport.authenticate("google"));

module.exports = Router;