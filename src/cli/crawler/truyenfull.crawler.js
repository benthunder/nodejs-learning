const dbClient = require('../../dbs/mogodb.db');
const novelService = require("../../services/novel.service");
const chatgptService = require("../../services/chatgpt.service");
const axios = require("axios");
const { JSDOM } = require('jsdom');
class TruyenFullCrawler {


    static totalPage = 27;
    static currentPage = 1;
    static url = (page) => `https://truyenfull.com/api/chapters/32650/${page}/50`;

    static urlStoryContent = (chapter) => `https://truyenfull.com/dai-quan-gia-la-ma-hoang-c/chuong-${chapter}.html`;


    static crawlerUrls = async function () {
        let novel = await novelService.create({ "name": "Đại quản gia là ma hoàng" });
        while (TruyenFullCrawler.currentPage <= TruyenFullCrawler.totalPage) {
            let results = await axios.get(TruyenFullCrawler.url(TruyenFullCrawler.currentPage));
            let items = results.data.items;
            for (let i = 0; i < items.length; i++) {
                if (typeof items[i] === 'undefined') {
                    continue;
                }
                let chapterName = (TruyenFullCrawler.currentPage - 1) * 50 + i + 1;
                let newEpisode = await novelService.assignNewEpisode(novel._id, {
                    name: chapterName, title: items[i].chapter_name, path: novel.path, attributes: {
                        translateStatus: "none",
                        crawlerStatus: "none",
                        urlCrawler: TruyenFullCrawler.url(TruyenFullCrawler.currentPage)
                    }
                });
            }
            TruyenFullCrawler.currentPage++;
        }
    }

    static crawlerContent = async function () {
        let listEpisodes = await novelService.getAllEpisode('654fcf831ca604fc9eb1eb83', {
            'attributes.crawlerStatus': 'none'
        });


        for (let i = 0; i <= listEpisodes.length; i++) {
            try {
                let result = await axios.get(TruyenFullCrawler.urlStoryContent(listEpisodes[i].name), {
                    "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "en-US,en;q=0.9",
                        "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "same-origin",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1"
                    },
                    "referrer": "https://truyenfull.com/dai-quan-gia-la-ma-hoang-c-f1.32650/?gad_source=1&gclid=CjwKCAiA6byqBhAWEiwAnGCA4EjNgVRSC4DTCrLO8P8M-GJYDZ1_ZqearzVq8TjDPq3dKsIOmVPgXRoCjecQAvD_BwE",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                });
                let dom = new JSDOM(result.data);
                let content = dom.window.document.getElementById('chapter-c').innerHTML;
                await novelService.updateContentForEpisode(listEpisodes[i], content);
            } catch (e) {
                console.log(i);
            }
        }
    }


    static async run() {
        // await TruyenFullCrawler.crawlerUrls();
        // await TruyenFullCrawler.crawlerContent();

        await chatgptService.translate();
    }
}

module.exports = TruyenFullCrawler;