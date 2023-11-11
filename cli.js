const CrawlerRegistry = require('./src/cli/registry.crawler');
async function run() {
    let processArgs = process.argv.slice(2);

    await CrawlerRegistry.crawler['truyenfull'].run();

    process.exit();
}

run();