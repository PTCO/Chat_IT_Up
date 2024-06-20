const privateValidator = async (req, res, next) => {
const db = require('../db');
const { Op, where } = require('sequelize');

const { Users , Sessions , Messages , ChatRequests} = db.models;

Users.hasMany(Sessions, {onDelete: 'CASCADE'});
Sessions.belongsTo(Users, {onDelete: 'CASCADE'});

Sessions.hasMany(Messages, {onDelete: 'CASCADE'});
Messages.belongsTo(Sessions, {onDelete: 'CASCADE'});

const privateCheck = await Users.findOne({ where: { User_ID: req.body.UserTwoID}})
if(privateCheck.isPrivate && req.body.Request !== 'Accept') {
    const { UserOneUsername, UserOnePortrait, UserID, UserTwoID } = req.body;

    const userOne = await Users.findOne({ where: { User_ID: UserID}});
    const userTwo = await Users.findOne({ where: { User_ID: UserTwoID}});
    const request = await ChatRequests.create({
        Requester_id:  UserID,
        Username: UserOneUsername,
        Portrait: UserOnePortrait
    });
    const request2 = await ChatRequests.create({
        Requester_id:  UserID,
        Username: UserOneUsername,
        Portrait: UserOnePortrait
    });
    userOne.addChatRequests(request);
    userTwo.addChatRequests(request2);

    return res.status(201).send('Requested')
} 
next()
}

module.exports = { privateValidator }