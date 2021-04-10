let handlereport = async (req, res) => {
    
    return res.render("report.ejs", {
        name: process.env.NAMEE,
        email:process.env.EMAILL,
    });
};
module.exports = {
    handlereport: handlereport,
};