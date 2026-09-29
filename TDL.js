// const input = document.querySelector("#text");

// const button = document.querySelector("#btn");

// button.addEventListener("click", () => {

//     let temp = input.value;

//     const scr = document.querySelector(".text");
//     // const scr=document.createElement("div");

//     const checkbox = document.createElement("input");//d
//     checkbox.type = "checkbox";

//     const task = document.createElement("span");
//     task.innerText = temp;
//     // task.style.display="block";

//     scr.appendChild(checkbox);//scr is parent....checkbox is child of scr...
//     scr.appendChild(task);
//     // scr.style.display="block";
//     input.value="";

//     checkbox.addEventListener("click", () => {
//         if(checkbox.checked){
//         task.style.textDecoration = "line-through";}
//         else{
//             task.style.textDecoration="none";
//         }
//     });
// });?????????????????????????????????????????????????///////////^^^^^^^^^^//////////////////////////////////////////////////////
const input = document.querySelector("#text");
const button = document.querySelector("#btn");
const scr = document.querySelector(".text");

const total = document.querySelector("#total");
const pending = document.querySelector("#pending");
const completed = document.querySelector("#completed");
const proval=document.querySelector("#progval");
const progressbar = document.querySelector("#progressbar");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// loading previously saved tasks.
// If nothing is saved, JSON.parse(null) gives null,
// then || [] gives an empty array.

total.innerText = tasks.length;


