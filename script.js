const questions = [

    {
        category: "Technology",

        question: "Apa kepanjangan dari HTML?",

        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "HomeText Markup Language"
        ],

        correct: 0
    },


    {
        category: "Programming",

        question:
            "Bahasa pemrograman mana yang berjalan secara native di browser?",

        answers: [
            "Python",
            "JavaScript",
            "C++",
            "Java"
        ],

        correct: 1
    },


    {
        category: "Science",

        question:
            "Planet terbesar di tata surya kita adalah...",

        answers: [
            "Saturnus",
            "Neptunus",
            "Jupiter",
            "Mars"
        ],

        correct: 2
    },


    {
        category: "Geography",

        question:
            "Ibu kota Indonesia saat ini adalah...",

        answers: [
            "Bandung",
            "Jakarta",
            "Surabaya",
            "Yogyakarta"
        ],

        correct: 1
    },


    {
        category: "Technology",

        question:
            "CSS terutama digunakan untuk...",

        answers: [
            "Menyimpan database",
            "Mengatur tampilan halaman web",
            "Membuat server",
            "Mengompilasi program"
        ],

        correct: 1
    },


    {
        category: "General Knowledge",

        question:
            "Berapa jumlah sisi pada sebuah segitiga?",

        answers: [
            "2",
            "3",
            "4",
            "5"
        ],

        correct: 1
    },


    {
        category: "Programming",

        question:
            "Manakah yang termasuk tipe data JavaScript?",

        answers: [
            "String",
            "Folder",
            "Browser",
            "Server"
        ],

        correct: 0
    },


    {
        category: "Science",

        question:
            "Air mendidih pada suhu berapa pada tekanan atmosfer normal?",

        answers: [
            "50°C",
            "75°C",
            "100°C",
            "150°C"
        ],

        correct: 2
    },


    {
        category: "Geography",

        question:
            "Benua terbesar di dunia berdasarkan luas wilayah adalah...",

        answers: [
            "Afrika",
            "Eropa",
            "Asia",
            "Amerika Selatan"
        ],

        correct: 2
    },


    {
        category: "Technology",

        question:
            "Apa fungsi utama Git?",

        answers: [
            "Mengedit foto",
            "Version control",
            "Membuat desain UI",
            "Mengelola email"
        ],

        correct: 1
    }

];


// ============================
// ELEMENTS
// ============================

const startScreen =
    document.getElementById("startScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");


const startBtn =
    document.getElementById("startBtn");

const restartBtn =
    document.getElementById("restartBtn");

const nextBtn =
    document.getElementById("nextBtn");


const questionCounter =
    document.getElementById("questionCounter");

const progressFill =
    document.getElementById("progressFill");

const category =
    document.getElementById("category");

const questionText =
    document.getElementById("questionText");

const answersContainer =
    document.getElementById("answers");

const timerElement =
    document.getElementById("timer");

const timerBox =
    document.querySelector(".timer");

const scoreElement =
    document.getElementById("score");

const feedback =
    document.getElementById("feedback");


const finalScore =
    document.getElementById("finalScore");

const correctCount =
    document.getElementById("correctCount");

const wrongCount =
    document.getElementById("wrongCount");

const accuracy =
    document.getElementById("accuracy");

const resultTitle =
    document.getElementById("resultTitle");

const resultMessage =
    document.getElementById("resultMessage");

const resultIcon =
    document.getElementById("resultIcon");


// ============================
// VARIABLES
// ============================

let currentQuestion = 0;

let score = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let timeLeft = 15;

let timer;

let answered = false;


const letters = [
    "A",
    "B",
    "C",
    "D"
];


// ============================
// SCREEN
// ============================

function showScreen(screen) {

    [
        startScreen,
        quizScreen,
        resultScreen

    ].forEach(screen => {

        screen.classList.remove("active");

    });


    screen.classList.add("active");
}


// ============================
// START QUIZ
// ============================

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    correctAnswers = 0;

    wrongAnswers = 0;


    scoreElement.textContent = "0";


    showScreen(quizScreen);


    loadQuestion();
}


// ============================
// LOAD QUESTION
// ============================

function loadQuestion() {

    clearInterval(timer);


    answered = false;

    nextBtn.disabled = true;

    feedback.textContent = "";

    feedback.className = "";


    const question =
        questions[currentQuestion];


    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    category.textContent =
        question.category;


    questionText.textContent =
        question.question;


    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersContainer.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-btn";


            button.innerHTML = `

                <span class="answer-letter">
                    ${letters[index]}
                </span>

                <span>
                    ${answer}
                </span>

            `;


            button.addEventListener(
                "click",
                () => selectAnswer(index)
            );


            answersContainer.appendChild(
                button
            );

        }
    );


    startTimer();
}


