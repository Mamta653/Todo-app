let input = document.getElementById("input");
let list = document.getElementById("list");
let btn = document.getElementById("btn");



let tasks = [];

const saved = localStorage.getItem("tasks");

if (saved) {
    tasks = JSON.parse(saved);
}

render();

    function addTask() {
    if (input.value.trim() !== "") {

        const newTask = {
            id: Date.now(),
            text: input.value,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render(); 

        input.value = "";
    }
}

function deleteTask(id) {
   tasks = tasks.filter(task => task.id !== id);
   localStorage.setItem("tasks", JSON.stringify(tasks));
   render(); 
}
      
function render() {
    list.innerHTML = "";

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerText = task.text;

        li.classList.add("task-item");
      
  
        // double click → complete
        li.addEventListener("dblclick", function () {
            task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render(); 
        });

        if (task.completed) {
            li.classList.add("completed");
        }

        // delete button
        let delBtn = document.createElement("button");
        delBtn.innerText = "DEl";

         delBtn.classList.add("delete-btn");

        delBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}



btn.addEventListener("click", addTask);


input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});









   
  
