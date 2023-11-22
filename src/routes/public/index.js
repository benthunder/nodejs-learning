const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
    return res.sendFile('chap-1.html', {
        root: "src/storages/djai-quan-gia-la-ma-hoang-654fcf831ca604fc9eb1eb83/"
    });
})

router.get("/novel/:slug", async (req, res, next) => {
    let url = req.params.slug;

    return res.sendFile('chap-1.html', {
        root: "src/storages/djai-quan-gia-la-ma-hoang-654fcf831ca604fc9eb1eb83/"
    });
})

module.exports = router;