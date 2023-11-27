// navbar-footer.js

// The ID of the element where the navbar will be inserted
const navbarContainerId = 'navbar-container';

// The ID of the element where the footer will be inserted
const footerContainerId = 'footer-container';

// Fetch the HTML file containing the navbar
fetch('/NavAndFooter/NavBar.html')
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

// Fetch the HTML file containing the footer
fetch('/NavAndFooter/Footer.html')
  .then(response => response.text())
  .then(html => {
    // Get the footer container element
    const footerContainer = document.getElementById(footerContainerId);

    // Insert the fetched HTML into the footer container
    footerContainer.innerHTML = html;
  })
  .catch(error => {
    console.error('Error fetching footer:', error);
  });
