 if("serviceWorker" in navigator) {
    //register service worker
    navigator.serviceWorker.register("service-worker.js"); //service worker file provide us to use the app in offline mode
 }
 
 let count = Number(window.localStorage.getItem("count")); //to save the data in local storage so it can be saved even we refresh the page
  if(!count) {
     window.localStorage.setItem("count", "0");
  }

 function createNote(noteTitle, noteBody) {

   document.getElementById("no-notes").classList.add("hidden");

     let li = document.createElement("li");
     let a = document.createElement("a");
     let h2 = document.createElement("h2");
     let p = document.createElement("p");
     let xButton = document.createElement("Button");

      xButton.classList.add("delete");

      let xText = document.createTextNode("X");
      let h2TN = document.createTextNode(noteTitle);
      let pTN = document.createTextNode(noteBody);

      h2.appendChild(h2TN);
      p.appendChild(pTN);
      xButton.appendChild(xText);

      a.appendChild(h2);
      a.appendChild(xButton);
      a.appendChild(p);
      a.setAttribute("href", "#");

      li.appendChild(a)

      document.getElementById("notes").appendChild(li);

 }
 
 function createNoteFromInput(e) {
    e.preventDefault();

    let noteTitle = document.getElementById("new-note-title-input").value;
    let noteBody = document.getElementById("new-note-body-input").value;

    document.getElementById("new-note-title-input").value = "";
    document.getElementById("new-note-body-input").value = "";
         
    count += 1;
       window.localStorage.setItem("count", count);
      //to save the same name title note more than one it will now be sve after this code before this code
      // the same name code will not be save bcz we have unique id for the title
      while (window.localStorage.getItem(noteTitle)) {
         noteTitle += " - 1"; 
      }

       window.localStorage.setItem(noteTitle, noteBody);

    createNote(noteTitle, noteBody);
 }

 function removeItem(e) {
    
    if(e.target.classList.contains("delete")){
     if(confirm('Are you sure you wanna delete the note?')){
        let li = e.target.parentElement.parentElement;
        let ul = document.getElementById("notes");
        
        ul.removeChild(li);
     }
    }
    //this is to reappear the text no ntes found when we delete the note
      count -= 1;
      window.localStorage.setItem("count",count);

      window.localStorage.removeItem(e.target.previousElementSibling.innerText);

        if(count < 1){
      document.getElementById("no-notes").className = "#";
   }
 }

  for(i = 0; i < count + 1; i++) {
     let noteTitle = window.localStorage.key(i); 
     let noteBody = window.localStorage.getItem(noteTitle);
        if(noteTitle !== "count" && noteTitle) {
     createNote(noteTitle, noteBody);
  }
}

document
.getElementById("inputForm")
.addEventListener("submit", createNoteFromInput, false);
    
document.getElementById("notes").addEventListener("click",removeItem);
