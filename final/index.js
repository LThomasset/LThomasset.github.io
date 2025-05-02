class Stack {
    constructor(){
        this.items = [];
    }
    push(item){
        this.items.push(item);
    }
    pop(){
        if (this.isEmpty()){
            console.log("stack is empty");
            return undefined;
        }
        return this.items.pop();
    }
    peek(){
        if (this.isEmpty()){
            console.log("stack is empty");
            return undefined;
        }
        return this.items[this.items.length - 1];
    }
    isEmpty(){
        return this.items.length == 0;
    }
    size(){
        return this.items.length;
    }
    print(){
        return this.items;
    }
    clear(){
        this.items = [];
    }
}

const gridContainer = document.querySelector(".grid-container");
const numbersCollected = document.querySelector(".numbers-collected");
const numbersElement = document.querySelector(".numbers");
const restartButton = document.getElementById("restart-button");
const undoButton = document.getElementById("undo-button");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");
submitButton.disabled = true;

let cards = [];
let dataCache = null;
let stack = new Stack();
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

async function fetchData(){
    if (dataCache){
        return Promise.resolve(dataCache);
    }
    return fetch("cards.json")
        .then((res) => res.json())
        .then((data) => {
            dataCache = data;
            return data;
        })
}

function setup(data){
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
}

function initialize(){
    stack.clear();
    matches = 0;
    numbersCollected.classList.remove('visible');
    numbersElement.textContent = '';
    resetBoard();

    fetchData()
        .then(setup)
        .catch(error => console.error("error initializing game:", error));
}


// make this work when cards are matched
function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
    gridContainer.innerHTML = '';
    for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
        <div class="front">
        <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
    }
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped") || this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;

  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch && stack.size() < 12){
        matches++;
        stack.push(firstCard.dataset.name);
        if (stack.size() === 3 || stack.size() === 7){
            stack.push("-");
        }
        unflipCards();
        displayList();
        shuffleCards();
        message.textContent = "Match the cards to add numbers to your phone number!";
    }
    else if (stack.size() === 12){
        submitButton.disabled = false;
        alert("You have collected 10 numbers, please submit your number");
        unflipCards();
        message.textContent = "Match the cards to add numbers to your phone number!";
    }
    else if(stack.size() >= 12){
        alert("too many numbers");
        unflipCards();
        shuffleCards();
        displayList();
        message.textContent = "Match the cards to add numbers to your phone number!";
    }
    else {unflipCards();
        message.textContent = "Match the cards to add numbers to your phone number!";
    }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  initialize();
}

function undo() {
    const lastValue = stack.pop(); 

    if (lastValue !== undefined) {
        if (lastValue === "-") {
            const secondLastValue = stack.pop();
            if (secondLastValue !== undefined) {
                matches--;
                undoMatchedCards(secondLastValue);
            } else {
                console.warn("Stack is inconsistent: '-' found but no preceding value.");
            }
        } else {
            matches--;
            undoMatchedCards(lastValue);
        }
        displayList(); 
    } else {
        console.log("Nothing to undo");
    }
}

function undoMatchedCards(value) {
    const matched = Array.from(gridContainer.querySelectorAll(`.card.matched[data-name="${value}"]`));
    if (matched.length >= 2) {
        const card1 = matched.pop(); 
        const card2 = matched.pop(); 
        card1.classList.remove("flipped", "matched");
        card2.classList.remove("flipped", "matched");
        card1.addEventListener("click", flipCard);
        card2.addEventListener("click", flipCard);
    } else if (matched.length === 1) {
        console.warn(`Only one card found for value: ${value}. This might indicate an issue.`);
    } else {
        console.warn(`Could not find cards to undo for value: ${value}.`);
    }
}

function displayList() {
    let itemsArray = stack.print(); 
    let result = itemsArray.join(' '); 
    numbersElement.textContent = result;

    if (stack.size() > 0) { 
        numbersCollected.classList.add('visible');
    } else {
        numbersCollected.classList.remove('visible');
    }

    if (stack.size() === 12) {
        submitButton.disabled = false;
        message.textContent = "You have collected 10 numbers, please submit your number!";
        message.classList.add("visible");
    }
    else {
        submitButton.disabled = true;
    }
}

function submit(){
    const message = document.getElementById("message");
    let itemsArray = stack.print(); 
    let result = itemsArray.join(' '); 
    message.textContent = "Your number is: " + result;
    message.classList.add("visible");
    const submitButton = document.getElementById("submit-button");
    submitButton.disabled = true;
    restart();
}

restartButton.addEventListener("click", restart);
undoButton.addEventListener("click", undo);
window.onload = initialize;