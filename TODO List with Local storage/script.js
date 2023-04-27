// Global variables

let taskInput = document.querySelector(".taskInput input");
let taskBox = document.querySelector('.taskBox');
let clearBtn = document.querySelector('.clearBtn');
let filters = document.querySelectorAll('.filters span');

let editId;
let editTaskStatus = false;
let todos = JSON.parse(localStorage.getItem('todoList'));

// Filters

filters.forEach(button =>{
    button.addEventListener("click",()=>{

        document.querySelector("span.active").classList.remove('active');
        button.classList.add('active');

        // Function call
        console.log(button.id)
        showTodo(button.id)

    })


})

// Showing the Menu of Edit/Delete

function showMenu(taskSelected){
    let menuDiv = taskSelected.parentElement.lastElementChild;
    menuDiv.classList.add('show');
    document.addEventListener('click', e =>{
        if(e.target.tagName != "I" || e.target != taskSelected){
            // To close the menu
            menuDiv.classList.remove('show')
        }
    })
}

// Update Status

function updateStatus(taskSelected){

    let taskName = taskSelected.parentElement.lastElementChild;
    if(taskSelected.checked){
        taskName.classList.add('checked');
        todos[taskSelected.id].status = "completed"
    }else{
        taskName.classList.remove("checked");
        todos[taskSelected.id].status = "pending";
    }
    // Updating todos item in local storage
    localStorage.setItem("todoList",JSON.stringify(todos));

}

// Edit the task

function editTask(taskId,txtName){
    editId = taskId;
    editTaskStatus = true;
    taskInput.value = txtName;
    taskInput.focus();
    taskInput.classList.add('active');

}


// Delete the task

function deleteTask(deleteId,filter){
    editTaskStatus = false;
    todos.splice(deleteId,1);
    localStorage.setItem('todosList',JSON.stringify(todos));
    showTodo(filter);
}



// Creating Function for showTodo

function showTodo(filter){
    let liTag = "";
    if(todos){
        todos.forEach((todo , id) => {
            let completed = todo.status == "completed" ? "checked" : ""; 
            
            if(filter == todo.status || filter == "all"){

                liTag +=  `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                                  </div>
                                </li>`

            }
        })
    }

    taskBox.innerHTML = liTag || `<span>You don't have any task in your todo list </span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearBtn.classList.remove("active") : clearBtn.classList.add("active");

    taskBox.offsetHeight >= 320 ? taskBox.classList.add('overflow') : taskBox.classList.remove("overflow");
}

showTodo("all")

// addEventListener for task Input

taskInput.addEventListener('keyup',e => {

    // Value from taskInput
    let userTask = taskInput.value.trim();
    // When user press Enter Key.
    if(e.key == "Enter" && userTask){
        if(!editTaskStatus){
            todos = !todos ? [] : todos;
            let taskDetail = {name : userTask, status: "pending"};
            todos.push(taskDetail);
        }
        else{
            // In case of edit the existing task this block will run
            editTaskStatus = false;
            todos[editId].name = userTask;
        }

        taskInput.value = "";
        localStorage.setItem("todoList",JSON.stringify(todos));
    
        // Function Call to showTodo
        showTodo(document.querySelector('span.active').id);
    }

   
})