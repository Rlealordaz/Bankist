'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// smooth scroll,para cuando se toque learn more baje hasta el enlace
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
  // coordenadas de learn more
  console.log(e.target.getBoundingClientRect());

  // distancia de cuando me muevo por el scroll, y aprieto el boton
  console.log(`Current scroll (X/Y)`, window.pageXOffset, window.pageYOffset);

  //Smooth Scrolling
  /* window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});
*/

  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation

//document.querySelectorAll('.//nav__link').forEach(function (el) {
//  el.addEventListener('click', //function (e) {

// Event Delegation

//1. Add Event ;istenerto common parent element
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

//Prueba, no es optimo pq si hubiera muchos elementos entonces consume muchos recursos
//tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

//Using Event delegation

tabsContainer.addEventListener('click', function (e) {
  // const clicked = e.target;
  //console.log(clicked);

  // se necesita una forma para acceder al boton
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  //guard clause
  if (!clicked) return;

  //Remove active classes, aqui quita la que se  dejo de usar y no se seniala
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab, la animacion que seniala cual se esta usando
  clicked.classList.add('operations__tab--active');

  //Activate content area, aqui se cambia y se muestra la que se clickea
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
//mouseover hace la burbuja

// se busca un padre que este cercano
// aqui se pone opaco lo que esta alrededor cuadno se da click en una opcion

// en esta funcion de handler solo se necesita un parametro, lo otro se le envia a traves de bind,con el this
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Navigation: Intesection Observer API

const header = document.querySelector('.header');
// haciendo responsive la altura
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// aqui las propiedades donde va a intersectar
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Animacion dada de css, para que se revelen las secciones mientras se va bajando

//Reveal Section

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);

    //apunta al target que esta dentro de cada seccion para saber cuando mostrar, como target intersectado
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  // lo que se demora en salir
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // se carga la imagen 200px antes
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //const slider = document.querySelector('.slider');
  //slider.style.transform = ' scale(0.4) //trnaslateX(-800px)';
  //slider.style.overflow = 'visible';

  //creando dots, es crear los puntos de las imagenes que marca la posicion

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // para que margue cual dot esta seleccionado

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // refacturando la mejor manera es con funciones a veces

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // -100%, 0%, 100%, 200%

  //Next Silde, aqui se mueve

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //condiciones iniciales
  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();
  //Event handlers del slice

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Para que se mueva las imagenes utilizando las flechas

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  // para el dot

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
