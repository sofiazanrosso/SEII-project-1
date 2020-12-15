const urlApi = window.location.origin;
//const urlApi="";

// ------------------------------------------------------------

// function to add an announcement
function addAnnouncement() {

    const newTitle = document.getElementById("title").value;
    const newContact = document.getElementById("contact").value;
    const newContent = document.getElementById("content").value;
    const newCategory = document.getElementById("cat").value;
    // const newExpiryDate = document.getElementById("expiryDate").value;
    // const newPublishDate = document.getElementById("publishDate").value;
    const newExpiryDate = document.getElementById("expiry_date").innerHTML;
    const newPublishDate = ""+new Date(document.getElementById("publish_date").value).toLocaleDateString();

    //TODO: Controllare che la data sia maggiore di quella odierna, e in caso positivo abilitare il btn add announcements

    fetch(urlApi + "/private/announcements", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization' : sessionStorage.getItem("token") },
        body: JSON.stringify(
            {
                title: newTitle,
                contact: newContact,
                content: newContent,
                category: newCategory,
                publish_date: newPublishDate,
                expiry_date: newExpiryDate
            }),
    })
    .then((resp) => {
        console.log(resp);
        console.log(newCategory);
        //redirect the page
        window.location.href = 'index.html';
    })
    .catch(error => console.error(error));

}

// ------------------------------------------------------------

// function to add a new flyer
function addFlyer() {

    var newContact = document.getElementById("contact").value;
    var newTitle = document.getElementById("title").value;
    // var newImage = document.getElementById("image").value;
    // var newExpiryDate = document.getElementById("expiryDate").value;
    // var newPublishDate = document.getElementById("publishDate").value;
    const newExpiryDate = document.getElementById("expiry_date").innerHTML;
    const newPublishDate = ""+new Date(document.getElementById("publish_date").value).toLocaleDateString();

    // do the POST request with the data of the form
    fetch(urlApi + "/private/flyers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization' : sessionStorage.getItem("token") },
        body: JSON.stringify(
            {
                title: newTitle,
                contact: newContact,
                // image: newImage,
                publishDate: newPublishDate,
                expiryDate: newExpiryDate
            }
        )
    })
    .then((resp) => {
        console.log(resp);
        //redirect the page
        window.location.href = 'index.html';
        return;
    })
    .catch(error => console.error(error)); // If there is any error you will catch them here

}

// ------------------------------------------------------------

// function to load categories
function loadCategories() {

    const catSel = document.getElementById("cat");

    fetch(urlApi + "/categories")
        .then(response => response.json())
        .then(res => { res.category.forEach(x => catSel.add(new Option(x.name, x._id))) }) // label (displayed text) && value (send to server)
        .catch(error => console.error(error));

}

// ------------------------------------------------------------

// function to search announcements
function searchAnnouncements() {

    // Create GET request with params
    const paramsUrl = new URL(urlApi + '/search/');

    // Params
    //paramsUrl.searchParams.append("includes", document.getElementById('includes').value);
    const params = document.getElementById('includes').value;
    
    /*
    paramsUrl.searchParams.append("caseSensitive", "false");
    paramsUrl.searchParams.append("from_publish", document.getElementById('from_publish').value);
    paramsUrl.searchParams.append("to_publish", document.getElementById('to_publish').value);
    paramsUrl.searchParams.append("from_expiry", document.getElementById('from_expiry').value);
    paramsUrl.searchParams.append("to_expiry", document.getElementById('to_expiry').value);
    */

    console.log("API REQ:");
    console.log(paramsUrl.href);

    // GET request
    fetch(paramsUrl + params)
        .then(res => res.json())
        .then(data => {

            console.log('aaaaaaa');
            console.log(data);

            // Fill html
            var cards = "<div class='card-columns'>";

            data.announcements.announcements.forEach(x => {
                cards += "<div class='card bg-success'>";
                cards += "<div class='card-body text-center'>";
                cards += "<h3 class='card-title'> contact: " + x.contact + "</h3>";
                cards += "<p class='card-text'> Publish date: " + x.publishDate + "</p>";
                cards += "<p class='card-text'> Expiry date: " + x.expiryDate + "</p>";
                cards += "<a class='btn btn-primary stretched-link' onclick='show(\"" + x.content + "\")'>See Announce</a>";
                cards += "</div></div>";
            });

            cards += "</div>";
            document.getElementById('root').innerHTML = cards;
        });

}


// ------------------------------------------------------------

// function to load dates
function loadDates() {

    const minDate = '1999-01-01';
    const d = new Date();
    const maxDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();

    // From
    document.getElementById('from_publish').value = minDate;
    document.getElementById('from_expiry').value = minDate;

    // To
    document.getElementById('to_publish').value = maxDate;
    document.getElementById('to_expiry').value = maxDate;

}

// ------------------------------------------------------------

function setExpiryDate(){

    const newPublishDate = document.getElementById("publish_date").value;    
    var tmp=Date.parse(newPublishDate);
    var exp=new Date(tmp);
    exp.setMonth(exp.getMonth()+2);
    exp=exp.toLocaleDateString();
    document.getElementById("expiry_date").innerHTML=exp;

    var tmp = new Date(newPublishDate);
    var today = new Date();
    today.setDate(today.getDate()-1);
    if (tmp < today){
        window.alert("Invalid data");
        document.getElementById("annBtn").disabled = true;
    } else {
        document.getElementById("annBtn").disabled = false;
    }

}

// ------------------------------------------------------------

//function to check the expiry date of the announcements
function checkExpiryDateAnn(){

    fetch(urlApi+"/announcements")
    .then(response=>response.json())  //convert the response to json and pass it to the next promise
    .then(res => 
    {
      //obtains the number of announcements
      let count=res.count;
      let announcements=res.announcement;      
      var today=new Date();
      var expired=[];
      for(var i=0;i<count;i++){
        var expiry_date=new Date(announcements[i].expiry_date);
        if((today>expiry_date) || (expiry_date=='Invalid Date')){
            //hide the announcement
            expired.push(announcements[i]._id);
        }
      }
    });

}
