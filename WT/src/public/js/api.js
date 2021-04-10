
// // var myHeaders = new Headers();
// // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI");

// var requestOptions = {
//   method: 'GET',
//   headers:  {
//     "Content-Type": "application/json",
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI",
//     // 'Access-Control-Allow-Origin': 'http://localhost' ,
//     // 'Access-Control-Allow-Methods': 'GET',
//     //  'Access-Control-Allow-Methods': 'POST',
//     //   'Access-Control-Allow-Methods': 'HEAD',
//     // 'Access-Control-Allow-Methods': 'OPTIONS',
//     // 'Access-Control-Allow-Credentials': true ,
//     // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// },
//     mode: 'no-cors',
//   redirect: 'follow'
// };
// var events = []
// fetch(" https://api.gamescorekeeper.com/v1/fixtures?page=1&pageCount=2", requestOptions)
//   .then(response => {
//       console.log(response);
//       return response.text()
//   })
//   .then(result =>{
//       let data =  result ? JSON.parse(result):{}
//       console.log(data)
//     //   events=data 
//     //   events.map(event=>{
//     //     //   console.log(event)
//     //       let div =`<div class="container"><h2 style="text-align: center;">${event.videogame.name}</h2>
//     //       <p style="color:rgba(240, 248, 255, 0.527);font-family:Arial;text-align:center">League name:${event.league.name}</p>
//     //       <img style="height:200px;width:300px"src="${event.league.image_url}">
//     //       <p style="color: rgba(221, 200, 240, 0.897);font-family:Arial;text-align:center">Time: ${event.begin_at}</p></div>`       
//     //       document.querySelector('#test').innerHTML +=div
//     // console.log()
//     //   })
//   })
//   .catch(error => console.log('error', error));

// let fetchLink = ' https://api.gamescorekeeper.com/v1/fixtures?page=1&pageCount=2';

// fetch(fetchLink, {
//     method: 'GET',
//     headers: new Headers({
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI',
                    
//     })
// })
            
//     .then(
//         function (response) {
//             return response.json();
//         }
//     )
//     .then(
//         data => {
//             console.log(data);
//         })
var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.gamescorekeeper.com/v1/competitions?sport=csgo',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYXNpbmdoNHZpbkBnbWFpbC5jb20iLCJpc3MiOiJHYW1lU2NvcmVrZWVwZXIiLCJqdGkiOjQ0NjAwNTAxMjQ3MTI5NjU2NzksImN1c3RvbWVyIjp0cnVlfQ.BKGqf59iXBrQMkMKqvmDviM-1Cwj0jW3E_ttXcRK1fI'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});