//const category = require("../project-api/api/models/category");

const urlApi= window.location.origin;
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
  cards+= "<div class= 'card-columns'>";
    for(let i=0;i<count;i++){
      cards+="<div class='card'>";
      cards+="<div class='card-body text-center'>";
      cards+= "<div class='card-header text-center'><h4>" + announcements[i].title + "</h4></div>";
      cards+="<h5 class='card-header'> Author: "+announcements[i].author+"</h5>";
      cards+="<p class='card-text text-muted'> Publish date: "+announcements[i].publish_date+"<br>";
      cards+="Expiry date: "+announcements[i].expiry_date+"</p>";
      cards+="<a class='btn btn-primary' onclick='show(\"announcement\",\""+announcements[i]._id+"\")'>See Announce</a>";
      cards+="<a class='btn btn-danger' onclick='deleteAnnouncement(\""+announcements[i]._id+"\")'>Delete Announce</a>";
      cards+="</div></div>";
    }
    cards+="</div></div>";
    document.getElementById('root').innerHTML=cards;
}

//print the flyers
function printFlyers(count,flyers){
  var cards="<div class='card-column'>";
  cards+= "<div class= 'card-columns'>"
  for(let i=0;i<count;i++){
    cards+="<div class='card'>";
    cards+="<div class='card-body text-center'>";
    cards+="<h5 class='card-header'> Author: "+flyers[i].author+"</h5>";
    cards+="<img class='bd-placeholder-img card-img-top' width='100%' height='180' source='https://wips.plug.it/cips/supereva/cms/2016/06/img_2224798205917661.jpg?w=850&a=r' role='img'></img>";
    cards+="<p class='card-text text-muted'> Publish date: "+flyers[i].publish_date+"<br>";
    cards+="Expiry date: "+flyers[i].expiry_date+"</p>";
    cards+="<a class='btn btn-primary' onclick='show(\"flyers\",\""+flyers[i]._id+"\")'>See Flyer</a>";
    cards+="<a class='btn btn-danger' onclick='deleteFlyer(\""+flyers[i]._id+"\")'>Delete Flyer</a>";
    cards+="</div></div>";
  }
  cards+="</div></div>";
  document.getElementById('root').innerHTML=cards;
}


function selectCat(id) {
  fetch(urlApi+ "/categories/"+ id)
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      let count=res.count;
      let announcements=res.announcement;
      printAnnouncement(count,announcements);
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
  //var cardsA="<div class='card-column'>";
  var cardsA="<h2>Announcements</h2>";
  cardsA+="<div class='card-columns'>";
  for(let i=0;i<countAnn;i++){
    cardsA+="<div class= 'card'>";
    cardsA+="<div class='card-body text-center'>";
    cardsA+= "<div class='card-header text-center'><h4>" + annArray[i].title + "</h4></div>";
    cardsA+="<h5 class='card-title'> Author: "+annArray[i].author+"</h5>";
    //res+="<p class='card-text'>"+announcements[i].content+"</p>";
    cardsA+="<p class='card-text text-muted'> Publish date: "+annArray[i].publish_date+"<br>";
    cardsA+="Expiry date: "+annArray[i].expiry_date+"</p>";
    cardsA+="<a class='btn btn-primary' onclick='show(\"announcement\",\""+annArray[i]._id+"\")'>See Announce</a>";
    cardsA+="<a class='btn btn-danger' onclick='deleteAnnouncement(\""+annArray[i]._id+"\")'>Delete Announce</a>";
    cardsA+="</div></div>";
  }
  cardsA+="</div>";
  document.getElementById('rootA').innerHTML=cardsA;

  //var cardsF="<div class='card-column'>";
  var cardsF ="<h2>Flyers</h2>";
  cardsF+="<div class='card-columns'>";
  for(let i=0;i<countFly;i++){
    cardsF+="<div class= 'card'>";
    cardsF+="<div class='card-body text-center'>";
    cardsF+="<h5 class='card-title'> Author: "+flyArray[i].author+"</h5>";
    cardsF+="<img class='card-img-top' width='100%' height='180' source='https://github.githubassets.com/images/modules/logos_page/Octocat.png' role='img'></img>";
    cardsF+="<p class='card-text text-muted'> Publish date: "+flyArray[i].publish_date+"<br>";
    cardsF+="Expiry date: "+flyArray[i].expiry_date+"</p>";
    cardsF+="<a class='btn btn-primary' onclick='show(\"flyers\",\""+flyArray[i]._id+"\")'>See Flyer</a>";
    cardsF+="<a class='btn btn-danger' onclick='deleteFlyer(\""+flyArray[i]._id+"\")'>Delete Flyer</a>";
    cardsF+="</div></div>";
  }  
  cardsF+="</div>";
  document.getElementById('rootF').innerHTML=cardsF;
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
  cards+="<div class='card'>";
  cards+="<div class='card-body text-center'>";
  cards+="<h3 class='card-title'> Author: "+response.author+"<br></h3>";
  cards+="<p class='card-text'> Content: "+response.content+"</p>";
  cards+="<p class='card-text'> Publish date: "+response.publish_date+"</p>";
  cards+="<p class='card-text'> Expiry date: "+response.expiry_date+"</p>";
  cards+="</div></div>";
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}

function printSingleFlyer(response){
  var cards="<div class='card-column'>";  
  cards+="<div class='card'>";
  cards+="<div class='card-body text-center'>";
  cards+="<h3 class='card-title'> Author: "+response.author+"<br></h3>";
  cards+="<p class='card-text'> Content: "+response.content+"</p>";
  cards+="<p class='card-text'> Publish date: "+response.publish_date+"</p>";
  cards+="<p class='card-text'> Expiry date: "+response.expiry_date+"</p>";
  cards+="</div></div>";
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}


function loadCategoriesBtn() {

    const catSel = document.getElementById("cat");

    fetch(urlApi + "/categories")
        .then(response => response.json())
        .then(res => { res.category.forEach(x => catSel.innerHTML+='<a class="btn btn-secondary" onclick="selectCat( \'' + x._id + '\' )" role="button">'+ x.name +'</a> ' ) } ) // label (displayed text) && value (send to server)
        .catch(error => console.error(error));
}