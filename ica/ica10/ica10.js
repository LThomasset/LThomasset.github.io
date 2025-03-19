
let btn = document.querySelector('button');
let count = 0;
btn.addEventListener("click", function clickButton () {
    count++;
    var cottage = document.getElementById('cottage');
    if (count % 2 !== 0){
        cottage.setAttribute("src", "./Gemini_Generated_Image_70zger70zger70zg.jpg");
        document.getElementById("button").textContent = "Exit the cottage?";
        const name = prompt("What is your name?");
        document.getElementById("title").innerHTML = "Hello, " + name + "!";        
    }
    else{
        cottage.setAttribute("src", "th-4147822328-removebg-preview.png");
        document.getElementById("button").textContent = "Enter the cottage?";
        document.getElementById("title").innerHTML = "Welcome Traveler!";
    }
});