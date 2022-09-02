const { Router } = require('express');

const router = new Router();

// @Desc   Login Page
// @Router GET /dashboard/login
router.get("/login",(rew,res) => {
    res.render("login",{
        pageTitle: " ورورد به بخش مدیریت ",
        path: "/login",
    });
});

module.exports = router;