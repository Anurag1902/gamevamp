import DBConnection from "./../configs/DBConnection";

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
            let userItem = {
                title: data.title,
                date: data.date,
                team1: data.team1,
                team2: data.team2,
                winner: data.winner,
                reward: data.reward
            };

            //create a new account
            DBConnection.query(
                ' INSERT INTO match_details set ? ', userItem,
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
    createNewUser: createNewUser
};
