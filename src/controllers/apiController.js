const { name } = require('ejs');
const { forEach } = require('mysql2/lib/constants/charset_encodings');
import DBConnection from "./../configs/DBConnection";
let handleAPI = async (req, res) => {
  let y = process.env.USER;
    y = parseInt(y);
    // console.log(y);
   
    
  var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.gamescorekeeper.com/v1/competitions?sport=csgo&from=2021-03-28',
  'headers': {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  let data = response.body ? JSON.parse(response.body) : {}
  data.competitions.forEach(id => {

    var unixtimestamp = id.startDate;
    var months_arr = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var date = new Date(unixtimestamp);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var convdataTime =year+'-'+ month+'-'+day+' ';
 
 var unixtimestamp1 = id.endDate;
 
 // Months array
 var months_arr = ['01','02','03','04','05','06','07','08','09','10','11','12'];
 
 // Convert timestamp to milliseconds
 var date = new Date(unixtimestamp1);
 
 // Year
 var year = date.getFullYear();
 
 // Month
 var month = months_arr[date.getMonth()];
 
 // Day
 var day = date.getDate();
 
 // Hours
 var hours = date.getHours();
 
 // Minutes
 var minutes = "0" + date.getMinutes();
 
 // Seconds
 var seconds = "0" + date.getSeconds();
 
 // Display date time in MM-dd-yyyy h:m:s format
 var convdataTime1 =year+'-'+ month+'-'+day+' ';
//  console.log(convdataTime);
//  console.log(convdataTime);
 

      // console.log("empty");
     DBConnection.query(
      'INSERT IGNORE INTO competitions VALUES ('+id.id+','+'"'+id.name+'","'+convdataTime+'","'+convdataTime1+'",'+id.prizePoolUSD+')',
        function(err, rows) {
          
        }
    );
  
    

    // console.log("Name : " +id.name) ;
    var options1 = {
      'method': 'GET',
    'url': 'https://api.gamescorekeeper.com/v1/competitions/'+id.id +'/participants',
    'headers': {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
    }
    };
    request(options1, function (error, response) {
      //  if (error) throw new Error(error);
      let data = response.body ? JSON.parse(response.body) : {}
      if (data.participants.length != 0) {
        // console.log("Participants only in "+id.id);
      
        
      } else { }
     
    });
  
  });
 



   return res.render("api.ejs", {
           data1: data.competitions,
            // data1 : data,
        });
});

   
    

}



let handlelolAPI = async (req, res) => {
    
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.gamescorekeeper.com/v1/competitions?sport=lol&from=2021-03-28',
  'headers': {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  let data = response.body ? JSON.parse(response.body) : {}
  data.competitions.forEach(id => {
    console.log("Name : " +id.name) ;
 
  console.log(id.sportAlias);
  console.log(id.startDate);
  console.log(id.endDate);
  });
 
   return res.render("lol.ejs", {
           data1: data.competitions,
            // data1 : data,
        });
});
}

let handledotaAPI = async (req, res) => {
    
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.gamescorekeeper.com/v1/competitions?sport=dota2&from=2021-03-28',
  'headers': {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
  }
};
request(options, function (error, response) { 
  // if (error) throw new Error(error);
  let data = response.body ? JSON.parse(response.body) : {}
  data.competitions.forEach(id => {
    console.log("Name : " +id.name) ;
 
  console.log(id.sportAlias);
  console.log(id.startDate);
  console.log(id.endDate);
  });
 
   return res.render("dota2.ejs", {
           data1: data.competitions,
            // data1 : data,
        });
});
}


module.exports = {
  handleAPI: handleAPI,
  handlelolAPI: handlelolAPI,
  handledotaAPI: handledotaAPI,
}
