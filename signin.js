let btn=document.querySelector(".sbmt")
let mail=document.querySelector("#email")
let pass=document.querySelector("#pass")
let signup=document.querySelector("a");
signup.addEventListener("click",()=>{
        console.log("fghj");
        let req = new XMLHttpRequest();
        req.open("GET", "/signUp");
        req.send();
        req.onreadystatechange = () => {
          if (req.readyState == 4 && req.status == 200) {
            window.location.href = "/signUp";
          }
        };
})
btn.addEventListener("click",()=>{
    if(pass.value!="" && mail.value!=""){
        let obj={
            email:mail.value,
            password:pass.value,

        };
        
        console.log(obj)
        let xhr=new XMLHttpRequest();
    xhr.open("POST","/data");
    xhr.send(JSON.stringify(obj));
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4){
            console.log(xhr.responseText);
            let msg=JSON.parse(xhr.responseText)
            if(msg!=-1){
            localStorage.setItem("email",JSON.stringify(mail.value));
            toDoShow()
        }
        else{
            alert("Invalid Email or Password")
        }

        }
    }

        
}
})
function toDoShow(){
    let xhr=new XMLHttpRequest();
    xhr.open("GET","/discussion");
    xhr.send();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200){
            window.location.href="/discussion"
        }
    }
}