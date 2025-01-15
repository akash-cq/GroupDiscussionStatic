// const { json } = require("stream/consumers");

let nameIn = document.querySelector("#name");
let pass = document.querySelector("#pass");
let email = document.querySelector("#email");
let btn = document.querySelector(".sbmt");
let signi = document.querySelector("a");
signi.addEventListener("click", () => {
  sign();
});

function check() {
  let mail = email.value;
  let passw = pass.value;
  let dt = 0,
    at = 0;
  for (let i = 0; i < mail.length; i++) {
    if (mail[i] === "@") at = i;
    else if (mail[i] === ".") dt = i;
  }
  if (at >dt || at == 0 || dt == 0) {
    alert("Invalid Email");
      return false;
  }
  if(passw.length<8){
    console.log("password")
    document.querySelector(".passmsg").innerHTML="password length must be 8 Size";
    return false;
  }
  return true;
}

btn.addEventListener("click", () => {
  if (nameIn.value !== "" && pass.value != "" && email.value != "") {
    if (check()) {
      let obj = {
        name: nameIn.value,
        email: email.value,
        password: pass.value,
        task: [],
      };
      console.log(obj);
      console.log("herbcx");
      let req = new XMLHttpRequest();
      req.open("POST", "/post");
      req.send(JSON.stringify(obj));
      req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
          console.log("mmmmmml");
          let msg = JSON.parse(req.responseText);
          if (msg === -1) {
            localStorage.setItem("email", JSON.stringify(email.value));
            sign();
          } else {
            alert("user already exist");
          }
          // sign()
        }
      };
    }
  }
});
let sign = () => {
  let req = new XMLHttpRequest();
  req.open("GET", "/signIn");
  req.send();
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      window.location.href = "/signIn";
    }
  };
};
