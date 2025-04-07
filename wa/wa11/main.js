// main.js

const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

const altTexts = {
  'pic1.jpg': 'Closeup of a human eye',
  'pic2.jpg': 'Abstract swirly rock pattern',
  'pic3.jpg': 'Purple and white flowers',
  'pic4.jpg': 'Ancient Egyptian hieroglyphics',
  'pic5.jpg': 'Brown butterfly on a green leaf'
};

imageFilenames.forEach(filename => {
  const newImage = document.createElement('img');
  const imagePath = `images/${filename}`; 
  const altText = altTexts[filename];   

  // Set the src and alt attributes for the new thumbnail image
  newImage.setAttribute('src', imagePath);
  newImage.setAttribute('alt', altText);

  // Append the new thumbnail image to the thumb-bar div
  thumbBar.appendChild(newImage);

  // Add a click event listener to the new thumbnail image
  newImage.addEventListener('click', () => {
    // When a thumbnail is clicked, update the main displayed image's src and alt
    displayedImage.setAttribute('src', imagePath);
    displayedImage.setAttribute('alt', altText);
  });
});


/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const currentClass = btn.getAttribute('class');

  // Check the current class of the button
  if (currentClass === 'dark') {
    // If it's 'dark', change to 'light' mode
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'; // Apply darken effect
  } else {
    // If it's not 'dark' (meaning it's 'light'), change back to 'dark' mode
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)'; // Remove darken effect
  }
});