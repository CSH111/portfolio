const typingBlock = document.querySelector("#welcome .container span");
const downArrow = document.querySelectorAll(".down");

// 커서
function blink() {
  setInterval(() => typingBlock.classList.toggle("blinkOn"), 300);
}
blink();

// 타이핑 효과
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
  } else if (msgIndex < welcomeMsg.length - 1) {
    setTimeout(DeleteTyping, 700);
  } else {
    typingBlock.classList.add("active"); //클릭시 리타이핑 활성화
    downArrow[0].classList.add("show"); // 버튼생성
  }
}
function DeleteTyping() {
  const splitToDel = typingBlock.innerText.split("");
  if (splitToDel.length > 0) {
    splitToDel.pop();
    typingBlock.innerText = splitToDel.join("");
    setTimeout(DeleteTyping, 30);
  } else {
    nextType();
  }
}
function nextType() {
  msgIndex += 1;
  splitedMsg = welcomeMsg[msgIndex].split("");
  typing();
}
function reTyping() {
  typingBlock.innerText = "";
  msgIndex = 0;
  splitedMsg = welcomeMsg[msgIndex].split("");
  typingBlock.classList.remove("active");
  typing();
}
setTimeout(typing, 1000);

//페이지 이동

const welcome = document.querySelector("#welcome");
const about = document.querySelector("#about");
downArrow.forEach((btn) => btn.addEventListener("click", scroll));
function scroll(event) {
  window.scrollBy({
    top: event.target.parentNode.offsetHeight,
    left: 0,
    behavior: "smooth",
  });
}
// 텍스트 입력시 섹션사이즈 왜바뀜?
// 자동스크롤 + 버튼
// 스크롤시 마다 사이드네비게이션 쇼
