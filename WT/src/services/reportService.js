import DBConnection from "./../configs/DBConnection";

let createreport = (data) => {
    return new Promise(async (resolve, reject) => {
            let userItem = {
                username: data.username,
                email: data.email,
                subject: data.subject,
                message: data.message
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO user_report set ? ', userItem,
                function(err, rows) {
                    if (err) {
                        reject(false)
                    }
                    resolve("entered successful");
                }
            );
        
    });
};
module.exports = {
    createreport: createreport
};
