const urlApi = window.location.origin;

// ------------------------------------------------------------

addZero = str => str < 10 ? '0' + str : str;
const max = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
const min = (a,b) => a < b ? a : b;

// ------------------------------------------------------------

// function to add an announcement
function addAnnouncement() {

    const newTitle = document.getElementById("title").value;
    const newContact = document.getElementById("contact").value;
    const newContent = document.getElementById("content").value;
    const newCategory = document.getElementById("cat").value;
    
    const datePublish = document.getElementById("publish_date").value.replace('/','-');

    const dateY = parseInt(datePublish.split('-')[0]);
    const dateM = parseInt(datePublish.split('-')[1]);
    const dateD = parseInt(datePublish.split('-')[2]);
    const dateExpire = dateM > 10 ? ((dateY + 1) + '-' + addZero(dateM - 10) + '-' + addZero(min(dateD, max[dateM - 10]))) : (dateY + '-' + addZero(dateM + 2) + '-' + addZero(min(dateD, max[dateM + 2])));

    fetch(urlApi + "/private/announcements", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'authorization' : sessionStorage.getItem("token") },
        body: JSON.stringify(
            {
                title: newTitle,
                contact: newContact,
                content: newContent,
                category: newCategory,
                publish_date: datePublish,
                expiry_date: dateExpire
            }),
    })
    .then((resp) => {
        //redirect the page
        window.location.href = 'userspace.html';
    })
    .catch(error => console.error(error));

}

// ------------------------------------------------------------

// function to add a new flyer
function addFlyer() {

    var newContact = document.getElementById("contact").value;
    var newTitle = document.getElementById("title").value;
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
                publishDate: newPublishDate,
                expiryDate: newExpiryDate
            }
        )
    })
    .then((resp) => {
        //redirect the page
        window.location.href = 'usersapce.html';
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
    const params = document.getElementById('includes').value;

    // GET request
    fetch(paramsUrl + params)
        .then(res => res.json())
        .then(data => {
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
    
    const datePublish = document.getElementById("publish_date").value;

    const dateY = parseInt(datePublish.split('-')[0]);
    const dateM = parseInt(datePublish.split('-')[1]);
    const dateD = parseInt(datePublish.split('-')[2]);
    const newDate = dateM > 10 ? (addZero(min(dateD, max[dateM - 10])) + '/' + addZero(dateM - 10) + '/' + (dateY + 1)) : (addZero(min(dateD, max[dateM + 2])) + '/' + addZero(dateM + 2) + '/' + dateY);

    document.getElementById("expiry_date").innerHTML = newDate;

    var tmp = new Date(datePublish);
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

// ------------------------------------------------------------