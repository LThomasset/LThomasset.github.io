const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const xHold = "the local mascot, a guy named Craig, ";
const yHold = ":insertY:";
const zHold = ":insertZ:";
let currName = "Bob";
let currWeight = "1000 pound";
let currTemp = "48 fahrenheit";

let storyText = "It was " + currTemp + " outside, and " + currName + " recommended a book to " + xHold + ". The book was called, " + yHold + ", perplexed by the title, they read the book. The premise of the book surprises them: " + zHold + ". " + currName + " later found out that " + xHold + " thoroughly enjoyed the book, mostly because they read it while sitting on the " + currWeight + " rock that resides in the neighborhood forest.";
let insertX = ["DanTDM", "The Pope", "Your Mom"];
let insertY = ["Knitting With Dog Hair: Better a Sweater From a Dog You Know and Love Than From a Sheep You'll Never Meet (by Kendall Crolius and Anne Montgomery)", "The Big Book of Lesbian Horse Stories (by Alisa Surkis and Monica Nolan)", "How to Raise Your I.Q. by Eating Gifted Children (by Lewis Frumkes)"];
let insertZ = ["a man who is losing his memory and discovers that his lost memories are being hunted by a conceptual shark that exists in the patterns of language", "a group of psychics who begin to experience a strange regression of reality, where objects and people decay and revert to earlier states", "12 children raised by a godlike figure, that they call Father. Each child is taught a different form of Cataloging reality. One of the children goes missing, and the rest of the children must find her, while also dealing with the power struggles that are happening between them, and their father"];

randomize.addEventListener('click', result);

function result() {
  if (customName.value !== '') {
    currName = customName.value;
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(1000 / 14) + ' stone';
    const temperature = Math.round((48 - 32) * (5 / 9)) + ' centigrade';
    currWeight = weight;
    currTemp = temperature;
  } else {
      currWeight = "1000 pound";
      currTemp = "48 fahrenheit";
  }

  let newStory = storyText;

  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(xHold, xItem).replace(yHold, yItem).replace(zHold, zItem).replace("Bob", currName);

  newStory = newStory.replace(xHold, xItem).replace(yHold, yItem).replace(zHold, zItem).replace("Bob", currName).replace("1000 pound", currWeight).replace("48 fahrenheit", currTemp);

  story.textContent = newStory;
  story.style.visibility = 'visible';
}