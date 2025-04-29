// class Node{
//     constructor(value){
//         this.value = value;
//         this.next = null;
//     }
// }

// class LinkedList {
//     constructor(){
//         this.head = null;
//         this.tail = null;
//         this.size = 0;
//     }
//     append(value){
//         let newNode = new Node(value)
//         if(!this.head){
//             this.head = newNode;
//             this.tail = newNode;
//         }else{
//             this.tail.next = newNode;
//             this.tail = newNode;
//         }
//         this.size++;
//     }
//     deleteLast(){
//         if(!this.head){
//             console.log("list empty, cannot delete last");
//             return null; //fail
//         }
//         let delValue;
//         if(this.head === this.tail){
//             delValue = this.head.value;
//             this.head = null;
//             this.tail = null;
//         }else{
//             let current = this.head;
//             while(current.next !== this.tail){
//                 current = current.next;
//             }
//             delValue = this.tail.value;
//             current.next = null;
//             this.tail = current;
//         }
//         this.size--;
//         return deletedValue;
//     }
//     printList(){
//         let current = this.head;
//         let result = "";
//         while(current)
//         {
//             result += current.value + ' ';
//             current = current.next;
//         }
//         return result;
//     }
//     clear(){
//         this.head = null;
//         this.tail = null;
//         this.size = 0;
//     }
// }

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

    if (isMatch){
        matches++;
        stack.push(firstCard.dataset.name);
        unflipCards();
        displayList();
    }
    else {unflipCards()};
}

// function disableCards() {
//   firstCard.removeEventListener("click", flipCard);
//   secondCard.removeEventListener("click", flipCard);
//   firstCard.classList.add('matched');
//   secondCard.classList.add('matched');

//   resetBoard();
// }

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

// function restart() {
//   initialize();
// }

function undo(){
    const lastValue = stack.pop();
    if (lastValue !== undefined){
        matches--;
        const matched = gridContainer.querySelectorAll('.card.matched[data-name="${lastValue}"]');
        if (matched.length >= 2){
            const card1 = matched[matched.length - 1];
            const card2 = matched[matched.length - 2];
            card1.classList.remove('flipped','matched');
            card2.classList.remove('flipped','matched');
            card1.addEventListener('click',flipCard);
            card2.addEventListener('click',flipCard);
        }else{
            console.warn("could not find cards to undo for value:", lastValue);
        }
        displayList();
    }else{
        console.log("nothing to undo");
    }
}

function displayList() {
    let itemsArray = stack.print(); // Get the array from the stack
    let result = itemsArray.join(' '); // Join array elements into a space-separated string
    numbersElement.textContent = result;

    if (stack.size() > 0) { // Check stack size
        numbersCollected.classList.add('visible');
    } else {
        numbersCollected.classList.remove('visible');
    }
}

restartButton.addEventListener("click", restart);
undoButton.addEventListener("click", undo);
window.onload = initialize;