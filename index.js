/* elements */
const taskInput = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-btn");
const countValue = document.querySelector("#count");
const errorContainer = document.querySelector("#error-container");
const container = document.querySelector("#container");
const tasksContainer = document.querySelector("#tasks-container");
const taskContainer = document.querySelectorAll(".task-container");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => addElement(task.inputValue, task.isChecked));
let count = tasks.filter(task => !task.isChecked).length;
tasks.forEach(item=>console.log(item.inputValue, item.isChecked));
countValue.innerText=count;

/*events*/
addBtn.addEventListener("click",()=>{
    const inputValue = taskInput.value;
    let isChecked=0;
    if(inputValue!=""){
        addElement(inputValue,isChecked);
        taskInput.value="";
        count++;
        countValue.innerText=count;
        tasks.push({"inputValue": inputValue,"isChecked":isChecked});
        updateLocalStorage(tasks);
    }
    else{
        errorContainer.style.display="block";
        container.style.filter="blur(3px)";
        setTimeout(()=>{
            errorContainer.style.display="none";
            container.style.filter="none";
        },1300)
    }
})

/*functions*/
function addElement(inputValue, isChecked){
    const element = document.createElement("div");
    element.setAttribute("class","task-container");
        element.innerHTML=`<label class="task-label ${isChecked ? "strikethrough" : ""}"> 
        <input type="checkbox" class="task" ${isChecked? "checked" : ""} />${inputValue}
        </label>
        <button class="dlt-btn"><i class="fa-solid fa-trash dlt-icon"></i></button>`

        const taskCheckbox = element.querySelector(".task");

        taskCheckbox.addEventListener("change", (e) => {
        const taskIndex = Array.from(tasksContainer.children).indexOf(element);
        if (e.target.checked) {
            tasks[taskIndex].isChecked = 1;
            e.target.parentElement.classList.add("strikethrough");
            count--;
            countValue.innerText=count;
        } else {
            tasks[taskIndex].isChecked = 0;
            e.target.parentElement.classList.remove("strikethrough");
            count++;
            countValue.innerText=count;
        }
        updateLocalStorage(tasks);
    });

    const dltElement=(taskElement)=>{
        if(!taskElement.querySelector(".task").checked){
            count--;
            countValue.innerText=count;
        }
        tasks = tasks.filter(item => item.inputValue!=taskElement.querySelector(".task-label").innerText);
        updateLocalStorage(tasks);
        taskElement.remove();
    }

    element.querySelector(".dlt-btn").addEventListener("click",(e)=>{
        dltElement(element);
    });

    tasksContainer.appendChild(element);
}

const updateLocalStorage=(tasks)=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
