const express = require('express');

const Router = express.Router();

const db = require('../db');
const User = require('../db/models/User');
const { where } = require('sequelize');
const { ChatRequests , Users } = db.models;


Users.hasMany(ChatRequests, { onDelete: 'CASCADE'})
ChatRequests.belongsTo(Users, { onDelete: 'CASCADE'})


Router.post('/Add', async(req, res, next)=>{
    try {
        const { Portrait, Username, UserOneID, UserTwoID } = req.body;

        const userOne = await Users.findOne({ where: { User_ID: UserOneID}});
        const userTwo = await Users.findOne({ where: { User_ID: UserTwoID}});
        const request = await ChatRequests.create({
            Requester_id:  UserOneID,
            Username: Username,
            Portrait: Portrait
        });
        const request2 = await ChatRequests.create({
            Requester_id:  UserOneID,
            Username: Username,
            Portrait: Portrait
        });
        userOne.addChatRequests(request);
        userTwo.addChatRequests(request2);

        res.status(201).send(request)
    } catch (error) {
        next(error);
    }
})

Router.put('/Update', async(req, res, next)=>{
    try {
        const {Request, Requester_ID} = req.body.data;
        if(Request === 'Delete' || Request === 'Accept') {
            await ChatRequests.destroy({
                where: { Requester_id: Requester_ID }
            });
            return res.status(201).end()
        }


    } catch (error) {
        next(error);
    }
})
module.exports = Router;