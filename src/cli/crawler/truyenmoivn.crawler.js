const novelService = require("../../services/novel.service");
const axios = require("axios");
const cheerio = require('cheerio');
class TruyenMoiVnCrawler {
    static slug;
    static totalPage = 0;
    static currentPage = 1;
    static url = (page) => `https://truyenmoi.org/${TruyenMoiVnCrawler.slug}/trang-${page}`;
    static urlStoryContent = (chapter) => `https://truyenmoi.org/${TruyenMoiVnCrawler.slug}/chuong-${chapter}`;
    static name;
    static novel;
    static referrer;

    static setData = async function ({ novelId, slug, name, totalPage, referrer = "" }) {
        TruyenMoiVnCrawler.novelId = novelId;
        TruyenMoiVnCrawler.slug = slug;
        TruyenMoiVnCrawler.totalPage = totalPage;
        TruyenMoiVnCrawler.name = name;
        TruyenMoiVnCrawler.referrer = referrer;

        TruyenMoiVnCrawler.attributes = {
            crawler: {
                url: referrer,
                id: novelId,
            }
        };
        return TruyenMoiVnCrawler;
    }

    static crawlerUrls = async function () {
        let novel = await novelService.create({ "name": TruyenMoiVnCrawler.name, attributes: TruyenMoiVnCrawler.attributes });
        TruyenMoiVnCrawler.novel = novel;
        while (TruyenMoiVnCrawler.currentPage <= TruyenMoiVnCrawler.totalPage) {
            let results = await axios.get(TruyenMoiVnCrawler.url(TruyenMoiVnCrawler.currentPage));

            let $ = cheerio.load(results.data);
            let listChapterElement = $('#list-chapter li > a[title]');

            for (let i = 0; i < listChapterElement.length; i++) {
                let chapterName = (TruyenMoiVnCrawler.currentPage - 1) * 50 + i + 1;
                let newEpisode = await novelService.assignNewEpisode(novel._id, {
                    name: chapterName, title: listChapterElement[i].attribs.title, path: novel.path, attributes: {
                        translateStatus: "none",
                        crawlerStatus: "none",
                        urlCrawler: TruyenMoiVnCrawler.urlStoryContent(chapterName)
                    }
                });
            }
            TruyenMoiVnCrawler.currentPage++;
        }
    }

    static crawlerContent = async function () {
        let listEpisodes = await novelService.getAllEpisode(TruyenMoiVnCrawler.novel._id, {
            'attributes.crawlerStatus': 'none'
        });
        for (let i = 0; i < listEpisodes.length; i++) {
            try {
                let result = await axios.get(TruyenMoiVnCrawler.urlStoryContent(listEpisodes[i].name), {
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
                    "referrer": TruyenMoiVnCrawler.referrer,
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                });
                const $ = await cheerio.load(result.data);
                $('script').remove();
                $('style').remove();
                $('noscript').remove();
                $('body article.chapter-content div').remove();
                let content = $('body article.chapter-content').html();
                await novelService.updateContentForEpisode(listEpisodes[i], content);
            } catch (e) {
                console.log({ i, url: TruyenMoiVnCrawler.urlStoryContent(listEpisodes[i]), err: e.message });
                process.exit();
            }
        }
    }


    static async run() {
        await TruyenMoiVnCrawler.crawlerUrls();
        await TruyenMoiVnCrawler.crawlerContent();
        // await chatgptService.translate();
    }
}

module.exports = TruyenMoiVnCrawler;
// Example -> command node cli.js crawler truyenmoivn 26753 "chang-re-manh-nhat-lich-su" "CHÀNG RỂ MẠNH NHẤT LỊCH SỬ" 77 "https://truyenmoi.org/chang-re-manh-nhat-lich-su"