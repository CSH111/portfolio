const typingBlock = document.querySelector("#home .container span");
const downArrow = document.querySelector(".down");

function blink() {
  setInterval(() => typingBlock.classList.toggle("blinkOn"), 300);
}
blink();

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

function navClickHandler(e) {
  e.preventDefault();
}
function pauseNavClickEvent() {
  navTags.forEach((tag) => {
    tag.addEventListener("click", navClickHandler);
  });
}
function resumeNavClickEvent() {
  navTags.forEach((tag) => {
    tag.removeEventListener("click", navClickHandler);
  });
}

function throttle(func, timeout = 300, timerRef) {
  if (timerRef.id) return;
  func();
  timerRef.id = setTimeout(() => {
    timerRef.id = null;
  }, timeout);
}

function scrollFullPage(event, sections, index) {
  if (event.wheelDelta < 0 && sections[index + 1]) {
    navTags[index + 1].click();
  } else if (event.wheelDelta > 0 && sections[index - 1]) {
    navTags[index - 1].click();
  }
  pauseNavClickEvent();
}

function listenScrolling() {
  const sections = document.querySelectorAll("section");
  const timerRef = { id: null };
  sections.forEach((item, index) => {
    item.addEventListener("wheel", (event) => {
      throttle(() => scrollFullPage(event, sections, index), 200, timerRef);
    });
  });
}

listenScrolling();

function indicate() {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll("nav ul li");
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < 100 && section.getBoundingClientRect().top > -100) {
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
        if (section.id === navItem.dataset.indicate) {
          navItem.classList.add("active");
          resumeNavClickEvent();
        }
      });
    }
  });
}

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
  let timer;
  const ul = document.querySelector("header ul");
  window.addEventListener("scroll", () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      ul.classList.add("show");
    }, 100);
  });
}
navShow();

function navHide() {
  const ul = document.querySelector("header ul");
  let timer;
  let mouseOn = false;
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

  if (matchMedia("screen and (min-width: 500px)").matches) {
    ul.addEventListener("mouseenter", () => {
      if (timer) {
        clearTimeout(timer);
      }
      mouseOn = true;
    });
    ul.addEventListener("mouseleave", () => {
      timer = setTimeout(() => {
        ul.classList.remove("show");
      }, 1000);
      mouseOn = false;
    });
  }
}
navHide();

const copyBtns = document.querySelectorAll("#contact button");

copyBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const text = document.querySelectorAll(".toCopy");
    navigator.clipboard.writeText(text[index].textContent);
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

function disableScrollSnap() {
  document.addEventListener("wheel", preventScroll, { passive: false });
}
function enable() {
  document.removeEventListener("wheel", preventScroll, { passive: false });
}
disableScrollSnap();

const leftBtns = document.querySelectorAll(".project-nav.left");
const rightBtns = document.querySelectorAll(".project-nav.right");
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
leftBtns.forEach((btn) => {
  btn.addEventListener("click", handleLeftNavBtnClick);
});
rightBtns.forEach((btn) => {
  btn.addEventListener("click", handleRightNavBtnClick);
});

const startShootingStarAnimation = () => {
  const amount = 15;
  const bg = document.querySelector(".bg");

  for (let i = 0; i <= amount; i++) {
    const shootingStar = document.createElement("i");
    const width = 1 + Math.random() * 4;
    const positionX = Math.random() * window.innerWidth * 1.2;
    const delay = Math.random() * 15;
    const duration = 20 + Math.random() * 5;

    shootingStar.style.width = `${0.2 + width}px`;
    shootingStar.style.left = `${positionX}px`;
    shootingStar.style.animationDelay = `${delay}s`;
    shootingStar.style.animationDuration = `${duration}s`;
    bg.appendChild(shootingStar);
  }
};
startShootingStarAnimation();
