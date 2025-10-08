# Bankist Landing Page - Advanced DOM Manipulation

A modern banking landing page built as part of Jonas Schmedtmann's JavaScript course to learn advanced DOM manipulation techniques and JavaScript concepts.
The script.js file has comments I added to better understand the code while learning.

![Bankist Preview](img/hero.png)

## 🎯 Project Overview

This project is a fully functional landing page for a fictional digital bank called "Bankist", developed while learning advanced DOM manipulation from Jonas Schmedtmann's course. It demonstrates various modern web development techniques focusing on DOM manipulation, event handling, and performance optimization.

## 🚀 Features Implemented

### 1. **Modal Window**
- Opens and closes with smooth transitions
- Overlay with blur effect
- Closes on ESC key press
- Multiple trigger buttons using event delegation

### 2. **Smooth Scrolling**
- "Learn More" button scrolls to first section
- Navigation links scroll to respective sections
- Modern `scrollIntoView()` API implementation
- Event delegation for efficient event handling

### 3. **Tabbed Component**
- Interactive operations tabs (Transfers, Loans, Closing)
- Dynamic content switching
- Active state management
- Efficient event delegation on parent container

### 4. **Menu Fade Animation**
- Hover effects on navigation links
- Opacity changes on sibling elements
- Uses `bind()` method to pass arguments to event handlers
- Affects both links and logo

### 5. **Sticky Navigation**
- Fixed navigation bar on scroll
- Implemented using **Intersection Observer API**
- Dynamically responsive to header height
- Performance-optimized (no scroll event listeners)

### 6. **Reveal Sections on Scroll**
- Sections fade in and slide up when scrolling
- Uses Intersection Observer API
- Unobserves sections after reveal for performance
- Threshold-based triggering

### 7. **Lazy Loading Images**
- Images load only when approaching viewport
- Low-quality placeholder images initially
- Blur effect removal after image load
- Performance optimization with `rootMargin`

### 8. **Slider/Carousel Component**
- Image testimonials slider
- Navigation with buttons and keyboard arrows
- Dot indicators showing current slide
- Infinite loop functionality
- Click on dots to navigate

## 📚 Key Concepts Covered in This Project

### DOM Manipulation
- `querySelector()` and `querySelectorAll()`
- `classList` methods (add, remove, contains, toggle)
- `getAttribute()` and dataset properties
- `insertAdjacentHTML()` for dynamic content
- `closest()` method for event delegation

### Event Handling
- Event delegation pattern
- `addEventListener()` with different event types
- `preventDefault()` for custom behavior
- Passing arguments to event handlers using `bind()`
- Mouse events: `mouseover`, `mouseout`
- Keyboard events: `keydown`

### Modern JavaScript APIs
- **Intersection Observer API** for scroll-based effects
- `getBoundingClientRect()` for element positioning
- `scrollIntoView()` for smooth scrolling
- `pageXOffset` and `pageYOffset` for scroll position

### Advanced Techniques
- Event bubbling and capturing
- Guard clauses for cleaner code
- Function refactoring and code organization
- Using `this` keyword with `bind()`
- Arrow functions vs regular functions
- Destructuring arrays and objects

### Performance Optimization
- Event delegation to reduce event listeners
- Intersection Observer instead of scroll events
- Lazy loading images to reduce initial load time
- Unobserving elements after one-time effects
- Efficient DOM queries and caching

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks or libraries

## 📂 Project Structure

```
starter/
│
├── img/                    # Images and icons
├── index.html             # Main HTML structure
├── style.css              # Styling with CSS custom properties
└── script.js              # All JavaScript functionality
```

## 🎨 CSS Features

- CSS Custom Properties (CSS Variables)
- Grid and Flexbox layouts
- Smooth transitions and transforms
- Blur filter effects
- Gradient backgrounds

## 🔑 Key JavaScript Patterns

### Event Delegation
```javascript
// Instead of adding listeners to each element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    // Handle click
  }
});
```

### Intersection Observer
```javascript
const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.15,
  rootMargin: '-100px',
});
```

### Using bind() for arguments
```javascript
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
```

## 💡 Key Takeaways from the Course

1. **Intersection Observer API** is much more efficient than scroll event listeners for implementing scroll-based animations
2. **Event delegation** reduces memory usage and improves performance when dealing with multiple similar elements
3. **Lazy loading** significantly improves initial page load performance
4. Using `closest()` method helps traverse up the DOM tree efficiently
5. The `bind()` method is useful for passing custom arguments to event handlers
6. Guard clauses make code cleaner and prevent errors
7. Data attributes (`data-*`) provide a clean way to store custom information

## 🚦 How to Run

1. Clone this repository
2. Open `index.html` in your browser
3. No build process or dependencies required!

## 👨‍🏫 Course Information

This project was built as part of **The Complete JavaScript Course** by **Jonas Schmedtmann**. All concepts, techniques, and implementation patterns were learned from the instructor's teachings in the Advanced DOM and Events section.

## 🔗 Related Concepts

- DOM traversing and manipulation
- Event propagation (bubbling and capturing)
- Modern JavaScript APIs
- Performance optimization techniques
- Clean code principles and refactoring

---

**Built while learning from:** The Complete JavaScript Course 2024  
**Instructor:** Jonas Schmedtmann  
**Section:** Advanced DOM and Events

