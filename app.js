const Print = document.querySelector("#Print");
let currentIndex = 0;  
let questions = [];    
let score = 0;


fetch("https://the-trivia-api.com/v2/questions")
.then((res) => res.json())
.then((res) => {
    questions = res; 
    console.log(questions);
    // console.log(questions[0].correctAnswer);
    // console.log(questions[0]);
    
    
    
     
    Display(questions[currentIndex], currentIndex);  
    // console.log(currentIndex);
    // console.log(questions[currentIndex]);
    
    
})
.catch((err) => console.error("error"));

function Display(item, index) {
    Print.innerHTML = `<div class="m-5 mt-5">
        <p>${item.question.text}</p>
        <p> <input type="radio" name="Ans" value="${item.incorrectAnswers[0]}" id=""> ${item.incorrectAnswers[0]} </p>
        <p>  <input type="radio" name="Ans" value="${item.correctAnswer}" id=""> ${item.correctAnswer} </p>
        <p> <input type="radio" name="Ans" value="${item.incorrectAnswers[1]}" id=""> ${item.incorrectAnswers[1]}</p>
        <p> <input type="radio" name="Ans" value="${item.incorrectAnswers[2]}" id=""> ${item.incorrectAnswers[2]}</p>             
        <button class="btn btn-primary mb-5" id="next">Next</button>
    </div>`;

    
    const nextButton = document.querySelector("#next");
    nextButton.addEventListener('click', function() {
        const isAnswered = check(item)
        
        next(isAnswered);  
        
    });
}


function next(isAnswered) {
    if (currentIndex < questions.length - 1 ) {
        if(isAnswered){
        currentIndex++; 
        Display(questions[currentIndex], currentIndex);  
    }else{
        alert("please select answer!!")
    }
    }
     else {
        Print.innerHTML = `<div class="m-5 mt-5 "><h1 class="mb-5">Quiz finished! Your score is: ${score}/${questions.length}</h1></div>`;
    }
}
function check(item) {
    
    const selectedAnswer = document.querySelector('input[name="Ans"]:checked');
    
    if (selectedAnswer) {
        const userAnswer = selectedAnswer.value;
        if (userAnswer == item.correctAnswer) {
            score++;  
            console.log("Correct! Your score is now: " + score);
        } else {
            alert("Incorrect! Correct answer was: " + item.correctAnswer);
        }
        return true;
    } else {
       alert("No answer selected.");
       return false;
    }
}
