let input=document.querySelector(".input");
let submit=document.querySelector(".add");
let tasksdiv=document.querySelector(".tasks");

// array to add tasks

let arrayoftasks;
// check if element in localstorage
if(localStorage.getItem("tasks")){
    arrayoftasks=JSON.parse(localStorage.getItem("tasks"));
    addelementofarraytopage(arrayoftasks);
}
else{
    arrayoftasks=[];
}



submit.onclick=function(){
    if(input.value!== "")
    {
        addtasktoarray(input.value);
        input.value="";
    }
}
// delete element
tasksdiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
         // Remove the task element from the page
        e.target.parentElement.remove()

// delete from local
      deleteItemWith(e.target.parentElement.getAttribute("data-id"));
    }

      if(e.target.classList.contains("task"))
      {
        // toogle class done
        e.target.classList.toggle("done");
  //   add this is completed for done
  if(e.target.classList.contains("done")){
       let small= document.createElement("small");
       small.appendChild(document.createTextNode("this task is completed"));
       e.target.appendChild(small);
      

      }

      toggleCompletedWith(e.target.getAttribute("data-id"));
      }
  
    

       

         } );  
 

function addtasktoarray(taskstext){
    // task data
    const task={
        id:Date.now(),
        title:taskstext,
        completed:false,

    };
    // puch task to array
    arrayoftasks.push(task);
// add element of array to page
addelementofarraytopage(arrayoftasks);
// add task to local storage
addarraytolocalstorage(arrayoftasks);
};



function addelementofarraytopage(arrayoftasks){
    // empty tasks div
    tasksdiv.innerHTML = "";
    // loop on array of tasks
    arrayoftasks.forEach((task) => {
       let div=document.createElement("div");
       div.className="task";

    //    check if task is done
    if(task.completed)
    {
        div.className="task done";
    }
       div.setAttribute("data-id", task.id);
       div.appendChild(document.createTextNode(task.title));
    //    create "Delete" element
    let span=document.createElement("span");
    span.className="del";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);
//   add div to tasksdiv
tasksdiv.appendChild(div);


    

    });

}

// add tolocal storage
function addarraytolocalstorage(arrayoftasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayoftasks));
}
// delete task from local
function deleteItemWith(taskid){
arrayoftasks=arrayoftasks.filter((task)=>task.id!=taskid);
addarraytolocalstorage(arrayoftasks);
}

function toggleCompletedWith(taskid){
    for(let i=0; i<arrayoftasks.length;i++){
        if(arrayoftasks[i].id==taskid)
        {arrayoftasks[i].completed==false?(arrayoftasks[i].completed=true):(arrayoftasks[i].completed=false);
           

        }}
        addarraytolocalstorage(arrayoftasks);
     
}
