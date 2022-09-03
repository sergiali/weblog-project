const { Router } = require('express');

const router = new Router();

// @Desc   Login Page
// @Route  GET /users/login
router.get("/login",(req,res) => {
    res.render("login",{
        pageTitle: " ورود به بخش مدیریت ",
        path: "/login",
    });
});

// @Desc   Register Page
// @Route  GET /users/register
router.get("/register",(req,res) => {
    res.render("register",{
        pageTitle: " ثبت نام کاربر جدید",
        path: "/register",
    });
});

// @Desc   Register Handle
// @Route  POST /users/register
router.post("/register",(req,res) => {
    console.log(req.body);
    res.send("weblog");
});

module.exports = router;