var toggle = document.getElementById("theme-toggle");
var sunIcon = toggle.querySelector(".fa-sun");
var moonIcon = toggle.querySelector(".fa-moon");

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(sg-prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme);

// Set initial icon based on the stored theme
if (storedTheme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
} else {
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
}

var isSun = storedTheme === "light"; // Set initial flag based on the stored theme

toggle.onclick = function() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);

    // Toggle the icons
    if (isSun) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline-block";
    } else {
        sunIcon.style.display = "inline-block";
        moonIcon.style.display = "none";
    }

    isSun = !isSun; // Toggle the flag
};
