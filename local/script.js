const urlApi=window.location.origin;
//const urlApi="";
//function to add an announcement
function addAnnouncement() {
    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newContent = document.getElementById("content").value;
    const newCategory = document.getElementById("cat").value;
    const newExpiryDate = document.getElementById("expiryDate").value;
    const newPublishDate = document.getElementById("publishDate").value;

    fetch(urlApi + "/announcements", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                title: newTitle,
                author: newAuthor,
                content: newContent,
                category: newCategory,
                publishDate: newPublishDate,
                expiryDate: newExpiryDate
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

//function to add a new flyer
function addFlyer() {
    // var newAuthor = document.getElementById("author").value;
    // var newContent = document.getElementById("content").value;
    // var newExpiryDate = document.getElementById("expiryDate").value;
    // var newPublishDate = document.getElementById("publishDate").value;

    // new way
    var formData = document.forms.namedItem('add');

    var oData = new FormData (formData);
    oData.append('mimeType', 'image/jpeg');

    console.log(formData);
    console.log(oData.values);

    var oReq = new XMLHttpRequest();
    oReq.open("POST", urlApi + "/flyers", true);

    oReq.onload = function (oEvent) {
        if (oReq.status = 200) {
            console.log("YESSA");
        } else {
            console.log(oReq.status + " occurred when trying to upload your file");
        }
    };
    console.log("funzia");
    try {
        oReq.send(oData);
    } catch (err) {
        console.log(err);
    }

    //do the POST request with the data of the form
    /*fetch(urlApi + "/flyers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                author: newAuthor,
                content: newContent,
                publishDate: newPublishDate,
                expiryDate: newExpiryDate
            }),
    })
        .then((resp) => {
            console.log(resp);
            //redirect the page
            window.location.href = 'index.html';
            return;
        })
        .catch(error => console.error(error)); // If there is any error you will catch them here
    */
}

function loadCategories() {

    const catSel = document.getElementById("cat");

    fetch(urlApi + "/categories")
        .then(response => response.json())
        .then(res => { res.category.forEach(x => catSel.add(new Option(x.name, x._id))) }) // label (displayed text) && value (send to server)
        .catch(error => console.error(error));
}

function searchAnnouncements() {

    // Create GET request with params
    const paramsUrl = new URL(urlApi + '/search');

    // Params
    paramsUrl.searchParams.append("includes", document.getElementById('includes').value);
    paramsUrl.searchParams.append("caseSensitive", "false");
    paramsUrl.searchParams.append("from_publish", document.getElementById('from_publish').value);
    paramsUrl.searchParams.append("to_publish", document.getElementById('to_publish').value);
    paramsUrl.searchParams.append("from_expiry", document.getElementById('from_expiry').value);
    paramsUrl.searchParams.append("to_expiry", document.getElementById('to_expiry').value);

    console.log(paramsUrl.href);



    // GET request
    fetch(paramsUrl)
        .then(res => res.json())
        .then(data => {

            // Fill html
            var cards = "<div class='card-deck'>";

            data.announcements.forEach(x => {
                cards += "<div class='card bg-success'>";
                cards += "<div class='card-body text-center'>";
                cards += "<h3 class='card-title'> Author: " + x.author + "</h3>";
                cards += "<p class='card-text'> Publish date: " + x.publishDate + "</p>";
                cards += "<p class='card-text'> Expiry date: " + x.expiryDate + "</p>";
                cards += "<a class='btn btn-primary stretched-link' onclick='show(\"" + x.content + "\")'>See Announce</a>";
                cards += "</div></div>";
            });

            cards += "</div>";
            document.getElementById('root').innerHTML = cards;
        });
}

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