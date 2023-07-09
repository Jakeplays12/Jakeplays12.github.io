const fadeItems = document.querySelectorAll('.fade-item');
fadeItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
  setTimeout(() => {
    item.style.visibility = 'visible';
  }, 100); // Delay in milliseconds before making the element visible
});
