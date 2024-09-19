const Sequelize = require('sequelize');

module.exports = (sequelize)=> {
    class Sessions extends Sequelize.Model{}
    Sessions.init({
        Session_ID:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Portrait: {
            type: Sequelize.STRING(4000000),
            allowNull: false
        }
    }, {sequelize});
    return Sessions;
}