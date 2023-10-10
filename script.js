let tb = document.querySelector("#tbody");

let idUser= document.querySelector("#userId");
let todo= document.querySelector("#todo");
let addbtn = document.querySelector("#add");

let userSearch = document.querySelector("#userFilter");
let todoSearch = document.querySelector("#todoFilter");


let data = [];
userSearch.addEventListener("input",()=>{
    console.log("User :",userSearch.value);
    //let fdata = data.filter(e=>e.userId.toString().includes(userSearch.value));
    let fdata = data.filter(e=>e.userId==parseInt(userSearch.value));
    
    showlist(fdata,tb);
});

todoSearch.addEventListener("input",()=>{
    console.log("Todo :",todoSearch.value);
    let fdata = data.filter(e=>e.title.includes(todoSearch.value));
    showlist(fdata,tb);

});


addbtn.addEventListener("click",() =>{
    let newTodo = {};
    newTodo.id=data[0].id+1;
    newTodo.userId=idUser.value;;
    newTodo.title=todo.value;
    newTodo.completed=false;

   /* let nbrows =tb.rows.length;
    let row = table.insertRow(nbrows+1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3=  row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = `${nbrows+1}`;
    cell2.innerHTML = `${idUser}`;
    cell3.innerHTML = `${todo}`;
    cell4.innerHTML = `<input type="checkbox"}/>`;*/
    data.unshift(newTodo);
    showlist(data,tb);


});

let req = new XMLHttpRequest();
req.open("GET","https://jsonplaceholder.typicode.com/todos");

function showlist(data,container){
    let txt="";
     
    data.forEach(tr => {
    txt =txt +`<tr>
                 <td>${tr.id}</td>
                 <td>${tr.userId}</td>
                 <td>${tr.title}</td>
                 <td><input type="checkbox" ${tr.completed ? 'checked' : ""}/></td>
                 </tr>`;
    
  }); 
  container.innerHTML=txt;
}

req.onreadystatechange=()=>{
    console.log(req.readyState);
    if(req.readyState==4 && req.status == 200){
       let resp=JSON.parse(req.responseText); 
        data = resp.sort((a,b)=>b.id-a.id)
        showlist(data,tb);

    }
}
req.send();
