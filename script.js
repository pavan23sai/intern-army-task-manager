const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const resultText = document.getElementById("result-text");
const scoreDisplay = document.getElementById("score");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What does JVM stand for?",
    answers: [
      { text: "Java Virtual Machine", correct: true },
      { text: " Java Virtual Memory", correct: false },
      { text: "Java Variable Machine", correct: false },
      { text: "Java Virtual Method", correct: false },
    ],
  },
  {
    question: "Which of the following is not a primitive data type in Java??",
    answers: [
      { text: "int", correct: false },
      { text: "float", correct: false },
      { text: "string", correct: true },
      { text: "char", correct: false },
    ],
  },
  {
    question: "Which keyword is used to define a constant in Java?",
    answers: [
      { text: "static", correct: false },
      { text: "const", correct: false },
      { text: "final", correct: true },
      { text: "readonly", correct: false },
    ],
  },
  {
    question: "Which collection class is synchronized in Java?",
    answers: [
      { text: "ArrayList", correct: false },
      { text: " LinkedList", correct: false },
      { text: "vector", correct: true },
      { text: "HashSet", correct: false },
    ],
  },
  {
    question: "Which of the following is a marker interface in Java?",
    answers: [
      { text: "Runnable", correct: false },
      { text: "Comparable", correct: false },
      { text: "serializable", correct: true },
      { text: "cloneable", correct: false },
    ],
  },
  {
    question: "Which of the following statements about Java interfaces is true?",
    answers: [
      { text: "Interfaces can contain implementation of methods.", correct: false },
      { text: "Interfaces cannot have methods with body.", correct: true },
      { text: "Interfaces can extend multiple classes.", correct: false },
      { text: "Interfaces cannot be extended.", correct: false },
    ],
  },
  {
    question: "What does the keyword super refer to in Java?",
    answers: [
      { text: "It refers to the current instance of the class.", correct: false },
      { text: "It refers to the superclass of the current class.", correct: true },
      { text: "It refers to the subclass of the current class.", correct: false },
      { text: "It refers to the parent class of the current class.", correct: false },
    ],
  },


  
];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  score = 0;
  questionContainer.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  startButton.classList.add("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

answerButtons.addEventListener("click", checkAnswer);

function checkAnswer(event) {
  const selectedAnswer = event.target;
  if (selectedAnswer.tagName === "INPUT") {
    const answerIndex = parseInt(selectedAnswer.value);
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  }
}

function endQuiz() {
  questionContainer.classList.add("hide");
  resultText.classList.remove("hide");
  scoreDisplay.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
  restartButton.classList.remove("hide");
}

restartButton.addEventListener("click", () => {
  questionContainer.classList.remove("hide");
  resultText.classList.add("hide");
  scoreDisplay.innerText = "";
  restartButton.classList.add("hide");
  startQuiz();
});
