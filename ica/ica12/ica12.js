let newQuoteBtn = document.querySelector("#js-new-quote").addEventListener('click', getQuote);
let answerBtn = document.querySelector('#js-tweet');

let endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let current = {
    question: "",
    answer: ""
}

getQuote();

async function getQuote(){
    try{
        const response = await fetch(endpoint);

        if (!response.ok){
            throw Error(response.statusText);
        }

        const json = await response.json();
        // console.log(json);
        displayQuote(json.question);
        answerBtn.addEventListener('click', () => displayAnswer(json.answer));
    }
    catch(err){
        console.log(err);
        alert('Fail');
    }
}

function displayQuote(quote){
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote;
    refresh();
}

function displayAnswer(answer){
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = answer;
}

function refresh(){
    const answerText = document.querySelector('#js-answer-text');
    answerText.textContent = "";
}