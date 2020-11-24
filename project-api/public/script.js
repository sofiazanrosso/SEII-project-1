const urlApi = 'http://localhost:3000';


//function to add an announcement
function addAnnouncement() {
    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newContent = document.getElementById("content").value;
    const newCategory = document.getElementById("cat").value;
    const newExpiryDate = document.getElementById("expiry_date").value;
    const newPublishDate = document.getElementById("publish_date").value;

    fetch(urlApi + "/announcements", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                title: newTitle,
                author: newAuthor,
                content: newContent,
                category: newCategory,
                publish_date: newPublishDate,
                expiry_date: newExpiryDate
            }),
    })
        .then((resp) => {
            console.log(resp);
            console.log(newCategory);
        })
        .catch(error => console.error(error));
}

//function to add a new flyer
function addFlyer() {
    const newAuthor = document.getElementById("author").value;
    const newTitle = document.getElementById("title").value;
    const newCategory = document.getElementById("cat").value;
    const newExpiryDate = document.getElementById("expiry_date").value;
    const newPublishDate = document.getElementById("publish_date").value;

    const input = document.getElementById('fileinput');


    console.log(input);



    var formData = document.forms.namedItem('add');
    
    var oData = new FormData(formData);
    oData.append('mimeType', 'image/jpeg');

    console.log(formData);
    console.log(oData.values);

    var oReq = new XMLHttpRequest();
    oReq.open("POST", urlApi + "/flyers", true);

    oReq.onload = function (oEvent) {
        if (oReq.status == 200) {
            console.log("YESSA");
        } else {
            console.log(oReq.status + " occurred when trying to upload your file");
        }
    };


    oReq.send(oData);




    // //do the POST request with the data of the form
    // fetch(urlApi + "/flyers", {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: formData
    // })
    //     .then((resp) => {
    //         console.log(resp);
    //         //redirect the page
    //         // window.location.href = 'index.html';
    //         return;
    //     })
    //     .catch(error => console.error(error)); // If there is any error you will catch them here
}

function loadCategories() {

    const catSel = document.getElementById("cat");

    fetch(urlApi + "/categories")
        .then(response => response.json())
        .then(res => { res.category.forEach(x => catSel.add(new Option(x.name, x._id))) }) // label (displayed text) && value (send to server)
        .catch(error => console.error(error));
}