// This offsets the nav elements when jump to each section
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href');
    scrollToSection(targetId);
  });
});

function scrollToSection(targetId) {
  const offset = 100;
  const targetElement = document.querySelector(targetId);
  const targetPosition = targetElement.offsetTop - offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}
