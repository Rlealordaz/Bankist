
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Smooth scroll button - navigates to the first section when clicked
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // Log button coordinates relative to the viewport
  console.log(e.target.getBoundingClientRect());

  // Log current scroll position when button is clicked
  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

  // Smooth Scrolling - Modern approach using scrollIntoView()
  /* Old way of implementing smooth scrolling:
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation - Implementing smooth scrolling using Event Delegation
// Instead of attaching event listeners to each link individually,
// we use event delegation for better performance

// Event Delegation Pattern:
// 1. Add event listener to common parent element
// 2. Determine which element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy - check if clicked element is a nav link
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component - Operations section
// Using Event Delegation for better performance
// (Attaching listeners to each tab would be inefficient with many elements)

tabsContainer.addEventListener('click', function (e) {
  // Use closest() to handle clicks on child elements (span) and get the button
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  
  // Guard clause - ignore clicks outside of tabs
  if (!clicked) return;

  // Remove active classes from all tabs and content areas
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate clicked tab (visual indicator)
  clicked.classList.add('operations__tab--active');

  // Activate corresponding content area based on data-tab attribute
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation
// Implements hover effect that fades sibling links and logo
// Uses mouseover (bubbles) instead of mouseenter (doesn't bubble)

// Handler function uses 'this' keyword to receive opacity value via bind()
// This allows passing arguments to event handlers elegantly
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // Select all sibling links using closest() to traverse up then query down
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // Fade out all siblings except the hovered link
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Bind different opacity values for hover in/out
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation: Intersection Observer API
// More performant than listening to scroll events

const header = document.querySelector('.header');
// Dynamically calculate nav height for responsive design
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  // Add sticky class when header is not intersecting viewport
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// Observer configuration:
// - root: null (viewport)
// - threshold: 0 (trigger when 0% of header is visible)
// - rootMargin: negative nav height (apply sticky exactly when header is out)
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal Sections on Scroll
// Sections fade in and slide up when scrolling (animation defined in CSS)

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    // Guard clause - only reveal when section is intersecting
    if (!entry.isIntersecting) return;
    
    // Remove hidden class to trigger CSS animation
    entry.target.classList.remove('section--hidden');
    // Stop observing once revealed (performance optimization)
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // Trigger when 15% of section is visible
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // Uncomment to add hidden class initially:
  // section.classList.add('section--hidden');
});

// Lazy Loading Images
// Images load only when approaching viewport for performance optimization
// Uses low-quality placeholders initially with blur effect

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace placeholder src with high-quality image from data-src
  entry.target.src = entry.target.dataset.src;

  // Remove blur filter only after image has fully loaded
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // Load images 200px before they enter viewport
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider Component - Testimonials Carousel
// Encapsulated in a function to avoid polluting global scope
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Helper Functions
  
  // Creates navigation dots dynamically based on number of slides
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Updates active state of navigation dots
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Moves slides using CSS transform
  // Example: slide 1 -> 0: -100%, 1: 0%, 2: 100%, 3: 200%
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Navigation Functions
  
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0; // Loop back to first slide
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1; // Loop to last slide
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Initialization
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  
  // Button navigation
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard navigation (arrow keys)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // Dot navigation - click on any dot to jump to that slide
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
