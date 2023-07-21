// Replace the following JSON data with your actual image URLs and tags
const imageData = {
  "skade": [
    "https://media.discordapp.net/attachments/853390828310495272/1130153128512192584/image.png",
  ],
  "all": [],
  "personal": [
    "https://media.discordapp.net/attachments/541356613039292456/1079853814150090902/image.png?width=1276&height=671",
    "https://media.discordapp.net/attachments/541356613039292456/966107041083060264/2022-04-19_23.43.48.png?width=377&height=671",
    "https://media.discordapp.net/attachments/541356613039292456/1088681782032998461/image.png?width=1440&height=633",

  ],
};

// Merge skade and personal images into the all category
imageData.all = imageData.skade.concat(imageData.personal);

const imageGallery = document.getElementById("imageGallery");

function createImageElement(url, index) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Image";
  img.className = "image";

  // Calculate the animation delay based on the index
  const animationDelay = 0.1 * index + "s";
  img.style.animationDelay = animationDelay;

  // Add a class for the animation effect
  img.classList.add("image-animate");

  // Add an event listener to remove the animation class after the animation ends
  img.addEventListener("animationend", () => {
    img.classList.remove("image-animate");
  });

  return img;
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showCategory(category) {
  imageGallery.innerHTML = ""; // Clear existing images

  // Function to display shuffled images
  function displayShuffledImages(images) {
    shuffleArray(images).forEach((imageUrl, index) => {
      const imgElement = createImageElement(imageUrl, index);
      imageGallery.appendChild(imgElement);
    });
  }

  // Display images based on the selected category
  if (category === "all") {
    displayShuffledImages(imageData.all);
  } else {
    displayShuffledImages(imageData[category]);
  }

  // Set the active button
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("onclick") === `showCategory('${category}')`) {
      button.classList.add("active");
    }
  });
}

// By default, show all images randomly
showCategory("all");
