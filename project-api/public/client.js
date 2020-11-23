const urlApi = 'http://localhost:3000';
//when the page is loaded, I insert the cards
$(document).ready(function () {
    loadAll();    
});


//function to load the announcements
function loadAnnouncements(){  
  fetch(urlApi+"/announcements")
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      //obtains the number of announcements
      let count=res.count;
      let announcements=res.announcement;
      //var cards="<div class='card-deck'>";
      //with column the layout will change dinamicaly with the insertion of other cards
      printAnnouncement(count,announcements);
    });
}

//function to load the flyers
function loadFlyers(){
  fetch(urlApi+"/flyers")
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      //obtains the number of flyers
      let count=res.count;
      let flyers=res.flyer;
      //var cards="<div class='card-deck'>";
      //with column the layout will change dinamicaly with the insertion of other cards
      printFlyers(count,flyers);
    });
}

//print the announcements
function printAnnouncement(count,announcements){
  var cards="<div class='card-column'>";
    for(let i=0;i<count;i++){
      cards+="<div class='card bg-success'>";
      cards+="<div class='card-body text-center'>";
      cards+="<h3 class='card-title'> Author: "+announcements[i].author+"</h3>";
      //res+="<p class='card-text'>"+announcements[i].content+"</p>";
      cards+="<p class='card-text'> Publish date: "+announcements[i].publish_date+"</p>";
      cards+="<p class='card-text'> Expiry date: "+announcements[i].expiry_date+"</p>";
      cards+="<a class='btn btn-primary' onclick='show(\"announcement\",\""+announcements[i]._id+"\")'>See Announce</a>";
      cards+="<a class='btn btn-primary' onclick='deleteAnnouncement(\""+announcements[i]._id+"\")'>Delete Announce</a>";
      cards+="</div></div>";
    }
    cards+="</div>";
    document.getElementById('root').innerHTML=cards;
}

//print the flyers
function printFlyers(count,flyers){
  var cards="<div class='card-column'>";
  for(let i=0;i<count;i++){
    cards+="<div class='card bg-success'>";
    cards+="<div class='card-body text-center'>";
    cards+="<h3 class='card-title'> Author: "+flyers[i].author+"</h3>";
    cards+="<p class='card-text'> Publish date: "+flyers[i].publish_date+"</p>";
    cards+="<p class='card-text'> Expiry date: "+flyers[i].expiry_date+"</p>";
    cards+="<a class='btn btn-primary' onclick='show(\"flyers\",\""+flyers[i]._id+"\")'>See Flyer</a>";
    cards+="<a class='btn btn-primary' onclick='deleteFlyer(\""+flyers[i]._id+"\")'>Delete Flyer</a>";
    cards+="</div></div>";
  }
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}


function selectCat(id) {
  fetch(urlApi+ "/categories/"+ id)
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      let count=res.count;
      for(let i=0;i<count;i++){
        document.getElementById('root').innerHTML=res.announcement[i].author;
      }
    });
}

function deleteAnnouncement(id){
  fetch(urlApi+"/announcements/"+id, {
    method: 'DELETE'
  })
  .then((resp) => {
        console.log(resp);
        //redirect the page
        window.location.href='index.html';
        return;
  })
  .catch( error => console.error(error) );
}

function deleteFlyer(id){
  fetch(urlApi+"/flyers/"+id, {
    method: 'DELETE'
  })
  .then((resp) => {
        console.log(resp);
        //redirect the page
        window.location.href='index.html';
        return;
  })
  .catch( error => console.error(error) );
}

function loadAll(){
  var ann;
  fetch(urlApi+"/announcements")
  .then(announcement => announcement.json())
  .then(data=>{
      ann=data;
      return fetch(urlApi+"/flyers");
  })
  .then(flyers=> flyers.json())
  .then(fly=>{
      //console.log(ann.count,fly.count);
      printAll(ann,fly);        
  })
  .catch(err=>console.log(err));
  /*
 Promise.all([
  fetch(urlApi+"/announcements"),
  fetch(urlApi+"/flyers")
  ])
  .then(responses =>{
     return Promise.all(responses.map(response=> response.json()));
  })
  .then(data => console.log(data))
  .catch(err=>console.log(err));
  */
}


function printAll(announcements,flyers){
  let countAnn=announcements.count;
  let countFly=flyers.count;
  let annArray=announcements.announcement;
  let flyArray=flyers.flyer;
  var cards="<div class='card-column'>";
  cards+="<h2>Announcements</h2>";
  for(let i=0;i<countAnn;i++){
    cards+="<div class='card bg-success'>";
    cards+="<div class='card-body text-center'>";
    cards+="<h3 class='card-title'> Author: "+annArray[i].author+"</h3>";
    //res+="<p class='card-text'>"+announcements[i].content+"</p>";
    cards+="<p class='card-text'> Publish date: "+annArray[i].publish_date+"</p>";
    cards+="<p class='card-text'> Expiry date: "+annArray[i].expiry_date+"</p>";
    cards+="<a class='btn btn-primary' onclick='show(\"announcement\",\""+annArray[i]._id+"\")'>See Announce</a>";
    cards+="<a class='btn btn-primary' onclick='deleteAnnouncement(\""+annArray[i]._id+"\")'>Delete Announce</a>";
    cards+="</div></div>";
  }
  cards+="<h2>Flyers</h2>";
  for(let i=0;i<countFly;i++){
    cards+="<div class='card bg-success'>";
    cards+="<div class='card-body text-center'>";
    cards+="<h3 class='card-title'> Author: "+flyArray[i].author+"</h3>";
    cards+="<p class='card-text'> Publish date: "+flyArray[i].publish_date+"</p>";
    cards+="<p class='card-text'> Expiry date: "+flyArray[i].expiry_date+"</p>";
    cards+="<a class='btn btn-primary' onclick='show(\"flyers\",\""+flyArray[i]._id+"\")'>See Flyer</a>";
    cards+="<a class='btn btn-primary' onclick='deleteFlyer(\""+flyArray[i]._id+"\")'>Delete Flyer</a>";
    cards+="</div></div>";
  }  
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}

//with the function i pass if it's an announcement or flyer
function show(text,id){
  let path;
  if(text === "announcement") path="/announcements/";
  else path="/flyers/";

  fetch(urlApi+ path + id)
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      if(text === "announcement")
        //document.getElementById('root').innerHTML=res.announcement.content;
        printSingleAnnouncement(res.announcement);
      else 
        //document.getElementById('root').innerHTML=res.content;  
        printSingleFlyer(res);
    });
}

function printSingleAnnouncement(response){
  var cards="<div class='card-column'>";  
  cards+="<div class='card bg-success'>";
  cards+="<div class='card-body text-center'>";
  cards+="<h3 class='card-title'> Author: "+response.author+"</h3>";
  cards+="<p class='card-text'> Content: "+response.content+"</p>";
  cards+="<p class='card-text'> Publish date: "+response.publish_date+"</p>";
  cards+="<p class='card-text'> Expiry date: "+response.expiry_date+"</p>";
  cards+="</div></div>";
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}

function printSingleFlyer(response){
  var cards="<div class='card-column'>";  
  cards+="<div class='card bg-success'>";
  cards+="<div class='card-body text-center'>";
  cards+="<h3 class='card-title'> Author: "+response.author+"</h3>";
  cards+="<p class='card-text'> Content: "+response.content+"</p>";
  cards+="<p class='card-text'> Publish date: "+response.publish_date+"</p>";
  cards+="<p class='card-text'> Expiry date: "+response.expiry_date+"</p>";
  cards+="</div></div>";
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}




