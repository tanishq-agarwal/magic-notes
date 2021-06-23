console.log("Welcome to notes app. This is app.js");
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) { //on starting there will probably be no notes in localStorage
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes); //convert notes written in string to array 
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));//store notes in string in localStorage
    addTxt.value = ""; //After writing text and clicking Add Note button , text will disappear from textarea(becomes empty as it was before to write another note)
    //console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) { //notesObj is an array so we can use for each loop
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5> 
                        <p class="card-text"> ${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) { //if there are notes, display it otherwise print the legit message
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

//function to delete a note
function deleteNote(index) {
    //console.log('I am deleting', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1); //delete the indexed(0,1,2,...) note only(1 means only 1 note to be deleted)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){

    let inputVal = search.value;
    //console.log("Input event fired!", inputVal)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt)
    })
})