const app = require("./src/app");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log("Run with " + PORT);
});
process.stdin.resume();
process.on("SIGINT", () => {
    server.close();
    process.exit();
});