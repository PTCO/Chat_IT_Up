const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Google extends Sequelize.Model{}
    Google.init({
        Google_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A username is required'
                },
                notEmpty: {
                    msg: 'Please provide a username'
                }
            }
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A email is required'
                },
                isEmail: {
                    msg: 'Please provide a valid email'
                },
                notEmpty: {
                    msg: 'Please provide a email'
                }
            }
        },
    },{sequelize})
    return Google;
}