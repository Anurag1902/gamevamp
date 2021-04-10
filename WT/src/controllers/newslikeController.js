import DBConnection from "./../configs/DBConnection";

let handlealllikes = async (req, res) => {
    let a = process.env.USER;
    let data=[];
    let dataa;
    var i = 0;
    let b;
    let newslikeid;
    let data1 ={};
    a = parseInt(a);
    let sc = a;

    DBConnection.query('SELECT newslike.id,news.sourcename,news.title,news.description,news.url,news.urlToImage,news.publishedAt FROM news INNER JOIN newslike ON news.id = newslike.newsId WHERE userid='+sc,
        function (err, data) {
            // console.log(data);
            // console.log(err);
            return res.render("newslike.ejs", {
                data: data,
            });
        }
    );

    //     DBConnection.query('SELECT *FROM newslike where userId = ' + a,
    //     function (err, rows) {
    //         // console.log(rows);
    //         b = rows.length;
    //         // console.log(b);
    //         if (rows.length != 0) {
    //             rows.forEach(id1 => {
    //                 newslikeid = id1.id;
    //                 // console.log(id.id);
    //                 DBConnection.query('SELECT *FROM news where id = ' + id1.newsId,
    //                     function (err, rows) {
    //                         rows.forEach(id => {
    //                             data1 = {
    //                                 newslikeid : id1.id,
    //                                 sourcename: id.sourcename,
    //                                 title: id.title,
    //                                 description: id.description,
    //                                 url: id.url,
    //                                 urlToImage: id.urlToImage,
    //                                 publishedAt: id.publishedAt,
    //                             };
    //                             // console.log(id1.id);
    //                             data.push(data1);
                               
    //                             i++;
                        
    //                         });
                       
    //                         if (i == b) {
    //                             console.log("if == b" +b);
    //                             console.log(data);
    //                             return res.render("newslike.ejs", {
    //                                 data: data,
    //                             });
    //                         }
    //                     }
    //                 );
                   
    //             });
                
    //         } else {
    //             // console.log("Hi"+i);
    //             return res.render("newslike.ejs", {
    //                 data: rows,
    //             });
    //         }
    //     }
    // );
        


    
    
};

module.exports = {
    handlealllikes: handlealllikes,
};
