"use strict";
const { OpenAI } = require('openai')
const configs = require("../configs/mongodb.config");

class ChatGPTService {
    static async translate() {
        let openai = new OpenAI({
            apiKey: configs.OPENAI_API_KEY
        });

        // let response = await api.sendMessage(' Đổi câu sâu cho đúng ngữ pháp tiếng việt : tao di nước trong tàu ');
        let response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
        });

        return response;
    }
}

module.exports = ChatGPTService;