const typingBlock = document.querySelector("#welcome .container h2");
const welcomeMsg = [
  "안녕하세요.",
  "프론트엔드\u00a0개발자\n조성호입니다.",
  "찾아주셔서\n감사합니다.",
];

let msgIndex = 0;
let splitedMsg = welcomeMsg[msgIndex].split("");
typingBlock.addEventListener("click", reTyping);

function typing() {
  if (splitedMsg.length > 0) {
    typingBlock.innerText += splitedMsg.shift();
    setTimeout(typing, 50);
  } else {
    setTimeout(DeleteTyping, 1000);
  }
}
function DeleteTyping() {
  const splitToDel = typingBlock.innerText.split("");
  if (splitToDel.length > 0 && msgIndex < welcomeMsg.length - 1) {
    splitToDel.pop();
    typingBlock.innerText = splitToDel.join("");
    setTimeout(DeleteTyping, 30);
  } else {
    nextType();
  }
}
function nextType() {
  if (msgIndex < welcomeMsg.length - 1) {
    msgIndex += 1;
    splitedMsg = welcomeMsg[msgIndex].split("");
    typing();
  } else {
    typingBlock.classList.add("active");
  }
}
function reTyping() {
  typingBlock.innerText = "";
  msgIndex = 0;
  splitedMsg = welcomeMsg[msgIndex].split("");
  typingBlock.classList.remove("active");
  typing();
}
function blink() {
  setInterval(() => typingBlock.classList.toggle("blinkOn"), 300);
}

blink();
typing();
