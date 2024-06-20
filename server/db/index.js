const Sequelize  = require('sequelize');

const sequelize = new Sequelize('postgresql://Test_DB_owner:D4oCfJBrjX9e@ep-delicate-paper-a5lf6r2h.us-east-2.aws.neon.tech/Test_DB?sslmode=require', {
    logging: false
})

const db = {
    Sequelize,
    sequelize,
    models: {}
};

db.models.Users = require('./models/User.js')(sequelize);
db.models.Google = require('./models/Google.js')(sequelize);
db.models.Messages = require('./models/Message.js')(sequelize);
db.models.Sessions = require('./models/Sessions.js')(sequelize);
db.models.ChatRequests = require('./models/ChatRequest.js')(sequelize);
db.models.Notification = require('./models/Notification.js')(sequelize);

module.exports = db;