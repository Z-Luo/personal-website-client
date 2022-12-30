"use strict";

const allSections = document.querySelectorAll(".section");
const data = document.querySelector(".section--data");

//typed
var typed = new Typed("#typed", {
  stringsElement: "#typed-strings",
  loop: true,
  typeSpeed: 30,
  backSpeed: 20,
  showCursor: false,
  backDelay: 2000,
  smartBackspace: true,
});

// reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// reveal counter
function counter() {
  let counterValues = document.querySelectorAll(".num");
  let interval = 800;
  counterValues.forEach((counterValue) => {
    let startValue = 0;
    let endValue = parseInt(counterValue.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
      startValue += 1;
      counterValue.textContent = startValue;
      if (startValue === endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
}
const handleCounter = (entries, observer) => {
  counter();
  if (entries[0].isIntersecting) {
    counterObserver.unobserve(data);
  }
};
const counterObserver = new IntersectionObserver(handleCounter, {
  root: null,
  threshold: 0.5,
});
counterObserver.observe(data);

// slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activatedDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const slider = document.querySelector(".slider");
slider.style.transform = "scale(1.2)";
// slider.style.overflow = "visible";

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activatedDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activatedDot(curSlide);
};

const init = function () {
  goToSlide(0);
  createDots();
  activatedDot(0);
};

init();

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activatedDot(slide);
  }
});
