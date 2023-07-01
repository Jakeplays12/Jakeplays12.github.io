// navbar.js

// The ID of the element where the navbar will be inserted
const navbarContainerId = 'navbar-container';

// Fetch the HTML file containing the navbar
fetch('/navbar/NavBar.html')
  .then(response => response.text())
  .then(html => {
    // Get the navbar container element
    const navbarContainer = document.getElementById(navbarContainerId);

    // Insert the fetched HTML into the navbar container
    navbarContainer.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching navbar:', error);
  });
