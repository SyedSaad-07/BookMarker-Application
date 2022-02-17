// listen for form submit

let myform = document.getElementById('myform');
myform.addEventListener('submit',saveBookmark);

function saveBookmark(e){
    e.preventDefault();
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteUrl,siteName)){
        return false;
    }
    let bookMark = {
        name : siteName,
        url : siteUrl
    }

    // local storage -- local storage only stores string
    // but we can parse the JSON into string and save it.

    if(localStorage.getItem('bookmarks')===null){
        // initialize array
        let bookmarks = [];
        // Add to array
        bookmarks.push(bookMark);
        // Add to localStorage
        // JSON.stringify turn json object into string.
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }else{
        // get bookmarks from localstorage
        // JSON.parse turn string back into json
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookMark);
        // reset it to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    siteName.value='';
    siteUrl.value='';
    document.getElementById('myform').reset();
    // re-fetch bookmarks.
    fetchBookmarks();

}

// delete bookmark
function deleteBookmark(url){

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            bookmarks.splice(i,1); // splice current iteration and one from that.

        }
    }
    // reset localStorage.
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    // re-fetch bookmarks.
    fetchBookmarks();
}

function fetchBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    let bookmarksResults = document.getElementById('BookmarksResult');

    bookmarksResults.innerHTML='';
    for(let i=0; i<bookmarks.length;i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML +='<div class="well">'+
                                        `<h3>${name}`+
                                        ` <a class="btn btn-default" target="_blank" href="${url}">Visit</a> `+
                                          ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>  </h3>'+
                                            '</div>';
    }
}

// for validation
function validateForm(siteUrl, siteName){
    if(!siteUrl || !siteName){
        alert('Please fill the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('please use the malid url');
        return false;
    }

    return true;
}