// ============================
// TIMER
// ============================

function startTimer() {

    timeLeft = 15;

    updateTimer();


    timer = setInterval(() => {

        timeLeft--;

        updateTimer();


        if (timeLeft <= 0) {

            clearInterval(timer);


            if (!answered) {

                timeOut();

            }

        }

    }, 1000);
}


function updateTimer() {

    timerElement.textContent =
        timeLeft;


    timerBox.classList.toggle(
        "warning",
        timeLeft <= 7 &&
        timeLeft > 3
    );


    timerBox.classList.toggle(
        "danger",
        timeLeft <= 3
    );
}


// ============================
// SELECT ANSWER
// ============================

function selectAnswer(
    selectedIndex
) {

    if (answered) return;


    answered = true;

    clearInterval(timer);


    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(
        button =>
            button.disabled = true
    );


    buttons[
        question.correct
    ].classList.add(
        "correct"
    );


    // CORRECT
    if (
        selectedIndex ===
        question.correct
    ) {

        correctAnswers++;


        const earned =
            100 + (timeLeft * 5);


        score += earned;


        scoreElement.textContent =
            score;


        feedback.textContent =
            `✓ Correct! +${earned} points`;


        feedback.className =
            "correct-text";

    }


    // WRONG
    else {

        wrongAnswers++;


        buttons[
            selectedIndex
        ].classList.add(
            "wrong"
        );


        feedback.textContent =
            `✕ Not quite. The answer was ${letters[question.correct]}.`;


        feedback.className =
            "wrong-text";

    }


    nextBtn.disabled = false;
}


// ============================
// TIME OUT
// ============================

function timeOut() {

    answered = true;

    wrongAnswers++;


    const question =
        questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer-btn"
        );


    buttons.forEach(
        button =>
            button.disabled = true
    );


    buttons[
        question.correct
    ].classList.add(
        "correct"
    );


    feedback.textContent =
        `⏱ Time's up! The answer was ${letters[question.correct]}.`;


    feedback.className =
        "wrong-text";


    nextBtn.disabled = false;
}


// ============================
// NEXT
// ============================

function nextQuestion() {

    if (!answered) return;


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        loadQuestion();

    }

    else {

        finishQuiz();

    }
}


// ============================
// FINISH QUIZ
// ============================

function finishQuiz() {

    clearInterval(timer);


    const maxScore =
        questions.length * 175;


    const percentage =
        Math.round(
            (
                correctAnswers /
                questions.length
            ) * 100
        );


    const normalizedScore =
        Math.min(
            1000,
            Math.round(
                (score / maxScore) *
                1000
            )
        );


    finalScore.textContent =
        normalizedScore;


    correctCount.textContent =
        correctAnswers;


    wrongCount.textContent =
        wrongAnswers;


    accuracy.textContent =
        `${percentage}%`;


    // RESULT MESSAGE

    if (percentage === 100) {

        resultIcon.textContent =
            "🏆";

        resultTitle.textContent =
            "Perfect Score!";

        resultMessage.textContent =
            "Luar biasa! Semua pertanyaan berhasil kamu jawab.";

    }

    else if (percentage >= 70) {

        resultIcon.textContent =
            "🔥";

        resultTitle.textContent =
            "Great Job!";

        resultMessage.textContent =
            "Hasil yang bagus. Tinggal sedikit lagi menuju perfect score.";

    }

    else if (percentage >= 40) {

        resultIcon.textContent =
            "✨";

        resultTitle.textContent =
            "Nice Try!";

        resultMessage.textContent =
            "Kamu sudah cukup bagus. Coba lagi untuk meningkatkan skor.";

    }

    else {

        resultIcon.textContent =
            "💪";

        resultTitle.textContent =
            "Keep Learning!";

        resultMessage.textContent =
            "Jangan menyerah. Coba lagi dan lihat apakah skor kamu bisa naik.";

    }


    showScreen(resultScreen);
}


// ============================
// EVENT LISTENERS
// ============================

startBtn.addEventListener(
    "click",
    startQuiz
);


restartBtn.addEventListener(
    "click",
    startQuiz
);


nextBtn.addEventListener(
    "click",
    nextQuestion
);


// ============================
// KEYBOARD SUPPORT
// ============================

document.addEventListener(
    "keydown",
    event => {

        if (
            !quizScreen.classList.contains(
                "active"
            )
        ) {
            return;
        }


        const number =
            Number(event.key);


        if (
            number >= 1 &&
            number <= 4 &&
            !answered
        ) {

            selectAnswer(
                number - 1
            );

        }


        if (
            event.key === "Enter" &&
            answered
        ) {

            nextQuestion();

        }

    }
);