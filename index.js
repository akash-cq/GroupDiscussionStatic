let btn=document.querySelector("button");
let btn2=document.querySelector(".sign");
btn.addEventListener("click",()=>{
    console.log("fghj")
    let req=new XMLHttpRequest();
    req.open("GET","/signUp");
    req.send();
    req.onreadystatechange= ( )=>{
        if(req.readyState==4 && req.status==200){
            window.location.href='/signUp';
        }
    }
})
btn2.addEventListener("click",()=>{
    console.log("herbcx")
    let req=new XMLHttpRequest();
    req.open("GET","/signIn");
    req.send();
    req.onreadystatechange= ( )=>{
        if(req.readyState==4 && req.status==200){
            window.location.href='/signIn';
        }
    }
})