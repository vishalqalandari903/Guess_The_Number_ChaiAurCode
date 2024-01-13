const form = document.querySelector(".guess_form")
const submit = document.querySelector(".submit_btn")
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".reset_btn");
const guesses_remaining = document.querySelector(".guesses_remaining .guesses");

const TOTAL_GUESSES = 6;
let previous_guesses = [];
let current_guesses_remaining = TOTAL_GUESSES;

let randomNumber = generateRandomNumber();

resetBtn.addEventListener("click", resetGame);

guesses_remaining.innerHTML = current_guesses_remaining;

console.log(randomNumber);
form.addEventListener("submit", function (e) {
    e.preventDefault()
    const inputValue = parseInt(document.querySelector(".guess_input").value);
    checkGuess(inputValue, randomNumber)
    // console.log(randomNumber);
})


function generateRandomNumber() {
    let number = Math.floor(Math.random() * 100)
    return number
}

function checkGuess(currentGuess, correctGuess) {

    if (currentGuess > 100 || currentGuess < 0 || isNaN(currentGuess)) {
            result.innerHTML = `Please Enter a valid Number`
            result.style.color = "red";
    } else {
        // console.log(current_guesses_remaining);

        if (current_guesses_remaining == 1) {
            current_guesses_remaining--;
            guesses_remaining.innerHTML = current_guesses_remaining;

            result.innerHTML = "Ohh No! You lose the game";
            submit.style.pointerEvents = "none";
            result.style.color = "red";
            document.querySelector(".guess_input").blur()
            document.querySelector(".guess_input").style.pointerEvents = "none";
        } else {
            current_guesses_remaining--;
            guesses_remaining.innerHTML = current_guesses_remaining;

            previous_guesses.push(currentGuess);
            document.querySelector(".previous_guesses .guesses").innerHTML = previous_guesses.join(", ")
            result.innerHTML = ``;
            result.style.color = "black";

            if (currentGuess > correctGuess) {
                if ((currentGuess - correctGuess) > 15) {
                    result.innerHTML = "Your Guess is too high";
                } else {
                    result.innerHTML = "Your Guess is little higher than randomNumber";
                }
            } else if(currentGuess < correctGuess) {
                if ((correctGuess - currentGuess) > 15) {
                    result.innerHTML = "Your Guess is too low";
                } else {
                    result.innerHTML = "Your Guess is little lower than randomNumber";
                }
            } else {
                result.innerHTML = "Congrats! You Guess is correct"
                result.style.color = "green";
                submit.style.pointerEvents = "none";
            } 
        }
    }
}

function resetGame() {
    randomNumber = generateRandomNumber();
    result.innerHTML = "";
    document.querySelector(".guess_input").value = "";
    submit.style.pointerEvents = "all";
    document.querySelector(".previous_guesses .guesses").innerHTML = "";
    guesses_remaining.innerHTML = TOTAL_GUESSES;
    current_guesses_remaining = TOTAL_GUESSES;
    previous_guesses = [];
    document.querySelector(".guess_input").style.pointerEvents = "all";
    console.log(randomNumber);
}

var inputField = document.querySelector('.guess_input');

// inputField.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//         const inputValue = parseInt(this.value);
//         checkGuess(inputValue, randomNumber);
//     }
// });