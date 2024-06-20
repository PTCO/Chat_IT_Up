const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class Message extends Sequelize.Model{
        sentAt(){
            const date = moment(this.createAt).format('MMMM D, YYYY, h:mm:ss a');
            return date;
        }
    }
    Message.init({
        Message_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        User_ID: {
            type: Sequelize.UUID
        },
        Message: {
            type:Sequelize.STRING,
            allowNull: false
        },
        Time: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize});
    return Message;
}