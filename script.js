const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the next number in the series: 2, 3, 5, 7, 11, ?",
        answers: [
            { text: "13", correct: true },
            { text: "14", correct: false },
            { text: "15", correct: false },
            { text: "16", correct: false }
        ]
    },
    {
        question: "Which of the following is a synonym of 'enormous'?",
        answers: [
            { text: "tiny", correct: false },
            { text: "huge", correct: true },
            { text: "scanty", correct: false },
            { text: "faint", correct: false }
        ]
    },
    {
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
        answers: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        question: "Which one of the five is least like the other four?",
        answers: [
            { text: "Dog", correct: true },
            { text: "Mouse", correct: false },
            { text: "Lion", correct: false },
            { text: "Snake", correct: false },
            { text: "Elephant", correct: false }
        ]
    },
    {
        question: "Which number should come next in the pattern: 37, 34, 31, 28, ?",
        answers: [
            { text: "25", correct: true },
            { text: "24", correct: false },
            { text: "23", correct: false },
            { text: "22", correct: false }
        ]
    },
    {
        question: "If you rearrange the letters 'CIFAIPC' you would have the name of a(n):",
        answers: [
            { text: "City", correct: false },
            { text: "Animal", correct: false },
            { text: "Ocean", correct: false },
            { text: "Country", correct: true }
        ]
    },
    {
        question: "What day follows the day before yesterday if two days from now will be Sunday?",
        answers: [
            { text: "Monday", correct: true },
            { text: "Tuesday", correct: false },
            { text: "Wednesday", correct: false },
            { text: "Thursday", correct: false }
        ]
    },
    {
        question: "A clock shows the time as 3:00. If the minute hand points East, in which direction does the hour hand point?",
        answers: [
            { text: "North", correct: false },
            { text: "South", correct: false },
            { text: "West", correct: false },
            { text: "East", correct: true }
        ]
    },
    {
        question: "Which of the following can be arranged into a 5-letter English word?",
        answers: [
            { text: "H R G T I", correct: false },
            { text: "R I L S E", correct: true },
            { text: "T O O M T", correct: false },
            { text: "W Q R G S", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
