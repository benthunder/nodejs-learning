require('dotenv').config();
const configs = {
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        userName: process.env.DB_USER,
        userPW: process.env.DB_PW,
    }
}

module.exports = configs