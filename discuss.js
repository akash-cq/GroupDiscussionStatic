let list = document.querySelector(".list");
let questionBox = document.querySelector(".question");
let ResponsArea = document.querySelector(".hide1");
let rgtSide = document.querySelector(".hide");
let formBtn = document.querySelector("#formBtn");
let subject = document.querySelector(".sub");
let discription = document.querySelector("textarea");
let sbmtBtn = document.querySelector(".sbmt");
let alrt = document.querySelector(".alert");
let Replyer = document.querySelector(".name");
let ans = document.querySelector("#answer");
let responsADD = document.querySelector(".addResponse");
let showing = document.querySelector(".response-list");
let srch = document.querySelector("#search");
let resolve = document.querySelector(".resolve");
let array = [];
let id = 0,
  a = 0,
  b = 0;

let loading = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  if (data !== null)
    data.forEach((item) => {
      array.push(item);
      createList(item);

      showing.classList.remove("hide2");
    });
};

window.onload = loading;
if (localStorage.getItem("currentId")) {
  id = parseInt(localStorage.getItem("currentId"));
} else {
  localStorage.setItem("currentId", id);
}
// event for question adding
sbmtBtn.addEventListener("click", QuestionSbmt);
// show the question form and hide response area
formBtn.addEventListener("click", () => {
  console.log("hello");
  rgtSide.classList.remove("hide");
  ResponsArea.classList.add("hide1");
});
function QuestionSbmt() {
  if (check(subject, discription)) create();
  else {
    alrtShow("Ask a question first");
  }
}

// check user dont click on button without any input
let check = (input1, input2) => {
  if (input1.value !== "" && input2.value !== "") return 1;
  else {
    input1.focus();
    input1.style.border = "2px solid red";
    setTimeout(() => {
      input1.style.border = "none";
      input1.style.borderBottom = "1px solid black";
    }, 2000);
    return 0;
  }
};

let alrtShow = (msg) => {
  alrt.style.display = "block";
  alrt.innerHTML = `<strong> Warning!</strong> ${msg}`;
  setTimeout(() => {
    alrt.style.display = "none";
  }, 2000);
};

// elements create for adding the question
let create = () => {
  const Question = {
    id: id,
    subject: `${subject.value}`,
    question: `${discription.value}`,
    fvrt: false,
    fvrtC: "black",
    reply: [],
    timestamp: Date.now(),
  };
  id++;
  localStorage.setItem("currentId", id);

  array.push(Question);
  discription.value = "";
  subject.value = "";
  createList(Question);
};

let createList = (QuestionObj) => {
  localStorage.setItem("data", JSON.stringify(array));

  let newCard = document.createElement("div");
  newCard.classList.add("question-list");
  newCard.id = QuestionObj.timestamp;
  let cradTxt = `<div class="upper-info">
   <h1 class="sub-list">${QuestionObj.subject}</h1>
   <i class="fa-solid fa-heart" style="color:${QuestionObj.fvrtC};" ></i>
   </div>
                <div class="bottom-info">
                    <p class="dis">${QuestionObj.question}</p>
                    <p class = "date">${formatTime(QuestionObj.timestamp)}</p>
                </div>`;
  newCard.innerHTML = cradTxt;
  list.append(newCard);
  newCard.onclick = null;
  newCard.onclick = (e) => Respons(QuestionObj, e.target);
  let favrt = newCard.querySelector("i");

  favrt.addEventListener("click", (e) => {
    console.log(e.target);
    fvrt(QuestionObj, newCard, e);
  });
};

// create elements for adding the question in which user click
let Respons = (QuestionObj, e) => {
  console.log(e);
  console.log(e.classList.contains("fa-heart"));
  rgtSide.classList.add("hide");
  ResponsArea.classList.remove("hide1");

  console.log("hello", QuestionObj);
  let questionN = `<div class="flexible">
              <h1>${QuestionObj.subject}</h1>
            </div>
            <p>${QuestionObj.question}</p>`;
  questionBox.innerHTML = questionN;
  showing.innerHTML = "";
  if (QuestionObj.reply[0]) {
    console.log("tata");
    showing.classList.remove("hide2");
    QuestionObj.reply.forEach((reply) => {
      if (reply.name !== "" && reply.answer !== "") {
        createReply(reply, QuestionObj);
      } else {
        console.log("tim,");
        showing.classList.add("hide2");
      }
      console.log("tata2");
    });
  } else {
    console.log("by");
    showing.classList.add("hide2");
  }
  responsADD.onclick = null;
  responsADD.onclick = () => replyFun(QuestionObj);
  resolve.onclick = () => dlt(QuestionObj);
  // }
};

let createReply = (reply, QuestionObj) => {
  console.log(reply.like.a);
  let div = document.createElement("div");
  div.classList.add("response-show");
  let card = `<h1>Name : ${reply.name}</h1>
              <p>Ans : ${reply.answer}</p>
              <div class="react">
              <i  class="fa-solid like fa-xl fa-thumbs-up" style="color : ${reply.like.likeC}"><p>${reply.like.a}</p></i>
              <i class="fa-solid dislike fa-xl fa-thumbs-down" style="color :${reply.like.dislikeC}"><p>${reply.like.b}</p></i>
              </div>
           `;
  div.innerHTML = card;
  console.log(QuestionObj);
  div.querySelector(".like").addEventListener("click", (event) => {
    like(event, reply, QuestionObj);
  });
  div.querySelector(".dislike").addEventListener("click", (event) => {
    dislike(event, reply, QuestionObj);
  });
  showing.append(div);
};
// creating the elements for adding response
let replyFun = (QuestionObj) => {
  if (check(Replyer, ans)) {
    const Reply = {
      name: Replyer.value,
      answer: ans.value,
      like: {
        like: null,
        a: 0,
        b: 0,
        likeC: `black`,
        disLikeC: `black`,
        diff: 0,
      },
      questionId: QuestionObj.id,
    };
    console.log(array);
    let index = array.findIndex((question) => question.id === QuestionObj.id);
    console.log(index);
    array[index].reply.push(Reply);
    console.log(array);
    localStorage.setItem("data", JSON.stringify(array));
    console.log(QuestionObj);
    createReply(Reply, QuestionObj);
    showing.classList.remove("hide2");
    Replyer.value = "";
    ans.value = "";
  } else {
    alrtShow("give a response!");
  }
};

