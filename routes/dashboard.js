const { Router } = require('express');

const router = new Router();

// @Desc   Dashboard
// @Route  GET /dashboard
router.get('/',(req,res) => {
    res.render("dashboard", 
    {pageTitle:"بخش مدیریت | داشبورد", 
    path:"/dashboard",
    layout:"./layouts/dashLayout",
});
});

// @Desc   Login Page
// @Route  GET /dashboard/login
router.get("/login",(rew,res) => {
    res.render("login",{
        pageTitle: " ورورد به بخش مدیریت ",
        path: "/login",
    });
});

module.exports = router;