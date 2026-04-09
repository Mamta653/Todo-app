const input = document.getElementById("input");
const btn = document.getElementById("btn");
const list = document.getElementById("list");

let tasks = [];


function render() {
  list.innerHTML = "";

  tasks.forEach(function(task) {
    const li = document.createElement("li");
    li.textContent = task.text;


    //   strikethrough if completed
    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.5";
    }

    //   create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = function() {
      toggleTask(task.id);
    };



   // delete approach 
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
      deleteTask(task.id);
    };







    li.prepend(checkbox);
    li.appendChild(deleteBtn); 
    list.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  render(); 
  input.value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });


  function toggleTask(id) {
  tasks = tasks.map(function(task) {
    if (task.id === id) {
      return { ...task, completed: !task.completed }; 
    }
    return task;   
  });

  render();
}

  render();
}


btn.addEventListener("click", addTask);