const urlApi= window.location.origin;

var userToken;

//when the page is loaded, I insert the cards
$(document).ready(function () {

  loadAll(); 

});

// ------------------------------------------------------------

//function to load the announcements
function loadAnnouncements(){

  const myHeaders = new Headers({ "authorization" : sessionStorage.getItem("token") });
  fetch(urlApi+"/private/announcements",
    {
      method : 'GET',
      headers : myHeaders 
    }
  )
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      //obtains the number of announcements
      let count=res.count;
      let announcements=res.announcement;
      console.log(myHeaders);
      printAnnouncement(count,announcements);
    });

}

// ------------------------------------------------------------

//function to load the flyers
function loadFlyers(){

  const myHeaders = new Headers({ "authorization" : sessionStorage.getItem("token") });
  fetch(urlApi+"/private/flyers",
    {
      method : 'GET',
      headers : myHeaders 
    }
  )
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      //obtains the number of flyers
      let count=res.count;
      let flyers=res.flyer;
      printFlyers(count,flyers);
    });

}

// ------------------------------------------------------------

// print the announcements
function printAnnouncement(count,announcements){

  console.log(announcements);
  var cards="<div class='card-column'>";
  cards+= "<div class= 'card-columns'>";
  for(let i=0;i<count;i++){

    if (!isExpired(announcements[i].expiry_date)){
      cards+="<div class='card'>";
      cards+="<div class='card-body text-center'>";
      cards+= "<div class='card-header text-center'><h4>" + announcements[i].title + "</h4></div>";
      cards+="<h5 class='card-header'> Contact: "+announcements[i].contact+"</h5>";
      cards+="<p class='card-text text-muted'> Publish date: "+announcements[i].publish_date+"<br>";
      cards+="Expiry date: "+announcements[i].expiry_date+"</p>";
      cards+="<a class='btn btn-primary' onclick='show(\"announcement\",\""+announcements[i]._id+"\")'>See Announce</a>";
      cards+="<a class='btn btn-danger' onclick='deleteAnnouncement(\""+announcements[i]._id+"\")'>Delete Announce</a>";
      cards+="</div></div>";
    }
    
  }
  cards+="</div></div>";
  document.getElementById('root').innerHTML=cards;

}

// ------------------------------------------------------------

// print the flyers
function printFlyers(count,flyers){

  var cards="<div class='card-column'>";
  cards+= "<div class= 'card-columns'>"
  for(let i=0;i<count;i++){

    if (!isExpired(flyers[i].expiryDate)){
      
      cards+="<div class='card'>";
      cards+="<div class='card-body text-center'>";
      cards+="<h5 class='card-header'> Contact: "+flyers[i].contact+"</h5>";
      //needs the path of the image for printing it
      if(flyers[i].image==null) cards+="<img  width='100%' height='180' src='../images/trasferimento.jpg' role='img'></img>";
      else cards+="<img  width='100%' height='180' src='"+ changePath(flyers[i].image) +"' role='img'></img>";
      cards+="<p class='card-text text-muted'> Publish date: "+flyers[i].publishDate+"<br>";
      cards+="Expiry date: "+flyers[i].expiryDate+"</p>";
      cards+="<a class='btn btn-primary' onclick='show(\"flyers\",\""+flyers[i]._id+"\")'>See Flyer</a>";
      cards+="<a class='btn btn-danger' onclick='deleteFlyer(\""+flyers[i]._id+"\")'>Delete Flyer</a>";
      cards+="</div></div>";
      
    }

  }
  cards+="</div></div>";
  document.getElementById('root').innerHTML=cards;

}

// ------------------------------------------------------------

// select the category
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

// ------------------------------------------------------------

