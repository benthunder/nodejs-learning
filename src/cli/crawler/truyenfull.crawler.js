const novelService = require("../../services/novel.service");
// const chatgptService = require("../../services/chatgpt.service");
const axios = require("axios");
const cheerio = require('cheerio');
class TruyenFullCrawler {
    static slug;
    static totalPage = 27;
    static currentPage = 1;
    static url = (page) => `https://truyenfull.com/api/chapters/${TruyenFullCrawler.novelId}/${page}/50`;
    static urlStoryContent = (chapter) => `https://truyenfull1.com/${TruyenFullCrawler.slug}/chuong-${chapter}.html`;
    static name;
    static novel;
    static referrer;

    static setData = async function ({ novelId, slug, name, totalPage, referrer = "" }) {
        TruyenFullCrawler.novelId = novelId;
        TruyenFullCrawler.slug = slug;
        TruyenFullCrawler.totalPage = totalPage;
        TruyenFullCrawler.name = name;
        TruyenFullCrawler.referrer = referrer;
        return TruyenFullCrawler;
    }

    static crawlerUrls = async function () {
        let novel = await novelService.create({ "name": TruyenFullCrawler.name });
        TruyenFullCrawler.novel = novel;
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
        let listEpisodes = await novelService.getAllEpisode(TruyenFullCrawler.novel._id, {
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
                    "referrer": TruyenFullCrawler.referrer,
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                });
                const $ = cheerio.load(result.data);
                $('script').remove();
                $('style').remove();
                $('noscript').remove();
                $('#chapter-c div').remove();
                let content = $('#chapter-c').html();
                await novelService.updateContentForEpisode(listEpisodes[i], content);
            } catch (e) {
                console.log({ i, url: TruyenFullCrawler.urlStoryContent(listEpisodes[i].name), err: e.message });
            }
        }
    }


    static async run() {
        await TruyenFullCrawler.crawlerUrls();
        await TruyenFullCrawler.crawlerContent();
        // await chatgptService.translate();
    }
}

module.exports = TruyenFullCrawler;
// Example -> command node cli.js crawler truyenfull 19421 "ngao-the-dan-than" "NGẠO THẾ ĐAN THẦN" 77 "https://truyenfull.vn/ngao-the-dan-than/"