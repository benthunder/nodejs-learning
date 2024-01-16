const novelService = require("../../services/novel.service");
const axios = require("axios");
const cheerio = require('cheerio');

class WebnovelWorldCrawler {
    static slugDetail;
    static novelId;

    static totalPage = 0;
    static currentPage = 1;

    static url = (page) => `https://www.webnovelworld.org/novel/${TruyenFullCrawler.novelId}/?page=${page}`;
    static urlStoryContent = (chapter) => `https://www.webnovelworld.org/novel/${TruyenFullCrawler.slug}/chapter-${chapter}`;

    static name;
    static novel;

    static async setData({ novelId, slug, name, totalPage, referrer = "" }) {
        WebnovelWorldCrawler.novelId = novelId;
        WebnovelWorldCrawler.slug = slug;
        WebnovelWorldCrawler.totalPage = totalPage;
        WebnovelWorldCrawler.name = name;

        WebnovelWorldCrawler.attributes = {
            crawler: {
                url: referrer,
                id: novelId,
            }
        };
        return TruyenFullCrawler;
    }
}