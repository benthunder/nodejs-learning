const mongoose = require("mongoose");
const configs = require("../configs/mongodb.config");

class Database {
    constructor() {
        this.connect();
    }

    async connect(type = "mongo") {
        if (type == "mongo") {
            await mongoose
                .connect(
                    `mongodb://${configs.db.host}:${configs.db.port}/${configs.db.name}`,
                    {
                        maxPoolSize: 50,
                        authSource: configs.db.userName,
                        user: configs.db.userName,
                        pass: configs.db.userPW,
                    }
                )
                .then((_) => {
                    console.log("Connect Mongo DB");
                })
                .catch((err) => console.log(err));
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