function like(event, reply, QuestionObj) {
  console.log("like in event", reply);
  let c = reply.like.a;
  c++;
  let d = reply.like.b;
  d--;
  reply.like.diff = c - d;
  console.log(reply.like.a);
  // if(reply.like==false || reply.like===null){
  if (c != 0) {
    reply.like.likeC = "#0008ff";

    reply.like.a = c;
  }
  console.log(QuestionObj);

  reply.like.like = true;
  insertionSort(QuestionObj.reply, QuestionObj.reply.length);
  // const data = JSON.parse(localStorage.getItem("data"));
  const questionIndex = array.findIndex(
    (question) => question.id === QuestionObj.id
  );
  array[questionIndex].reply = QuestionObj.reply;
  localStorage.setItem("data", JSON.stringify(array));
  showing.innerHTML = "";
  update(reply);
  QuestionObj.reply.forEach((item) => {
    createReply(item, QuestionObj);
  });
}
function dislike(event, reply, QuestionObj) {
  console.log("like in event");

  let d = reply.like.b;
  d++;
  reply.like.b = d;
  let c = reply.like.a;
  (reply.like.diff = c - d), (event.target.style.color = "#0008ff");

  reply.like.like = false;
  reply.like.dislikeC = "#0008ff";

  console.log(event.target);

  //  q.reply.sort((a, b) => b.like.a - a.like.a);

  insertionSort(QuestionObj.reply, QuestionObj.reply.length);
  const data = JSON.parse(localStorage.getItem("data"));
  const questionIndex = array.findIndex(
    (question) => QuestionObj.id === QuestionObj.id
  );
  data[questionIndex].reply = QuestionObj.reply;
  localStorage.setItem("data", JSON.stringify(array));

  update(reply);
  console.log(QuestionObj.reply, QuestionObj, reply);
  showing.innerHTML = "";
  QuestionObj.reply.forEach((item) => {
    createReply(item, QuestionObj);
  });
}

let update = (reply) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const questionIndex = data.findIndex(
    (question) => question.id === reply.questionId
  );
  const replyIndex = data[questionIndex].reply.findIndex(
    (r) => r.name === reply.name
  );
  data[questionIndex].reply[replyIndex] = reply;
  localStorage.setItem("data", JSON.stringify(data));
};

function insertionSort(likes, n) {
  let i, key, j;
  for (i = 1; i < n; i++) {
    key = likes[i];
    j = i - 1;
    while (j >= 0 && likes[j].like.diff < key.like.diff) {
      likes[j + 1] = likes[j];
      j = j - 1;
    }
    likes[j + 1] = key;
  }
}
let fvrt = (QuestionObj, card, e) => {
  if (QuestionObj.fvrt == false) {
    QuestionObj.fvrt = true;
    QuestionObj.fvrtC = "#ff0000";
    card.querySelector("i").style.color = "#ff0000";
  } else {
    QuestionObj.fvrt = false;
    QuestionObj.fvrtC = "black";
    card.querySelector("i").style.color = "black";
  }
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    if (array[i].fvrt === true)
      for (let j = 0; j < array.length; j++) {
        if (array[j].fvrt === false) {
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          break;
        }
      }
  }
  // localStorage.setItem("data",JSON.stringify(array));
  list.innerHTML = "";
  array.forEach((Qobj) => {
    createList(Qobj);
  });
  e.stopPropagation();
};
srch.addEventListener("input", () => {
  console.log(array);
  let arr = [];
  let srching = srch.value.toLowerCase();
  if (srching !== "")
    for (let i = 0; i < array.length; i++) {
      if (array[i].subject.includes(srching)) {
        console.log(array[i], srching);
        arr.push(array[i]);
      } else if (array[i].question.includes(srching)) {
        arr.push(array[i]);
      }
    }
  else {
    arr = array;
  }
  list.innerHTML = "";
  arr.forEach((item) => {
    createList(item);
  });
});
function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} Hour ago`;
  } else if (minutes > 0) {
    return `${minutes} Minutes ago`;
  } else {
    return `${seconds} Seconds ago`;
  }
}
function dlt(QuestionObj) {
  let data = JSON.parse(localStorage.getItem("data"));
  let lists = document.querySelectorAll(".question-list");
  let i;
  for (i = 0; i < lists.length; i++) {
    if (lists[i].id == QuestionObj.timestamp) {
      console.log(lists[i]);
      lists[i].remove();
      break;
    }
  }
  rgtSide.classList.remove("hide");
  ResponsArea.classList.add("hide1");
  console.log(data);
  let indx = array.findIndex((e) => e.id === QuestionObj.id);
  array.splice(indx, 1);
  localStorage.setItem("data", JSON.stringify(data));
  while (i < array.length) {
    array[i].questionId = array[i].questionId - 1;
    i++;
  }
  console.log(data);
  console.log(array);
  let id = JSON.parse(localStorage.getItem("currentId"));

  localStorage.setItem("data", JSON.stringify(array));

  localStorage.setItem("currentId", JSON.stringify(id));
}
