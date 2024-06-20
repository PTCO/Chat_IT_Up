const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Notification extends Sequelize.Model{}
    Notification.init({
        Notification_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        }
    }, {sequelize});
    return Notification;
}