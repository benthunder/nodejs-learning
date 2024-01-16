const Program = require('commander');
const CrawlerRegistry = require('./src/cli/registry.crawler');
const GoogleService = require('./src/services/googletranslate.service')
require("./src/dbs/mogodb.db");
async function run() {
    Program
        .version('0.1.0');
    Program
        .command('crawler [crawlerName] [novelId] [slug] [name] [totalPage] [referrer]')
        .description("Crawler novel")
        .action(async function (crawlerName, novelId, slug, name, totalPage, referrer) {
            let crawler = CrawlerRegistry.getCrawler(crawlerName.toLowerCase());
            await crawler.setData({ novelId, slug, name, totalPage, referrer });
            await crawler.run();

            console.log('Done crawler ' + name);
            process.exit();
        });

    Program.parse(process.argv);
}

run();