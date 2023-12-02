document.addEventListener('DOMContentLoaded', function() {
  const mouseTracer = document.getElementById('mouse-tracer');

  document.addEventListener('mousemove', function(e) {
    // Add a delay effect by using a setTimeout
    setTimeout(() => {
      const x = e.clientX  - 300 /2;
      const y = e.clientY - 300 ;

      mouseTracer.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
    }, 100); // Adjust the delay duration (in milliseconds) as needed
  });
});