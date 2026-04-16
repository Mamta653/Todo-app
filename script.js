let input = document.getElementById("input");
let list = document.getElementById("list");
let btn = document.getElementById("btn");

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
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        render(); 

        input.value = "";
    }
}

  function deleteTask(id) {
   tasks = tasks.filter(task => task.id !== id);
   saveTasks();
   render(); 
}
      
  function render() {
    list.innerHTML = "";

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.add("task-item");

         let span = document.createElement("span");
         span.innerText = task.text;
      
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
        li.appendChild(span);
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