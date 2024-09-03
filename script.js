const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Create the delete button
        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        li.appendChild(deleteButton);

        // Create the edit button and append it next to the delete button
        let editButton = document.createElement("span");
        editButton.innerHTML = "✎";
        editButton.style.right = "45px"; // Position edit button next to delete button
        editButton.onclick = function() {
            editTask(li);
        };
        li.appendChild(editButton);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

function editTask(li) {
    let newTask = prompt("Edit your task", li.childNodes[0].textContent);
    if (newTask !== null && newTask !== "") {
        li.childNodes[0].textContent = newTask;
        saveData();
    }
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    // Reattach event listeners after loading from localStorage
    let editButtons = document.querySelectorAll("ul li span:nth-child(3)");
    editButtons.forEach(button => {
        button.onclick = function() {
            editTask(button.parentElement);
        };
    });
}

showTask();