const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority-select");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Assign priority class based on selected priority
        const priority = prioritySelect.value.toLowerCase() + "-priority";
        li.classList.add(priority);

        let deleteButton = document.createElement("span");
        deleteButton.innerHTML = "\u00d7";
        li.appendChild(deleteButton);

        let editButton = document.createElement("span");
        editButton.innerHTML = "✎";
        editButton.style.right = "45px";
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
    // Extract current task text and priority
    let currentTask = li.childNodes[0].textContent;
    let currentPriority = li.classList.contains("high-priority") ? "High" :
                         li.classList.contains("medium-priority") ? "Medium" :
                         "Low";

    // Prompt user to edit the task and priority
    let newTask = prompt("Edit your task", currentTask);
    let newPriority = prompt("Edit your priority (Low, Medium, High)", currentPriority);

    if (newTask !== null && newTask !== "") {
        li.childNodes[0].textContent = newTask;

        // Remove old priority class
        li.classList.remove("high-priority", "medium-priority", "low-priority");

        // Add new priority class
        if (newPriority === "High") {
            li.classList.add("high-priority");
        } else if (newPriority === "Medium") {
            li.classList.add("medium-priority");
        } else {
            li.classList.add("low-priority");
        }

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
    let editButtons = document.querySelectorAll("ul li span:nth-child(3)");
    editButtons.forEach(button => {
        button.onclick = function() {
            editTask(button.parentElement);
        };
    });
}

showTask();