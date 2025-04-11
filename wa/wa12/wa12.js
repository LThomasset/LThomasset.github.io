const newQuoteBtn = document.querySelector("#js-new-quote");
const catImageElement = document.getElementById("cat-photo");
const catNameElement = document.getElementById("cat-name");
const likeButton = document.getElementById("like?");
const likeResultElement = document.getElementById("likeOrNo");

const endpointImage = "https://api.thecatapi.com/v1/images/search";
const endpointName = "https://tools.estevecastells.com/api/cats/v1";
const apiKey = "live_jgS1wllHhbPeD6Rvs7IUeG9YzZaJk97W4mtSiieYkgtBul0L6SPSXotIYt2yhE2j";

if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', fetchCatData);
} else {
    console.error("Button #js-new-quote not found!");
}

if (likeButton) {
    likeButton.addEventListener('click', runLikeGame);
} else {
    console.error("Element #like? not found!");
}

function fetchCatData() {
    likeButton.style.display = "none";
    likeResultElement.style.display = "none";

    getCatImage();
    getCatName();

    window.location.hash = '#top';
}

async function getCatImage() {
    console.log("Fetching new cat image...");
    if (!catImageElement) {
        console.error("Image element #cat-photo not found!");
        return;
    }
    catImageElement.src = "";
    catImageElement.alt = "Loading cat image...";

    try {
        const response = await fetch(endpointImage, {
            headers: { 'x-api-key': apiKey }
        });
        if (!response.ok) throw new Error(`Image API Error! Status: ${response.status}`);
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
            displayCatImage(data[0].url);
        } else {
            throw new Error("No image data received");
        }
    } catch (err) {
        console.error("Failed image fetch:", err);
        alert('Failed cat image load.');
        if (catImageElement) catImageElement.alt = "Failed load";
    }
}

async function getCatName() {
    console.log("Fetching new cat name...");
    if (!catNameElement) {
        console.error("Name element #cat-name not found!");
        return;
    }
    catNameElement.textContent = "Loading name...";

    try {
        const response = await fetch(endpointName);
        if (!response.ok) throw new Error(`Name API Error! Status: ${response.status}`);
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
            displayCatName(data[0]);
        } else {
            throw new Error("No name data received");
        }
    } catch (err) {
        console.error("Failed name fetch:", err);
        alert('Failed cat name load.');
        if (catNameElement) catNameElement.textContent = "Failed load";
    }
}

function displayCatImage(imageUrl) {
    if (catImageElement) {
        catImageElement.src = imageUrl;
        catImageElement.alt = "A random cat image";
    }
}

function displayCatName(name) {
    if (catNameElement) {
        catNameElement.textContent = name;
    }
    if (likeButton) {
        likeButton.style.display = "block";
        likeButton.textContent = "Does " + name + " like you?";
    }
}

function runLikeGame() {
    if (!catNameElement || !catNameElement.textContent || catNameElement.textContent.includes("Loading") || catNameElement.textContent.includes("Failed")) {
        alert("Please wait for a cat name to load!");
        return;
    }
    const currentName = catNameElement.textContent;
    doesCatLikeYou(currentName);
}

function random(min, max) {
    if (min > max) [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGuessRange() {
    const low = random(1, 9);
    const high = random(low + 1, 10);
    return { low, high };
}

function correctNumber(low, high) {
    return random(low, high);
}

function doesCatLikeYou(name) {
    const { low, high } = generateGuessRange();
    const correct = correctNumber(low, high);

    const guessString = prompt(`Does ${name} like you?\nPick a number between ${low} and ${high}:`);

    if (guessString === null) {
        alert("Okay, maybe another time!");
        return;
    }

    const guess = parseInt(guessString);

    if (isNaN(guess) || guess < low || guess > high) {
        alert(`Invalid input. Please enter a number between ${low} and ${high}.`);
        return;
    }

    if (likeResultElement) {
        likeResultElement.style.display = "inline";

        if (guess === correct) {
            likeResultElement.textContent = `Congrats! Somehow, you managed to win over ${name}! The number to win ${name}'s heart was ${correct}.`;
        } else {
            likeResultElement.textContent = `Welp! Guess what? You're not special! ${name} doesn't like your guess! The number to win ${name}'s heart was ${correct}.`;
        }
    } else {
        console.error("Element #likeOrNo not found!");
    }
    window.location.hash = '#likeOrNo';
}

fetchCatData();