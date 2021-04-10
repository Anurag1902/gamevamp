
import DBConnection from "./../configs/DBConnection";

let handlenews = async (req, res) => {
    
    // console.log(process.env.USER);
    
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://newsapi.org/v2/everything?q=esports&pageSize=100&from=2021-03-15&sortBy=popularity&language=en&apiKey=4538a091692c4a01b67eee587176f6ff',
        'headers': {
            'Cookie': '__cfduid=d7f4178dd59ab8923692f6c46bb3919d31617187618'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        let data = response.body ? JSON.parse(response.body) : {}
        data.articles.forEach(id => {
            let newsarticles = {
                sourcename: id.source.name,
                title: id.title,
                description: id.description,
                url: id.url,
                urlToImage: id.urlToImage,
                publishedAt: id.publishedAt,
            };
            // console.log("break");
            // console.log(newsarticles);
                
            DBConnection.query('SELECT title FROM news where title = "' + id.title + '"',
                function (err, rows) {
                        
                    //   console.log(rows);
                    // console.log(rows.TextRow.title);
                    if (rows.length == 0) {
                        DBConnection.query(
                            'INSERT INTO news set ?', newsarticles,
                            function (err, rows) {
                                if (err) {
                                    console.log(err);
                                }
                            }
                        )
                    }
                        
                });
        });
           
               
        return res.render("news.ejs", {
            user: req.user,
            data: data.articles,
        });
        // });

    
  
    });

};


let handleLike = async (req, res) => {
    var title = req.params.title;
    // console.log(title);
    var newsID;
    
    DBConnection.query('SELECT *FROM news WHERE title = "' + title + '"',
        function (err, rows) {
            // console.log(rows);
            if (err) { }
            else {
                rows.forEach(id => {
                    // console.log(id.id);
                    newsID = id.id;
                });
                // console.log("newsid: " + newsID);
                // console.log("userid: " + process.env.USER);
                DBConnection.query('SELECT *FROM newslike WHERE newsId = ' + newsID,
                    function (err, rows) {
                        // console.log(rows.length);
                        // console.log(rows);
                        // console.log(err);
                        if (rows.length == 0) {
                            let newslikee = {
                                userId: process.env.USER,
                                newsId: newsID,
                            }
                            DBConnection.query('INSERT INTO newslike set ? ', newslikee,
                                function (err, rows) { }
                            );
                        }
                    }
                );


                
            }

        }
    );
    return res.redirect('/news');
};


let handleLikeDelete = async (req, res) => {
    var deleteId = req.params.id;
    // console.log("delete id " + deleteId);
    DBConnection.query('DELETE FROM newslike where id= ' + deleteId,
        function (err, rows) {}
    );
    res.redirect('/newslike');
}

module.exports = {
    handlenews: handlenews,
    handleLike: handleLike,
    handleLikeDelete:handleLikeDelete,
};
