const typingBlock = document.querySelector("#home .container span");
const downArrow = document.querySelector(".down");

// 커서 깜빡임
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
    downArrow.classList.add("show"); // 버튼생성
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

//페이지 이동 - 1페이지 버튼
downArrow.addEventListener("click", scroll);
function scroll(event) {
  window.scrollBy({
    top: event.target.parentNode.offsetHeight,
    left: 0,
    behavior: "smooth",
  });
}

//페이지 이동 - 스크롤
const sections = document.querySelectorAll("section");
sections.forEach((item, index) => {
  item.addEventListener("wheel", function (event) {
    event.preventDefault();

    if (event.wheelDelta < 0 && index !== sections.length - 1) {
      window.scrollTo({
        top:
          window.scrollY +
          sections[index].nextElementSibling.getBoundingClientRect().top,
      });
    } else if (event.wheelDelta > 0 && index !== 0) {
      window.scrollTo({
        top:
          window.scrollY +
          sections[index].previousElementSibling.getBoundingClientRect().top,
      });
    }
  });
});

//인디케이터
let timer;
window.addEventListener("scroll", () => {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      test();
    }, 100);
  }
});

function test() {
  const lists = document.querySelectorAll("nav ul li");
  sections.forEach((section) => {
    if (
      section.getBoundingClientRect().top < 100 &&
      section.getBoundingClientRect().top > -100
    ) {
      console.log(window.scrollY);
      lists.forEach((list) => {
        list.classList.remove("active");
        if (section.id === list.dataset.indicate) {
          list.classList.add("active");
        }
      });
    }
    // if (section.offsetTop - window.scrollY < 50) {
    //   console.log(section.id);
    // }
  });
}
