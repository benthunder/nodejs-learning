const { TranslationServiceClient } = require('@google-cloud/translate');
let path = require('path');
class GoogleService {
    static {
        const keyFilePath = path.join('./', 'translate-api-key.json');

        this.googleClient = new TranslationServiceClient({
            keyFilename: keyFilePath,
        });
        this.projectId = 'translate-api-388108';
        this.location = 'global';
    }

    static async translate(rawContent) {
        let translateContent = "";
        const request = {
            parent: `projects/${GoogleService.projectId}/locations/${GoogleService.location}`,
            contents: [rawContent],
            mimeType: 'text/plain', // mime types: text/plain, text/html
            sourceLanguageCode: 'en',
            targetLanguageCode: 'vi',
        };
        const [response] = await GoogleService.googleClient.translateText(request);

        for (const translation of response.translations) {
            translateContent = translation.translatedText
        };
        return translateContent;
    }
}

module.exports = GoogleService;