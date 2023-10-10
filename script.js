let tb = document.querySelector("#tbody");

let idUser= document.querySelector("#userId").value;
let todo= document.querySelector("#todo").value;


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
     container.innerHTML=txt;
  }); 
}

req.onreadystatechange=()=>{
    console.log(req.readyState);
    if(req.readyState==4 && req.status == 200){
       let resp=JSON.parse(req.responseText); 
       let l = resp.sort((a,b)=>b.id-a.id)
        showlist(l,tb);

        let addbtn = document.querySelector("#add");
        addbtn.addEventListener("click",() =>{
            let nbrows =tb.rows.length;
            console.log(nbrows);
        /* let txt = tb.innerHTML ;
            txt = txt + `<tr>
                        <td>201</td>
                        <td>${idUser}</td>
                        <td>${todo}</td>
                        <td><input type="checkbox"}/></td>
                        </tr>`;
            tb.innerHTML = txt ;*/
        });
    }
}
req.send();
