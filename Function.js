function scrollToSection(targetId) {
  const screenWidth = window.innerWidth;
  /* let offset = 100;
  if (screenWidth < 388){
    offset = 30;
  } */
  const offset = 100;
  const targetElement = document.querySelector(targetId);
  const targetPosition = targetElement.offsetTop - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Attach click event handlers to the navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    scrollToSection(targetId);
  });
});