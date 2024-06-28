// Sequelize
const db  = require('../db');
const { UserSessions } = db.models

module.exports = sessionValidator = async (req, res, next) => {
    const sessions = await UserSessions.findAll();
    const cookies = sessions.map( sess => JSON.parse(sess.data).userid);
    if(!cookies.includes(req.params.userid)) return next();
    if(!cookies.includes(req.body.User_ID)) return next();
    return res.status(205).send('User has been logged out');
}