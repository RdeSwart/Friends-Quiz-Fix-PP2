// //Use DomContentLoaded event instead of window.onload
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rules").style.display = "block";
    const beginQuizButton = document.getElementById("rulesOk");
    //Help with code below from fellow student Vernell Clarke
    if (beginQuizButton) {
        beginQuizButton.addEventListener("click", function () {
            document.getElementById("rules").style.display = "none";
            startQuiz();
        });
    }
});

//Game Questions as Objects with Booleans

const questions = [
    {
        question: "Joey played Dr. Drake Ramoray on which soap opera show?",
        answers: [
            { text: "Days of our Lives", correct: true },
            { text: "Knots Landing", correct: false },
            { text: "Dallas", correct: false },
            { text: "Dynasty", correct: false }
        ]
    },
    {

        question: "How many times did Ross get divorced?",
        answers: [
            { text: "Four Times", correct: false },
            { text: "Three Times", correct: true },
            { text: "Twice", correct: false },
            { text: "Once", correct: false }
        ]
    },
    {
        question: "Phoebe's scientist boyfriend David worked in what city?",
        answers: [
            { text: "Yemen", correct: false },
            { text: "Paris", correct: false },
            { text: "Minsk", correct: true },
            { text: "London", correct: false }
        ]

    },
    {
        question: "What is Chandler Bing's middle name?",
        answers: [
            { text: "Muriel", correct: true },
            { text: "Sue", correct: false },
            { text: "Joseph", correct: false },
            { text: "Bong", correct: false }
        ]
    },
    {
        question: "Who mistakingly threw a woman's wooden leg into a fire?",
        answers: [
            { text: "Joey", correct: true },
            { text: "Chandler", correct: false },
            { text: "Ross", correct: false },
            { text: "Richard", correct: false }
        ]
    },
    {
        question: "Which of Joey's sisters did Chandler fool around with?",
        answers: [
            { text: "Mary Therese", correct: false },
            { text: "Gina", correct: false },
            { text: "Mary Angela", correct: true },
            { text: "Veronica", correct: false }
        ]
    },
    {
        question: "Monica categorizes her towels into how many categories?",
        answers: [
            { text: "6", correct: false },
            { text: "4", correct: false },
            { text: "8", correct: false },
            { text: "11", correct: true }
        ]
    },
    {
        question: "Rachel was in which sorority?",
        answers: [
            { text: "Kappa Kappa Gamma", correct: false },
            { text: "Kappa Kappa Delta", correct: true },
            { text: "Gamma Phi Beta", correct: false },
            { text: "Delta Delta Delta", correct: false }
        ]
    },
    {
        question: "What do Monica and Chandler name their twins?",
        answers: [
            { text: "Emma and Ben", correct: false },
            { text: "Chandler and Leslie", correct: false },
            { text: "Erica and Jack", correct: true },
            { text: "Janice and Richard", correct: false }
        ]
    },
    {
        question: "Who was Rachel's prom date?",
        answers: [
            { text: "Ross", correct: false },
            { text: "Chip Matthews", correct: true },
            { text: "Tag Jones", correct: false },
            { text: "Barry Farber", correct: false }
        ]
    },

];

//Start Quiz Function
function startQuiz() {
    const questionElement = document.getElementById("question");
    const submitButton = document.getElementById("submit");
    const userScoreElement = document.getElementById("user-score");
    const resultContainer = document.getElementById("results");

    let currentQuestion = 0;
    let score = 0;
    //Help with code below from fellow student Vernell Clarke
    let answerSelected = false;

    if (userScoreElement) {

        userScoreElement.innerText = score;
    }


    //use shuffle array method so questions aren't missed
    // Code from Stack Overflow
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showQuestion() {
        const question = questions[currentQuestion];
        score = score;
        //Display question
        if (questionElement) {
            questionElement.innerText = question.question;
        }
        // Reset answerSelected for the next question
        answerSelected = false;

        // Display answers
        //  Get list of answer buttons and add event listener
        const answerButtons = document.querySelectorAll(".ans-btn");
        answerButtons.forEach((button, index) => {
            button.innerText = question.answers[index].text;
            button.classList.remove('correct', 'incorrect');
            button.removeEventListener("click", selectAnswer);
            button.addEventListener("click", selectAnswer);

        });
    }

    //If correct answer is selected, add to score
    //Help with code below from fellow student Vernell Clarke
    function selectAnswer(event) {
        const answerButtons = document.querySelectorAll(".ans-btn");
        // Find the correct answer object for the current question
        const selectedButton = event.target;

        answerButtons.forEach((button) => {

            button.removeEventListener("click", selectAnswer); // Disable further clicks

            const answerText = button.innerText;
            const answer = questions[currentQuestion].answers.find(
                (a) => a.text === answerText
            );
            if (answer.correct) {
                button.classList.add('correct');

            } else {

                button.classList.add('incorrect');
            }

            if (selectedButton === button && answer.correct) {
                score++;
                if (userScoreElement) {
                    userScoreElement.innerText = score;
                }

            }
            resultContainer.innerHTML = `<p class="js-score">Your score: ${score}/${questions.length}</p>`;

        });

        answerSelected = true;
    }

    //Ensure user selects an answer
    //Help with code from fellow student Vernell Clarke
    if (submitButton) {
        submitButton.addEventListener("click", function () {
            if (!answerSelected && submitButton.innerText !== "Play Again?") {
                alert("Please select an answer before proceeding.");
                return;
            }

            if (submitButton.innerText === "Play Again?") {

                resetQuiz();
            } else {
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    showResult();
                }
            }
        });
    }

    function showResult() {
        const resultContainer = document.getElementById("results");
        if (resultContainer) {
            resultContainer.innerHTML = `
      <h1>Quiz Completed!</h1>
      <p>Your score: ${score}/${questions.length}</p>`;
            if (submitButton) {
                submitButton.innerHTML = "Play Again?";
            }
        }
    }

    //start quiz over again
    function resetQuiz() {
        currentQuestion = 0;
        score = 0;
        resultContainer.innerHTML = ''; // Clear results if any
        shuffleArray(questions);
        showQuestion();

        if (submitButton) {
            submitButton.innerHTML = "N<span class='red-dot'>&middot;</span>E<span class='aqua-dot'>&middot;</span>X<span class='gold-dot'>&middot;</span>T";
        }
        if (userScoreElement) {
            userScoreElement.innerText = score;
        }
    }
    //Shuffle questions when quiz starts
    shuffleArray(questions);
    //Start quiz
    showQuestion();

}