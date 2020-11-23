const urlApi = 'http://localhost:3000';

//var categories = [ "sassi", "libri", "gruppi studio" ];

// var categories = [];

// function makeCatArray() {
//     var catchoices;
//     fetch(urlApi+"/categories")
//         .then(response=>response.json())
//         .then( res => {
//             count = res.count;
//             catlist = res.category;
//             catchoices = [];
//             for (let i=0; i<count; i++) {
//                 catchoices[i] = catlist[i].name;
//                 //qui funziona
//                 console.log(catchoices);
//             }
//             // return catchoices;
//         })
//         .catch( error => console.error(error) );
//     return catchoices;
// }

// categories = [] + makeCatArray();
// console.log(categories); //undefined

//function to add an announcement
function addAnnouncement(){
    var newTitle = document.getElementById("title").value;
    var newAuthor = document.getElementById("author").value;
    var newContent = document.getElementById("content").value;
    var newCategory = document.getElementById("cat").value;
    var newExpiryDate = document.getElementById("expiry_date").value;
    var newPublishDate = document.getElementById("publish_date").value;

    var count;
    var catlist;
    var newCatid;

    fetch(urlApi+"/categories")
    .then(response=>response.json())
    .then(res => {
        count = res.count;
        catlist = res.category;
        for (let i=0; i<count; i++) {
            if(catlist[i].name == newCategory) {
                newCatid = catlist[i]._id;
            }
        }
        return fetch(urlApi+"/announcements", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( 
                { 
                    
                    title: newTitle,
                    author: newAuthor,
                    content: newContent, 
                    category: newCatid,
                    publish_date: newPublishDate,
                    expiry_date: newExpiryDate
                }),
        })
        .then((resp) => {
            console.log(resp);
            console.log(newCatid);
        })
        
    })
    .catch( error => console.error(error) ); 

    //do the POST request with the data of the form
    // ----------- funziona -----------
    /*
    fetch(urlApi+"/announcements", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( 
            { 
                title: newTitle,
                author: newAuthor,
                content: newContent, 
                cat: newCategory,
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
    */
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

    const catSel = document.getElementById("cat");

    fetch(urlApi+"/categories")
        .then(response=>response.json())
        .then( res => {
            
            res.category.forEach(x => catSel.add(new Option(x.name, x.name)))            
            
            // count = res.count;
            // catlist = res.category;
            // for (let i=0; i<count; i++) {
            //     categories[i] = catlist[i].name;
            //     //qui funziona
            //     console.log(categories);
            // }

            // for (var x in categories){
            //     console.log(categories[x]);
            //     catSel.options[catSel.options.length] = new Option(categories[x]);
            // }
        })
        .catch( error => console.error(error) );

    
}