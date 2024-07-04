var express = require('express');
var router = express.Router();
const { privateValidator } = require('../middleware/privateValidator');
const { encrypt, decrypt } = require('node-encryption');
const encryptionKey = 'mysecretkey1337';

const db = require('../db');
const { Op, where } = require('sequelize');
const { Users , Sessions , Messages , ChatRequests, Notification } = db.models;


Users.hasMany(Sessions, {onDelete: 'CASCADE'});
Sessions.belongsTo(Users, {onDelete: 'CASCADE'});

Sessions.hasMany(Messages, {onDelete: 'CASCADE'});
Messages.belongsTo(Sessions, {onDelete: 'CASCADE'});

Sessions.hasMany(Notification, {onDelete: 'CASCADE'});
Notification.belongsTo(Sessions, {onDelete: 'CASCADE'});

router.get('/Search/:username/CurrentUser/:yourusername/:yourID', async(req, res, next)=>{
    try {
        let users = await Users.findAll({
            where: {
                Username: {
                    [Op.like]: `%${req.params.username}%`
                }
            }
        })

        const sessions = await Sessions.findAll();
        let sessionUsers = sessions.map( session =>  session.UserUserID);
        let filteredUsers = [];

        const requestCheck = await ChatRequests.findOne({ where: { UserUserID: req.params.yourID}});
        users.map( async(user) => {
            if(!requestCheck){
                if(sessionUsers.includes(user.User_ID) || user.Username === req.params.yourusername) {
                    filteredUsers.push();
                } 
                else {
                    filteredUsers.push(user);
                }
            } else {
                user.isRequested = true;
                filteredUsers.push(user);
            }
        })
        // Check if searched user is already chatting
        if(filteredUsers.length === 0){
            res.status(201).send({ Message: 'No Users Found', Users: filteredUsers})
        } else {
            res.status(201).send({ Message: '', Users: filteredUsers})
        }

        
    } catch (error) {
        next(error);
    }
})

router.get('/:userid', async(req, res, next)=>{
    try {    
        const user = await Users.findOne({ where: { User_ID: req.params.userid}});
        if(user){
            user.getSessions()
            .then( (result) => {
                let data = [];
                result.map( (post) => {
                    data.push(post.dataValues)
                })
                res.status(201).send(data);
            })
        } else {
            res.status(201).send([])
        }
    } catch (error) {
        next(error);
    }
})

router.get('/Notifications/:sessionid', async(req, res, next)=>{
    try {
        if(req.params.sessionid === undefined) return res.status(200).end(); 
        const session = await Sessions.findOne({ where: { Session_ID: req.params.sessionid}});
        if(session){
            session.getNotifications()
            .then( (result) => {
                let notifications = [];
                result.map((noti)=> {
                    notifications.push(noti.dataValues);
                })
                res.status(201).send(notifications);
            })
        } else {
            res.status(201).end();
        }
    } catch (error) {
        next(error);
    }
})

router.delete('/Notifications/:sessionid', async(req, res, next)=>{
    try {
        if(req.params.sessionid === undefined) return res.status(200).end(); 
        await Notification.destroy({ where: { SessionSessionID: req.params.sessionid}});
        res.status(201).end();
    } catch (error) {
        next(error);
    }
})

router.get('/Messages/:sessionid', async(req, res, next)=>{
    try {    
        if(req.params.sessionid === undefined) return res.status(200).end(); 
        const session = await Sessions.findOne({ where: { Session_ID: req.params.sessionid}});
        if(session){
            session.getMessages()
            .then( (result) => {
                let messages = [];
                result.map( (message) => {
                    let text = message.dataValues;
                    text.Message = decrypt(message.Message, process.env.KEYS).toString();
                    messages.push(text)
                })
                res.status(201).send({ session: session, messages: messages});
            })
        } else {
            res.status(201).end();
        }
    } catch (error) {
        next(error);
    }
})

router.post('/Create', privateValidator, async(req, res, next)=>{
    try {
        const session = await Sessions.create({
            Username: req.body.UserTwoUsername,
            Portrait: req.body.UserTwoPortrait
        })

        const session2 = await Sessions.create({
            Username: req.body.UserOneUsername,
            Portrait: req.body.UserOnePortrait
        })

        const user = await Users.findOne({ where: { User_ID: req.body.UserID }})
        const user2 = await Users.findOne({ where: { User_ID: req.body.UserTwoID }})
        user.addSessions(session);
        user2.addSessions(session2);


        res.status(201).send(req.body.Request === 'Accept' ? 'Accept':'Added')
    } catch (error) {
        next(error);
    }
})

router.delete('/Delete/:sessionid/:userid', async(req, res, next)=>{
    try {
        await Sessions.destroy({
            where: { Session_ID: req.params.sessionid}
        });
        const user = await Users.findOne({ where: { User_ID: req.params.userid }});
        await Sessions.destroy({
            where: { Username: user.Username}
        });
        if(user){
            user.getSessions()
            .then( (result) => {
                let data = [];
                result.map( (post) => {
                    data.push(post.dataValues)
                })
                res.status(201).send(data);
            })
        } else {
            res.status(201).send([])
        }
    } catch (error) {
        next(error);
    }
})

router.post('/NewMessage', async(req, res, next)=>{
    try {
        const session = await Sessions.findOne({ where: { Session_ID: req.body.Session_ID}})
        const session2 = await Sessions.findOne({ where: { Username: req.body.yourUsername}})
        const message = await Messages.build({
            Message: encrypt(req.body.Message, process.env.KEYS),
            User_ID: req.body.UserID
        });
        const message2 = await Messages.build({
            Message: encrypt(req.body.Message, process.env.KEYS),
            User_ID: req.body.UserID
        });
        message.Time = message.sentAt();
        message2.Time = message2.sentAt();
        await message.save();
        await message2.save();

        const notification = await Notification.create();

        session.addMessages(message);
        session2.addMessages(message2);
        
        session2.addNotifications(notification);

        res.status(201).send('sent');
    } catch (error) {
        next(error);
    }
})

router.delete('/DeleteMessage/:userid/:time', async(req, res, next)=>{
    try {
        await Messages.destroy({
            where: { Time: req.params.time, User_ID: req.params.userid}
        });

        res.status(201).send('deleted')
    } catch (error) {
        next(error)
    }
})


module.exports = router;
