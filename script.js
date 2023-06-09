'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // Old Method - notes.js

  // New Method
  section1.scrollIntoView({ behavior: 'smooth' });
  console.log(section1);
});

// PAGE NAVIGATION
// Method one - notes.js line 33

// Method Two
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' })
  }
})

// TABBED CONTENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));

  // Activate Tab 
  clicked.classList.add('operations__tab--active');

  // Activate Content Area 
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// FADING NAV BUTTONS
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');

    // Decrease the Opacity of all the siblings 
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

// Passing arguments in eventListner's callback
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1));


// STICKY NAVIGATION 
// const initialCoordsOne = nav.getBoundingClientRect();
// console.log(initialCoordsOne.top);

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoordsOne.top) {
//     nav.classList.add('sticky');
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

// Sticky Navigation - Method Two (Observer Intersection API)
/* const obsCallBack = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
}

const obsOptions = {
  root: null,
  threshold: 0.1,
}

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1);
*/

// Show the Navigation - Method Two
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});

headerObserver.observe(header);

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// LAZY LOAD IMAGES
const targetImages = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
  const [entry] = entries;

  // GUARD CLAUSE
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const lazyObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

targetImages.forEach(img => lazyObserver.observe(img));


const slider = function () {
  // SLIDER 
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;


  const createDots = function () {
    slides.forEach((_, index) => {
      dotsContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document.querySelector(`.dots__dot[data-slide="${slide}"] `).classList.add('dots__dot--active');
  }

  const goToSlide = function (s) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - s)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    }
    else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    }
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // INITIATE ALL FUNCTIONS 
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // EVENT HANDLERS 
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

/*
// Creating and Inserting Elements - Cookies Message
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');

cookieMessage.innerHTML = 'We use cookies for better functionality and analytics <button class="btn btn--close-cookies">Got it!</button>';

// SHOW AND REMOVE MESSAGE
header.append(cookieMessage);
document.querySelector('.btn--close-cookies').addEventListener('click', function () {
  cookieMessage.remove();
});

cookieMessage.style.backgroundColor = '#37383d';
console.log(getComputedStyle(cookieMessage).height);

cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 40 + 'px';

// Set Smooth Scrolling

// setProperty method
// document.documentElement.style.setProperty('--color-primary', 'orangered')

const logo = document.querySelector('.nav__logo');
console.log(logo.src);
// logo.src = 'http://127.0.0.1:8080/img/logobhai.png'; // Removes the logo
console.log(logo.getAttribute('src'));
console.log(logo.getAttribute('designer'));
console.log(logo.dataset.versionNumber);
*/

/*
const h1 = document.querySelector('h1');
const eventH1 = function (e) {
  alert('Mouse Hovered: Great! You are reading the h1 text.');

  // h1.removeEventListener('mouseover', eventH1);
}

h1.addEventListener('mouseover', eventH1);

setTimeout(() => h1.removeEventListener('mouseover', eventH1), 3000);

// RANDOM COLOR GENERATOR
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomColor = function () {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
};
console.log(randomColor());
// document.body.style.backgroundColor = randomColor;

document.querySelector('.nav__link').addEventListener('click', function () {
  this.style.backgroundColor = randomColor();
})

document.querySelector('.nav__links').addEventListener('click', function () {
  this.style.backgroundColor = randomColor();
})

document.querySelector('.nav').addEventListener('click', function () {
  this.style.backgroundColor = randomColor();
});
*/

/*
const h1 = document.querySelector('h1');
// console.log(h1.parentElement);
// console.log(h1.childNodes);
// console.log(h1.children[0]);
// h1.firstElementChild.style.background = 'red';

// Scale down all the siblings
console.log(h1.parentElement.childNodes);
const h1Sibs = [...h1.parentElement.children];
h1Sibs.forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

// LIFE CYCLE DOM EVENTS
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM is Loaded Completely!');
});

// LOAD - When all the CSS files are loaded 
document.addEventListener('load', function () {
  console.log('All the files are loaded successfully!');
});

// BEFOREUNLOAD
document.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  return e.returnValue = '';
})