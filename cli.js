const Program = require('commander');
const CrawlerRegistry = require('./src/cli/registry.crawler');
require("./src/dbs/mogodb.db");
async function run() {
    Program
        .version('0.1.0');

    Program
        .command('crawler [name]')
        .description("Crawler novel")
        .action(async function (name) {
            let crawler = CrawlerRegistry.crawler[name.toLowerCase()];
            await crawler.run();
            process.exit();
        })
    Program.parse(process.argv);
}

run();