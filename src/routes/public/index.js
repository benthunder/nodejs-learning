const express = require("express");
const router = express.Router();
const { handleError } = require("../../core/handle-error.core");
router.get("/", (req, res, next) => {
    return res.sendFile('chap-1.html', {
        root: "/workspace/nodejs-learning/src/storages/example/"
    });
})
module.exports = router;