// delete an announcement
function deleteAnnouncement(id){
  fetch(urlApi+"/private/announcements/"+id, {
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

// ------------------------------------------------------------

// delete a flyer
function deleteFlyer(id){
  fetch(urlApi+"/private/flyers/"+id, {
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

// ------------------------------------------------------------

// load announcements and flyers
function loadAll(){
  console.log(sessionStorage.getItem("token"));
  var ann;
  const myHeaders = new Headers({ "authorization" : sessionStorage.getItem("token") });
  fetch(urlApi+"/private/announcements",
    {
      method : 'GET',
      headers : myHeaders 
    }
  )
  .then(announcement => {
    return announcement.json()
  })
  .then(data=>{
      ann=data;
      return fetch(urlApi+"/private/flyers",
        {
          method : 'GET',
          headers : myHeaders 
        }
      );
  })
  .then(flyers=> {
    return flyers.json();
  })
  .then(fly=>{
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

// ------------------------------------------------------------

// print annoouncements and flyers
function printAll(announcements,flyers){

  let countAnn=announcements.count;
  let countFly=flyers.count;
  let annArray=announcements.announcement;
  let flyArray=flyers.flyer;
  
  // -------------------
  // print announcements
  //var cardsA="<div class='card-column'>";
  var cardsA="<h2>Announcements</h2>";
  cardsA+="<div class='card-columns'>";
  for(let i=0;i<countAnn;i++){
    if (!isExpired(annArray[i].expiry_date)){
      cardsA+="<div class= 'card'>";
      cardsA+="<div class='card-body text-center'>";
      cardsA+="<div class='card-header text-center'><h4>" + annArray[i].title + "</h4></div>";
      cardsA+="<h5 class='card-title'>"+annArray[i].contact+"</h5>";
      //res+="<p class='card-text'>"+announcements[i].content+"</p>";
      cardsA+="<p class='card-text text-muted'> Publish date: "+annArray[i].publish_date+"<br>";
      cardsA+="Expiry date: "+annArray[i].expiry_date+"</p>";
      cardsA+="<a class='btn btn-primary' onclick='show(\"announcement\",\""+annArray[i]._id+"\")'>See Announce</a>";
      cardsA+="<a class='btn btn-danger' onclick='deleteAnnouncement(\""+annArray[i]._id+"\")'>Delete Announce</a>";
      cardsA+="</div></div>";
    }    
  }
  cardsA+="</div>";
  document.getElementById('rootA').innerHTML=cardsA;

  // -------------------
  // print flyers
  //var cardsF="<div class='card-column'>";
  var cardsF ="<h2>Flyers</h2>";
  cardsF+="<div class='card-columns'>";
  for(let i=0;i<countFly;i++){
    if (!isExpired(flyArray[i].expiryDate)){
    cardsF+="<div class= 'card'>";
    cardsF+="<div class='card-body text-center'>";
    cardsF+="<h5 class='card-title'> Contact: "+flyArray[i].contact+"</h5>";

    // cardsF+="<img class='card-img-top' width='100%' height='180' source='"+urlApi+'/images/'+flyArray[i].image+"' role='img'></img>";
    // cardsF+="<img class='card-img-top' width='100%' height='180' source='https://github.githubassets.com/images/modules/logos_page/Octocat.png' role='img'></img>";
    // cardsF+="<img src='data:image/jpeg;"+flyArray[i].image+"'role='img'></img>";
    if(flyArray[i].image==null) cardsF+="<img  width='100%' height='180' src='../images/trasferimento.jpg' role='img'></img>";
    else cardsF+="<img  width='100%' height='180' src='"+ changePath(flyArray[i].image) +"' role='img'></img>";

    cardsF+="<p class='card-text text-muted'> Publish date: "+flyArray[i].publishDate+"<br>";
    cardsF+="Expiry date: "+flyArray[i].expiryDate+"</p>";
    cardsF+="<a class='btn btn-primary' onclick='show(\"flyers\",\""+flyArray[i]._id+"\")'>See Flyer</a>";
    cardsF+="<a class='btn btn-danger' onclick='deleteFlyer(\""+flyArray[i]._id+"\")'>Delete Flyer</a>";
    cardsF+="</div></div>";
    }
  }  
  cardsF+="</div>";
  document.getElementById('rootF').innerHTML=cardsF;
}

// ------------------------------------------------------------

//with the function i pass if it's an announcement or flyer
function show(text,id){
  let path;
  if(text === "announcement") path="/private/announcements/";
  else path="/private/flyers/";

  fetch(urlApi+ path + id)
  .then(response=>response.json())  //convert the response to json and pass it to the next promise
  .then(res => 
    {
      if(text === "announcement")
        //document.getElementById('root').innerHTML=res.announcement.content;
        printSingleAnnouncement(res.announcement);
      else 
        //document.getElementById('root').innerHTML=res.content;  
        printSingleFlyer(res.flyer);
    });
}

// ------------------------------------------------------------

// print a single announcement 
function printSingleAnnouncement(response){

  /*
  var cards="<div class='card-column'>";  
  cards+="<div class='card'>";
  cards+="<div class='card-body text-center'>";

  cards+="<h2 class='card-title text-center'>"+response.title+"</h2>";                                  // title
  cards+="<h5 class='card-text'>"+response.author+"</h5><hr class='red-line'>";                         // author
  cards+="<p class='card-text'>"+response.content+"</p>";                                               // content
  cards+="<p class='card-text'> Publish date: "+response.publish_date+"</p>";                                          // publish date
  cards+="<p class='card-text'> Expiry date: "+response.expiry_date+"</p>";                                           // expiry date

  cards+="</div></div>";
  cards+="</div>";
  */
  var ann="<div class='see-details'>";  
  ann+="<a class='btn btn-little' href='index.html' role='button'>Go back</a>";
  ann+="<h2 class='see-details-title text-center'>"+response.title+"</h2>";                                  // title
  ann+="<h5 class='see-details-text'>"+response.contact+"</h5><hr class='red-line'>";                         // author
  ann+="<p class='see-details-text'>"+response.content+"</p>";                                               // content
  ann+="<p class='see-details-footer'> [ Publish date: "+response.publish_date;                                          // publish date
  ann+="  -  Expiry date: "+response.expiry_date+" ]</p>";                                           // expiry date
  ann+="</div>";
  document.getElementById('root').innerHTML=ann;

}

// print a single flyer
function printSingleFlyer(response){
  /*
  var cards="<div class='card-column'>";  
  cards+="<div class='card'>";
  cards+="<div class='card-body text-center'>";

  cards+="<h2 class='card-title text-center'> Title: "+response.title+"</h2>";
  cards+="<h5 class='card-title'> Author: "+response.author+"<br></h5><hr class='red-line'>";
  // cards+="<p class='card-text'> Image: "+response.image+"</p>";
  cards+="<p class='card-text'> Publish date: "+response.publishDate+"</p>";
  cards+="<p class='card-text'> Expiry date: "+response.expiryDate+"</p>";

  cards+="</div></div>";
  cards+="</div>";
  */

  var fly="<div class='see-details'>";  
  fly+="<a class='btn btn-little' href='index.html' role='button'>Go back</a>";
  fly+="<h2 class='see-details-title text-center'>"+response.title+"</h2>";                                  // title
  fly+="<h5 class='see-details-text'>"+response.contact+"</h5><hr class='red-line'>";                         // author
  fly+="<p class='see-details-text'> Image: "+changePath(response.image)+"</p>";                                               // content
  fly+="<p class='see-details-footer'> [ Publish date: "+response.publishDate;                                          // publish date
  fly+="  -  Expiry date: "+response.expiryDate+" ]</p>";                                           // expiry date
  fly+="</div>";
  document.getElementById('root').innerHTML=fly;

}

// ------------------------------------------------------------

// load categories' buttons
function loadCategoriesBtn() {

    const catSel = document.getElementById("cat");

    fetch(urlApi + "/categories")
        .then(response => response.json())
        .then(res => { res.category.forEach(x => catSel.innerHTML+='<a class="btn btn-secondary" onclick="selectCat( \'' + x._id + '\' )" role="button">'+ x.name +'</a> ' ) } ) // label (displayed text) && value (send to server)
        .catch(error => console.error(error));

}

// ------------------------------------------------------------

function isExpired(date){      

    var today=new Date();
    var expiry_date=new Date(date);
    //console.log(expiry_date);
    if((today>expiry_date) || (expiry_date=='Invalid Date')){
        return true;
    }
    return false;

}

// ------------------------------------------------------------

function changePath(oldPath){

  // oldPath tipo "images\\7trasferimento.jpg"
  // newPath tipo "../images/7trasferimento.jpg"

  console.log(oldPath);
  if(oldPath.startsWith("images\\")){
    oldPath = oldPath.substring(7);
  }
  const newPath = "../images/" + oldPath;
  console.log(newPath);
  return newPath;

}
