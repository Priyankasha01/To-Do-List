const inputBox = document.getElementById("input-box");
const dueDateInput = document.getElementById("due-date");
const listContainer = document.getElementById("list-container");

// Add Task
function addTask() {
    const taskText = inputBox.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            ${taskText} 
            ${dueDate ? `<span class="due-date">Due: ${dueDate}</span>` : ''}
            <button class="subtask-btn" onclick="addSubtask(this.parentElement)">Add Subtask</button>
            <button class="edit-btn" onclick="openEditModal(this.parentElement)">Edit</button>
            <span>&times;</span>
            <ul class="subtasks"></ul>
        `;
        listContainer.appendChild(li);
        saveData();  // Save data after adding a task
    }
    inputBox.value = "";
    dueDateInput.value = "";
}

// Add Subtask
function addSubtask(taskElement) {
    const subtaskName = prompt("Enter subtask:");
    if (subtaskName) {
        let subtaskDiv = document.createElement("li");
        subtaskDiv.classList.add("subtask");
        subtaskDiv.innerHTML = `
            ${subtaskName}
            <span>&times;</span>
        `;
        subtaskDiv.querySelector('span').addEventListener('click', function () {
            this.parentElement.remove();
            saveData();  // Save data after removing a subtask
        });
        taskElement.querySelector(".subtasks").appendChild(subtaskDiv);
        saveData();  // Save data after adding a subtask
    }
}

// Open Edit Modal
function openEditModal(taskElement) {
    const newTaskText = prompt("Edit task:", taskElement.childNodes[0].nodeValue.trim());
    const newDueDate = prompt("Edit due date (YYYY-MM-DD):", taskElement.querySelector(".due-date") ? taskElement.querySelector(".due-date").textContent.replace("Due: ", "") : "");

    if (newTaskText) {
        taskElement.childNodes[0].nodeValue = newTaskText + ' ';
        if (newDueDate) {
            if (taskElement.querySelector(".due-date")) {
                taskElement.querySelector(".due-date").textContent = "Due: " + newDueDate;
            } else {
                let dueDateSpan = document.createElement("span");
                dueDateSpan.className = "due-date";
                dueDateSpan.textContent = "Due: " + newDueDate;
                taskElement.insertBefore(dueDateSpan, taskElement.querySelector(".subtask-btn"));
            }
        }
        saveData();  // Save data after editing a task
    }
}

// Task Click Event
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("subtask")) {
        e.target.classList.toggle("checked");
        saveData();  // Save data after toggling a task
    } else if (e.target.tagName === "SPAN" && !e.target.classList.contains("due-date")) {
        e.target.parentElement.remove();
        saveData();  // Save data after removing a task
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call showTask to display tasks on page load
showTask();