button.addEventListener("click", () => {

    let temp = input.value;   // FIX: get value from input


    const taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const task = document.createElement("span");

    task.innerText = temp;


    const newTask = {
        id: Date.now(),
        text: temp,
        completed: false
    };


    if (temp.trim() != "") {

        tasks.push(newTask);

        total.innerText = tasks.length;


        task.addEventListener("click", () => {

            const edit = prompt("Edit your task:", task.innerText);

            if (edit.trim() != "") {

                task.innerText = edit;
                newTask.text = edit;

                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

        });


        const deleteButton = document.createElement("button");

        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';


        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(task);
        taskDiv.appendChild(deleteButton);

        scr.appendChild(taskDiv);


        input.value = "";


        // SAVE ARRAY TO LOCAL STORAGE
        localStorage.setItem("tasks", JSON.stringify(tasks));


        // CHECKBOX
        checkbox.addEventListener("click", () => {

            if (checkbox.checked) {

                task.style.textDecoration = "line-through";
                newTask.completed = true;

            }

            else {

                task.style.textDecoration = "none";
                newTask.completed = false;

            }


            // counting completed tasks

            let count = 0;

            tasks.forEach((task) => {

                if (task.completed === true) {
                    count++;
                }

            });


            completed.innerText = count;
            pending.innerText = tasks.length - count;

if (tasks.length == 0) {
    proval.innerText = "0%";
    progressbar.style.width = "0%";
}
else {
    let percentage = (count / tasks.length) * 100;

    proval.innerText = percentage + "%------";
    progressbar.style.width = percentage + "%";
}
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });


        // DELETE

        deleteButton.addEventListener("click", () => {

            taskDiv.remove();

            tasks = tasks.filter((mitesh) => mitesh.id !== newTask.id);


            // recalculate counters after deleting

            let count = 0;

            tasks.forEach((task) => {

                if (task.completed === true) {
                    count++;
                }

            });


            total.innerText = tasks.length;
            completed.innerText = count;
            pending.innerText = tasks.length - count;
            if (tasks.length == 0) {
    proval.innerText = "0%";
    progressbar.style.width = "0%";
}
else {
    let percentage = (count / tasks.length) * 100;

    proval.innerText = percentage + "%-------";
    progressbar.style.width = percentage + "%";
}

            localStorage.setItem("tasks", JSON.stringify(tasks));

        });

    }

});


////////////////////////////////////////////////////
// LOAD OLD TASKS FROM LOCAL STORAGE
////////////////////////////////////////////////////


tasks.forEach((item) => {

    const taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const task = document.createElement("span");


    task.innerText = item.text;


    if (item.completed) {

        checkbox.checked = true;
        task.style.textDecoration = "line-through";

    }


    // EDIT

    task.addEventListener("click", () => {

        const edit = prompt("Edit your task:", task.innerText);

        if (edit.trim() != "") {

            task.innerText = edit;

            // FIX: item is an object, so use item.text
            item.text = edit;

            localStorage.setItem("tasks", JSON.stringify(tasks));

        }

    });


    // DELETE BUTTON

    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';


    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(task);
    taskDiv.appendChild(deleteButton);

    scr.appendChild(taskDiv);


    // CHECKBOX

    checkbox.addEventListener("click", () => {

        if (checkbox.checked) {

            task.style.textDecoration = "line-through";
            item.completed = true;

        }

        else {

            task.style.textDecoration = "none";
            item.completed = false;

        }


        let count = 0;

        tasks.forEach((task) => {

            if (task.completed === true) {
                count++;
            }

        });


        completed.innerText = count;
        pending.innerText = tasks.length - count;
        if (tasks.length == 0) {
    proval.innerText = "0%";
    progressbar.style.width = "0%";
}
else {
    let percentage = (count / tasks.length) * 100;

    proval.innerText = percentage + "%-----";
    progressbar.style.width = percentage + "%";
}


        localStorage.setItem("tasks", JSON.stringify(tasks));

    });


    // DELETE

    deleteButton.addEventListener("click", () => {

        taskDiv.remove();

        tasks = tasks.filter((task) => task.id !== item.id);


        // recalculate counters after deleting

        let count = 0;

        tasks.forEach((task) => {

            if (task.completed === true) {
                count++;
            }

        });


        total.innerText = tasks.length;
        completed.innerText = count;
        pending.innerText = tasks.length - count;
       if (tasks.length == 0) {
    proval.innerText = "0%";
    progressbar.style.width = "0%";
}
else {
    let percentage = (count / tasks.length) * 100;

    proval.innerText = percentage + "%";
    progressbar.style.width = percentage + "%";
}

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });

});


////////////////////////////////////////////////////
// INITIAL COUNTERS
////////////////////////////////////////////////////


let count = 0;

tasks.forEach((task) => {

    if (task.completed === true) {
        count++;
    }

});


total.innerText = tasks.length;
completed.innerText = count;
pending.innerText = tasks.length - count;
if (tasks.length == 0) {
    proval.innerText = "0%";
    progressbar.style.width = "0%";
}
else {
    let percentage = (count / tasks.length) * 100;

    proval.innerText = percentage + "%";
    progressbar.style.width = percentage + "%";
}
//////////////////////////////////////////////////////^^^^ur code^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// filter() doesn't directly say "delete this." It says "keep everything except this." That's the key idea.
// item = the current task/object being checked by filter().
```js
const input = document.querySelector("#text");
const button = document.querySelector("#btn");
const scr = document.querySelector(".text");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

button.addEventListener("click", () => {

    let temp = input.value;

    const taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const task = document.createElement("span");

    task.innerText = temp;

    task.addEventListener("click", () => {
        const edit = prompt("Edit your task:", task.innerText);

        if(edit.trim() != ""){
            task.innerText = edit;
        }
    });

    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';


    if(temp.trim() != ""){

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(task);
        taskDiv.appendChild(deleteButton);

        scr.appendChild(taskDiv);


        const newTask = {
            id: Date.now(),
            text: temp,
            completed: false
        };

        tasks.push(newTask);


        // DELETE
        deleteButton.addEventListener("click", () => {

            taskDiv.remove();

            tasks = tasks.filter((task) => task.id !== newTask.id);

            localStorage.setItem("tasks", JSON.stringify(tasks));

        });
    }


    input.value = "";

    // SAVE ARRAY TO LOCAL STORAGE
    localStorage.setItem("tasks", JSON.stringify(tasks));


    // CHECKBOX
    checkbox.addEventListener("click", () => {

        if(checkbox.checked){
            task.style.textDecoration = "line-through";
        }
        else{
            task.style.textDecoration = "none";
        }

    });

});


////////////////////////////////////////////////////


tasks.forEach((item) => {

    const taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const task = document.createElement("span");

    task.innerText = item.text;

    const deleteButton = document.createElement("button");

    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';


    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(task);
    taskDiv.appendChild(deleteButton);

    scr.appendChild(taskDiv);


    // DELETE SAVED TASK
    deleteButton.addEventListener("click", () => {

        taskDiv.remove();

        tasks = tasks.filter((task) => task.id !== item.id);

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });

});
```
