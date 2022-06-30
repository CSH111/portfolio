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
function indicate() {
  const sections = document.querySelectorAll("section");
  const lists = document.querySelectorAll("nav ul li");
  sections.forEach((section) => {
    if (
      section.getBoundingClientRect().top < 100 &&
      section.getBoundingClientRect().top > -300
    ) {
      lists.forEach((list) => {
        list.classList.remove("active");
        if (section.id === list.dataset.indicate) {
          list.classList.add("active");
        }
      });
    }
  });
}
//인디케이터 디바운싱
function debounceIndicate() {
  let timer;
  window.addEventListener("scroll", () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      indicate();
    }, 50);
  });
}
debounceIndicate();

//네이게이션 show by 디바운싱
function navShow2() {
  let timer;
  const ul = document.querySelector("header ul");
  window.addEventListener("scroll", (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      ul.classList.add("show");
    }, 100);
  });
}
navShow2();

// 네이게이션 hide by 디바운싱
// function indicaterhide() {
//   const ul = document.querySelector("header ul");
//   let timer;
//   //scorll -> hide 카운팅
//   window.addEventListener("scroll", () => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       ul.classList.remove("show");
//     }, 1800);
//   });
//   // hover -> hide 카운팅 중지
//   ul.addEventListener("mouseenter", () => {
//     if (timer) {
//       clearTimeout(timer);
//     }
//   });
//   // mouse leave -> hide counting
//   ul.addEventListener("mouseleave", () => {
//     timer = setTimeout(() => {
//       ul.classList.remove("show");
//     }, 1000);
//   });
// }
// indicaterhide();

function indicaterhide() {
  const ul = document.querySelector("header ul");
  let timer;
  let mouseOn = false;
  //scorll -> hide 카운팅
  window.addEventListener("scroll", () => {
    if (timer) {
      clearTimeout(timer);
    }
    if (!mouseOn) {
      timer = setTimeout(() => {
        ul.classList.remove("show");
      }, 1800);
    }
  });
  // hover -> hide 카운팅 중지
  ul.addEventListener("mouseenter", () => {
    if (timer) {
      clearTimeout(timer);
    }
    mouseOn = true;
  });
  // mouse leave -> hide counting
  ul.addEventListener("mouseleave", () => {
    timer = setTimeout(() => {
      ul.classList.remove("show");
    }, 1000);
    mouseOn = false;
  });
}
indicaterhide();

// 트랙패드 문제 해결하기
// 디바운싱 하나로 합치기 -> 오히려 가독성 떨어질듯
//nav 위에서 스크롤 비정상
// 호버로 중지시킨 카운트 클릭시 카운팅 재개되버림.. true flase 상태값줘서 시도해보기 ㄱㄱ

let AA = 10;
let BB = 20;

console.log(AA, BB);

if ((AA = 10)) {
  console.log("조건1 통과");
} else if ((BB = 20)) {
  console.log("조건2 통과");
}
