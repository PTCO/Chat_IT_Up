const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class ChatRequest extends Sequelize.Model{}
    ChatRequest.init({
        Request_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Requester_id: {
            type: Sequelize.UUID,
            allowNull: false
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Portrait: {
            type: Sequelize.STRING(4000),
            allowNull: false
        }
    },{sequelize})

    return ChatRequest;
}