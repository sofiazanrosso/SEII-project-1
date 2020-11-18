const urlApi = 'http://localhost:3000';

//function to add an announcement
function addAnnouncement(){
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