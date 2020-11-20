const urlApi = 'http://localhost:3000';

var categories = [ "sassi", "libri", "gruppi studio" ];

//function to add an announcement
function addAnnouncement(){
    var newTitle = document.getElementById("title").value;
    var newAuthor = document.getElementById("author").value;
    var newContent = document.getElementById("content").value;
    var newExpiryDate = document.getElementById("expiry_date").value;
    var newPublishDate = document.getElementById("publish_date").value;

    //do the POST request with the data of the form
    fetch(urlApi+"/announcements", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( 
            { 
                title: newTitle,
                author: newAuthor,
                content: newContent, 
                publish_date: newPublishDate,
                expiry_date: newExpiryDate
            }),
    })
    .then((resp) => {
        console.log(resp);
        //redirect the page
        window.location.href='index.html';
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

//function to add a new flyer
function addFlyer(){
    var newAuthor = document.getElementById("author").value;
    var newContent = document.getElementById("content").value;
    var newExpiryDate = document.getElementById("expiry_date").value;
    var newPublishDate = document.getElementById("publish_date").value;

    //do the POST request with the data of the form
    fetch(urlApi+"/flyers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( 
            { 
                author: newAuthor,
                content: newContent, 
                publish_date: newPublishDate,
                expiry_date: newExpiryDate
            }),
    })
    .then((resp) => {
        console.log(resp);
        //redirect the page
        window.location.href='index.html';
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
}

function loadCategories(){
    var catSel = document.getElementById("cat");
    for (var x in categories){
        console.log(categories[x]);
        catSel.options[catSel.options.length] = new Option(categories[x]);
    }
}