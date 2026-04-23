let input = document.getElementById("input");
let list = document.getElementById("list");
let btn = document.getElementById("btn");
let priorityInput = document.getElementById("priority");
let dateInput = document.getElementById("dueDate");
let currentFilter = "all";   // all | active | completed
let currentSort = "none";    // none | date | priority | name

let tasks = [];
const saved = localStorage.getItem("tasks");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
if (saved) {
    tasks = JSON.parse(saved);
}
  function addTask() {
    if (input.value.trim() !== "") {
        const newTask = {
            id: Date.now(),
            text: input.value.trim(),
            completed: false,
            priority: priorityInput.value,
            dueDate: dateInput.value
        };
        tasks.push(newTask);
        saveTasks();
        render(); 

        input.value = "";
        priorityInput.value = "medium";
        dateInput.value = "";
    }
}

  function deleteTask(id) {
   tasks = tasks.filter(task => task.id !== id);
   saveTasks();
   render(); 
}



function updateActiveFilterUI() {
    document.getElementById("allBtn").classList.remove("active-filter");
    document.getElementById("activeBtn").classList.remove("active-filter");
    document.getElementById("completedBtn").classList.remove("active-filter");

    if (currentFilter === "all") {
        document.getElementById("allBtn").classList.add("active-filter");
    } else if (currentFilter === "active") {
        document.getElementById("activeBtn").classList.add("active-filter");
    } else if (currentFilter === "completed") {
        document.getElementById("completedBtn").classList.add("active-filter");
    }
}



      
  function render() {
    list.innerHTML = "";
    updateActiveFilterUI();
    let displayTasks = [...tasks]; // copy
        if (currentFilter === "active") {
        displayTasks = displayTasks.filter(task => !task.completed);
        } else if (currentFilter === "completed") {
        displayTasks = displayTasks.filter(task => task.completed);
        }

        if (currentSort === "name") {
        displayTasks.sort((a, b) => a.text.localeCompare(b.text));
        }

        if (currentSort === "date") {
        displayTasks.sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
        }


        if (currentSort === "priority") {
        const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
        };

    displayTasks.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    }

     displayTasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.add("task-item");

         let span = document.createElement("span");
         span.innerText = task.text;

        if (task.completed) {
        span.classList.add("completed");
        }
         let badge = document.createElement("span");
         badge.innerText = task.priority.toUpperCase();
         badge.classList.add("badge", task.priority);

        let date = document.createElement("span");
        date.innerText = task.dueDate ? `📅 ${task.dueDate}` : "";
        date.classList.add("date");

        if (task.priority === "high") {
        span.classList.add("priority-high");
        }

      
          // double click → complete
           span.addEventListener("dblclick", function () {
           span.contentEditable = true;
           span.focus();
        
        });

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

         checkbox.addEventListener("change", function () {
          task.completed = checkbox.checked;
          saveTasks();
          render();
         });
          
        // save 
         span.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                span.contentEditable = false;
                task.text = span.innerText;
                saveTasks();
                render();
            }
        });

        //blur save
        span.addEventListener("blur", function () {
        span.contentEditable = false;

        if (span.innerText.trim() === "") {
        deleteTask(task.id);
        } else {
        task.text = span.innerText;
        saveTasks();
        render();
        }

        });
          
        // delete button
        let delBtn = document.createElement("button");
        delBtn.innerText = "DEL";

        delBtn.addEventListener("mousedown", function(e) {
            e.preventDefault();
        });

        delBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        li.appendChild(checkbox);
        li.appendChild(badge);
        li.appendChild(span);
        li.appendChild(date);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}



     render();

    btn.addEventListener("click", addTask);
     input.addEventListener("keydown", function(event) {
     if (event.key === "Enter") {
        addTask();
     }
     
     });
     document.getElementById("allBtn").addEventListener("click", () => {
    currentFilter = "all";
    render();
    });

    document.getElementById("activeBtn").addEventListener("click", () => {
        currentFilter = "active";
        render();
    });

    document.getElementById("completedBtn").addEventListener("click", () => {
        currentFilter = "completed";
        render();
    });

    document.getElementById("sort").addEventListener("change", (e) => {
        currentSort = e.target.value;
        render();
    });




   
  
