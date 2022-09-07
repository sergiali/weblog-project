const bcrypt = require("bcryptjs");
const passport = require('passport');

const User = require("../model/user");

exports.login = (req,res) => {
    res.render("login", {
        pageTitle: "ورود به بخش مدیریت",
        path: "/login" ,
        message: req.flash("success-msg"),
        error: req.flash("error"),
    });
};

exports.handleLogin = (req,res,next) => {
    passport.authenticate("local",{
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req,res,next);
};

exports.logout = (req,res,next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    });
    req.flash("success_msg"," خروج موفقیت آمیز بود ");
    res.redirect("/users/login");
};

exports.register =  (req, res) => {
    res.render("register", {
        pageTitle: "ثبت نام کاربر جدید",
        path: "/register",
    });
};

exports.creatUser =  async (req, res) => {
    const errors = [];
    try {
        await User.userValidation(req.body);
        const { fullname, email, password } = req.body;
        const user = await User.findOne({email});
        if(user){
            errors.push({message: " کاربری با این ایمیل موجود میباشد "});
            return res.render("register", {
                pageTitle: "ثبت نام کاربر",
                path: "/register",
                errors,
            });
        }

        const hash = await bcrypt.hash(password,10);
        await User.create({
                        fullname,
                        email,
                        password:hash,
                    });
                    req.flash("success-msg"," ثبت نام با موفقیت انجام شد ");
                    res.redirect("/users/login");


        //* bcrypt.genSalt(10,(err,salt) =>{
        //     if(err) throw err;
        //     bcrypt.hash(password,salt, async (err,hash) => {
        //         if(err) throw err;
        //         await User.create({
        //             fullname,
        //             email,
        //             password:hash,
        //         });
        //         res.redirect("/users/login");
        //     });
        //* });

         // const user = new User({
        //     fullname,
        //     email,
        //     password,
        // });
        // user.save()
        //     .then((user) => {
        //         console.log(user);
        //         res.redirect("/users/login");
        //     })
        //     .catch((err) => {
        //         if (err) throw err;
        //     });
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });

        return res.render("register", {
            pageTitle: "ثبت نام کاربر",
            path: "/register",
            errors,
        });
    };
};