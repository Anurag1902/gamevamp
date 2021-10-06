let handleHelloWorld = async (req, res) => {
    process.env.USER = req.user.id;
    // console.log(process.env.USER);
    process.env.EMAILL = req.user.email;
    // console.log("email: " + process.env.EMAILL);
    process.env.NAMEE = req.user.fullname;
    // console.log("name: " + process.env.NAMEE);
    console.log()
    return res.render("homepage.ejs",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
