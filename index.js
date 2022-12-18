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
const navTags = document.querySelectorAll("nav a");

downArrow.addEventListener("click", () => {
  navTags[1].click();
});
//페이지 이동 - 스크롤
// disable();
let timer;
const sections = document.querySelectorAll("section");

sections.forEach((item, index) => {
  item.addEventListener("wheel", (event) => {
    event.preventDefault();
    if (!timer) {
      if (event.wheelDelta < 0 && sections[index + 1]) {
        navTags[index + 1].click();
      } else if (event.wheelDelta > 0 && sections[index - 1]) {
        navTags[index - 1].click();
      }
      timer = setTimeout(() => {
        timer = null;
      }, 1000);
      // timer = 1;
    }
  });
});

//인디케이터
function indicate() {
  const sections = document.querySelectorAll("section");
  const lists = document.querySelectorAll("nav ul li");
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < 100 && section.getBoundingClientRect().top > -300) {
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
function navShow() {
  const sections = document.querySelectorAll("section");
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
navShow();

//네이게이션 hide
function navHide() {
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
      }, 2000);
    }
  });
  //PC일 때만
  if (matchMedia("screen and (min-width: 500px)").matches) {
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
}
navHide();

//복사 버튼
const copyBtns = document.querySelectorAll("#contact button");

copyBtns.forEach((btn, index) => {
  //복사
  btn.addEventListener("click", () => {
    const text = document.querySelectorAll(".toCopy");
    navigator.clipboard.writeText(text[index].textContent);
    //알림창
    const alert = document.querySelector(".alert");
    alert.classList.add("show");
    setTimeout(() => {
      alert.classList.remove("show");
    }, 1000);
  });
});

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
function disable() {
  document.addEventListener("wheel", preventScroll, { passive: false });
}
function enable() {
  document.removeEventListener("wheel", preventScroll, { passive: false });
}
disable();
// 트랙패드 문제 해결하기
//nav 위에서 스크롤 비정상
//스크롤 시 디바운싱으로 몇초간 안되게 될거같은데 왜안댐..?

// 프로젝트 x scroll이동

const leftBtn = document.querySelector(".project-nav.left");
const rightBtn = document.querySelector(".project-nav.right");
const findUlToScroll = (target) => {
  return target.parentElement.previousElementSibling.firstElementChild;
};
const handleLeftNavBtnClick = (e) => {
  const ul = findUlToScroll(e.target);
  ul.scrollBy({
    top: 0,
    left: -350,
    behavior: "smooth",
  });
};
const handleRightNavBtnClick = (e) => {
  const ul = findUlToScroll(e.target);
  ul.scrollBy({
    top: 0,
    left: 350,
    behavior: "smooth",
  });
};
leftBtn.addEventListener("click", handleLeftNavBtnClick);
rightBtn.addEventListener("click", handleRightNavBtnClick);
