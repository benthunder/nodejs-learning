const Program = require('commander');
const CrawlerRegistry = require('./src/cli/registry.crawler');
require("./src/dbs/mogodb.db");
async function run() {
    Program
        .version('0.1.0');
    Program
        .command('crawler [crawlerName] [novelId] [slug] [name] [totalPage] [referrer]')
        .description("Crawler novel")
        .action(async function (crawlerName, novelId, slug, name, totalPage, referrer) {
            let crawler = CrawlerRegistry.crawler[crawlerName.toLowerCase()];
            await crawler.setData({ novelId, slug, name, totalPage, referrer });
            await crawler.run();
            console.log(crawler);
            process.exit();
        })
    Program.parse(process.argv);
}

run();