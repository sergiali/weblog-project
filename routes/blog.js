const {Router} = require('express');

const router = new Router();

// @desc  Weblog Index Page
// @Routes GET /
router.get("/",(req,res) => {
    res.render('index',{
        pageTitle: " simple weblog",
        path: "/"
    });
})

module.exports = router;