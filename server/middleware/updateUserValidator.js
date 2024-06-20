const validator = require('validator');
const bcrypt = require('bcrypt');

// Sequelize
const db  = require('../db');
const { Op, where } = require('sequelize');
const { Users } = db.models


const  updateValidator = async (req, res, next) => {
const { formData } = req.body
    let error = new Error('');
    error.status = 400;

    if(req.body.request === 'Private' || req.body.request === 'Portrait') return next();

    
    if(Object.keys(formData).length < 3) {
        error.message = ['Please fill in all fields']
        return next(error);
    } 


    if( formData.currentUsername && formData.currentUsername === formData.newUsername) {
        if(!validator.isLength(formData.newUsername, {min: 8, max: 16})) {
            error.message = ['New username must between 8 & 16 characters long'];
            return next(error);
        }
        error.message = ['Current & new username cannot match']
        return next(error);
    } 

    if( formData.currentEmail && formData.currentEmail === formData.newEmail) {
        if(!validator.isEmail(formData.newEmail)) {
            error.message = ['New Email provided is invalid'];
            return next(error);
        }
        error.message = ['Current & new email cannot match'];
        return next(error); 
    }

    const userCheck = await Users.findOne({ where: { [Op.or]: [{Username: formData.currentUsername ? formData.currentUsername:''}, {Email: formData.currentEmail ? formData.currentEmail:''}, {User_ID: req.body.User_ID}] } })
    if(!userCheck) {
        if(req.body.request === 'Email') error.message = ['Incorrect email'];
        else error.message = ['Incorrect username'];
        return next(error);
    }
    
    const UnHash = await bcrypt.compareSync(formData.Password, userCheck.confirmedPassword);
    if(!UnHash) {
        error.message = ['Incorrect password']
        return next(error);
    }
    

    next();
} 

module.exports =  { updateValidator };