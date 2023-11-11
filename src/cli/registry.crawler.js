"use strict"
const TruyenFullCrawler = require('./crawler/truyenfull.crawler');

class CrawlerRegistry {
    static crawler = {}
    static registerCrawler(type, classRef) {
        CrawlerRegistry.crawler[type] = classRef;
    }

    static getCrawler(type) {
        return CrawlerRegistry.crawler[type];
    }
}

CrawlerRegistry.registerCrawler('truyenfull', TruyenFullCrawler)

module.exports = CrawlerRegistry;