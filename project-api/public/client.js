/*
$(document).ready(function () {
  
    var apiUrl = "http://localhost:3000/board";  
    
    Product.load({
      success : function(collection){    
        $.each(collection, function(i, product){
          $(".products").append("<li id='{id}'>{name}</li>".replace("{name}", product.name)
                                                           .replace("{id}", product.id));
        });
      },  
      error : function(){
        alert("Products could not be retrieved");
      }
    });  
    
    $("ul").on("click", "li", function(e){
      var id = $(e.currentTarget).attr("id");
      console.log(id);
      Product.delete(id, {
        success : function(){
          console.log("Deleted!");
          window.location.reload();
        }, 
        error : function(){
          alert("Error: Could not delete element (id:" + id + ")");      
        }
      })
    });
    
    $(".opt-add").click(function(){
      var data = {
        name : $("#pname")[0].value,
        description : $("#pdesc")[0].value
      };
      
      Product.create(data, {
        success : function(received){
          window.location.reload();
        }
      });
    });
  
        
  });
  
  var BASE_URL = "http://localhost:3000/board";
  
  var Product = {
    
    load : function (cb){    
      $.getJSON(BASE_URL + "/products", cb.success).fail(cb.error);
    },
    
    create : function(data, cb){
      $.post(BASE_URL + "/products", data, cb.success, "json");      
    },
    
    delete : function(id, cb){
      $.ajax({
          url: BASE_URL + "/products/" + id,
          type: 'DELETE',
          success: cb.success,
          error: cb.error
      });    
      
    }
    
  };
  */

const urlApi = 'http://localhost:3000';
//when the page is loaded, I insert the cards

/*

$(document).ready(function () {
    loadAnnouncements();    
});

*/

function loadAnnouncements(){
  /*
  var xhttp= new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      //obtains the json object
      let text=this.responseText;
      let result=JSON.parse(text);
      //obtains the number of announcements
      let count=result.count;
      let announcements=result.announcement;
      var res="<div class='card-deck'>";
      //with column the layout will change dinamicaly with the insertion of other cards
      //var res="<div class='card-column'>";
      for(let i=0;i<count;i++){
        res+="<div class='card bg-success'>";
        res+="<div class='card-body text-center'>";
        res+="<h3 class='card-title'> Author: "+announcements[i].author+"</h3>";
        //res+="<p class='card-text'>"+announcements[i].content+"</p>";
        res+="<p class='card-text'> Publish date: "+announcements[i].publish_date+"</p>";
        res+="<p class='card-text'> Expiry date: "+announcements[i].expiry_date+"</p>";
        res+="<a class='btn btn-primary stretched-link' onclick='show(\""+announcements[i].content+"\")'>See Announce</a>";
        res+="</div></div>";
      }
      res+="</div>";
      document.getElementById('root').innerHTML=res;
    }
  }
  xhttp.open('GET',urlApi+'/announcements/',true);
  xhttp.send();
  */
fetch(urlApi+"/announcements")
.then(response=>response.json())  //convert the response to json and pass it to the next promise
.then(res => 
  {
    //obtains the number of announcements
    let count=res.count;
    let announcements=res.announcement;
    //var cards="<div class='card-deck'>";
    //with column the layout will change dinamicaly with the insertion of other cards
    var cards="<div class='card-column'>";
    for(let i=0;i<count;i++){
      cards+="<div class='card bg-success'>";
      cards+="<div class='card-body text-center'>";
      cards+="<h3 class='card-title'> Author: "+announcements[i].author+"</h3>";
      //res+="<p class='card-text'>"+announcements[i].content+"</p>";
      cards+="<p class='card-text'> Publish date: "+announcements[i].publish_date+"</p>";
      cards+="<p class='card-text'> Expiry date: "+announcements[i].expiry_date+"</p>";
      cards+="<a class='btn btn-primary' onclick='show(\""+announcements[i].content+"\")'>See Announce</a>";
      cards+="<a class='btn btn-primary' onclick='deleteAnnouncement(\""+announcements[i]._id+"\")'>Delete Announce</a>";
      cards+="</div></div>";
    }
    cards+="</div>";
    document.getElementById('root').innerHTML=cards;
  });
}

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
      var cards="<div class='card-column'>";
      for(let i=0;i<count;i++){
        cards+="<div class='card bg-success'>";
        cards+="<div class='card-body text-center'>";
        cards+="<h3 class='card-title'> Author: "+flyers[i].author+"</h3>";
        cards+="<p class='card-text'> Publish date: "+flyers[i].publish_date+"</p>";
        cards+="<p class='card-text'> Expiry date: "+flyers[i].expiry_date+"</p>";
        cards+="<a class='btn btn-primary' onclick='show(\""+flyers[i].content+"\")'>See Flyer</a>";
        cards+="<a class='btn btn-primary' onclick='deleteFlyer(\""+flyers[i]._id+"\")'>Delete Flyer</a>";
        cards+="</div></div>";
      }
      cards+="</div>";
      document.getElementById('root').innerHTML=cards;
    });
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
    cards+="<a class='btn btn-primary' onclick='show(\""+annArray[i].content+"\")'>See Announce</a>";
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
    cards+="<a class='btn btn-primary' onclick='show(\""+flyArray[i].content+"\")'>See Flyer</a>";
    cards+="<a class='btn btn-primary' onclick='deleteFlyer(\""+flyArray[i]._id+"\")'>Delete Flyer</a>";
    cards+="</div></div>";
  }  
  cards+="</div>";
  document.getElementById('root').innerHTML=cards;
}

//show the announce in a popup
function show(text){
  window.alert(text);
}




