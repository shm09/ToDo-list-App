const input = document.querySelector(".name");
const taskBtn = document.getElementById("btn");
const tasksMainEl = document.getElementById("tasks-list");
const tasksShow = document.getElementById("tasks-container");

let tasksArray = [];

// ? Check LocalStorage
checkLocalStorage();

// ? Check If No Element In tasks-container Function
checkTaskCount();

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("task")) {
        // Toggle Class Done
        e.target.classList.toggle("done");

        // Change Compelet State in LocalStorage
        let taskId = e.target.getAttribute("data-id");
        for (let i = 0; i < tasksArray.length; i++) {
            if (tasksArray[i].id == taskId) {
                tasksArray[i].complete == false
                    ? (tasksArray[i].complete = true)
                    : (tasksArray[i].complete = false);
            }
        }

        // Update LocalStorage Data
        addDataToLocalStorage(tasksArray);
    }
});

// Add Task Button
taskBtn.onclick = function () {
    if (input.value) {
        tasksMainEl.style.display = "block";

        tasksMainEl.style.transform = "scale(1)";

        addTaskToArray(input.value);

        input.value = "";
    }
};

function addTaskToArray(data) {
    let tasksContenet = {
        id: Date.now(),
        title: data,
        complete: false,
    };

    tasksArray.push(tasksContenet);

    // ? add Date To the Array
    addDataToLocalStorage(tasksArray);

    // ? Create Task Element And Added It To The Page
    createTaskEl(tasksContenet.title, tasksShow, tasksContenet.id);

    // ? Delete Button Function
    deleteTask();

    // ? Check tasksShow Element
    checkTaskCount();

    if (tasksShow.childElementCount == 2) {
        document.querySelector("div#no-tasks").remove();
    }
}

// TODO: Function To Create Task Elemnet
function createTaskEl(text, parentElement, id) {
    // ? Create Task Title Element
    const task = document.createElement("div");
    task.classList.add("task");
    task.setAttribute("data-id", id);

    // * Cretet Task Title ELmenet
    const taskTitel = document.createElement("p");
    taskTitel.append(document.createTextNode(text));

    // ? Create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete-btn";
    deleteBtn.append(document.createTextNode("Delete"));

    task.append(taskTitel);
    task.append(deleteBtn);

    parentElement.prepend(task);
}

// TODO: Create Delete Button Function
function deleteTask() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        // ? Add Click Event On Buttons
        btn.addEventListener("click", (e) => {
            // ? remove Clicked Parent Element
            e.target.parentElement.remove();

            tasksArray = tasksArray.filter((task) => {
                return (
                    task.id != e.target.parentElement.getAttribute("data-id")
                );
            });

            // ? Update Data In LocalStorage
            addDataToLocalStorage(tasksArray);

            // ? Check tasksShow Element
            checkTaskCount();
        });
    });
}

// TODO: Check LocalStorage Have Value
function addDataToLocalStorage(tasksArray) {
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function checkLocalStorage() {
    if (localStorage.getItem("tasks")) {
        const data = JSON.parse(localStorage.getItem("tasks"));
        tasksArray = data;
        data.forEach((task) => {
            createTaskEl(task.title, tasksShow, task.id);
        });
        deleteTask();
    }
}

// ? Check If No Element In tasks-container
function checkTaskCount() {
    const massege = document.createElement("div");

    massege.id = "no-tasks";

    massege.append(document.createTextNode("Not have any tasks to do"));

    massege.style.cssText = `font-size: 20px;
        font-weight: bold;
        text-align:center;`;
    if (tasksShow.childElementCount == 0) {
        tasksShow.append(massege);
    }
}
