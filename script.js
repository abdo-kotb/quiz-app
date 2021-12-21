// all questions array
const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { answer: '4', correct: true },
      { answer: '8' },
      { answer: '1' },
      { answer: '6' },
    ],
  },
  {
    question: 'What is 6 + 6?',
    answers: [
      { answer: '3' },
      { answer: '6' },
      { answer: '12', correct: true },
      { answer: '24' },
    ],
  },
  {
    question: 'What is 4 x 8?',
    answers: [
      { answer: '32', correct: true },
      { answer: '8' },
      { answer: '-12' },
      { answer: '1' },
    ],
  },
  {
    question: 'What is 2 - 5?',
    answers: [
      { answer: '-3', correct: true },
      { answer: '-1' },
      { answer: '2' },
      { answer: '-6' },
    ],
  },
  {
    question: 'What is 9 - 4?',
    answers: [
      { answer: '5', correct: true },
      { answer: '9' },
      { answer: '6' },
      { answer: '1' },
    ],
  },
  {
    question: 'What is 6 / 2?',
    answers: [
      { answer: '12' },
      { answer: '6' },
      { answer: '9' },
      { answer: '3', correct: true },
    ],
  },
];

// variables that will later shuffle the questions array and get the index
let shuffledQuestion, curQuestIndex;

////////////////
const startBtn = document.getElementById('start-btn');
const questsContainer = document.getElementById('questions-container');
const nextBtn = document.getElementById('next-btn');
const questionEl = document.getElementById('question');
const answerBtnsContainer = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('counter');
/////////////////

// functions to remove or add classes
const removeClass = function (el, cls) {
  el.classList.remove(cls);
};

const addClass = function (el, cls) {
  el.classList.add(cls);
};

// a function that resets all the states and remove added classes with each new question
const resetState = function () {
  document.body.className = '';
  addClass(nextBtn, 'hidden');
  while (answerBtnsContainer.firstChild)
    answerBtnsContainer.firstChild.remove();
};

// two functions that will add and remove the needed classes to the answers elements
const setStatusClass = function (el, state) {
  if (state) {
    addClass(el, 'correct');
    removeClass(el, 'wrong');
  } else {
    addClass(el, 'wrong');
    removeClass(el, 'correct');
  }
};

const selectAnswer = function (e) {
  const btn = e.target;
  const { correct } = btn.dataset;

  setStatusClass(document.body, correct);
  setStatusClass(btn, correct);

  if (shuffledQuestion.length > curQuestIndex + 1)
    removeClass(nextBtn, 'hidden');
  else {
    startBtn.textContent = 'Restart';
    removeClass(startBtn, 'hidden');
  }
};

// the function that will start the quiz
const startQuiz = function () {
  removeClass(questsContainer, 'hidden');
  removeClass(nextBtn, 'hidden');
  addClass(startBtn, 'hidden');

  // a way to randomly shuffle an array
  // read more about it here https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540
  shuffledQuestion = questions.sort(() => Math.random() - 0.5);
  curQuestIndex = 0;

  setNextQuestion();
};

// a function that will render new questions on the page
const renderQuestion = function (questionObj) {
  const { question, answers } = questionObj;
  questionEl.textContent = question;

  answers.forEach(answer => {
    const htmlBtn = `<button ${
      answer.correct ? 'data-correct="true"' : ''
    } class="btn answer">${answer.answer}</button>`;

    answerBtnsContainer.insertAdjacentHTML('beforeend', htmlBtn);
  });
};

// a function that will be fired each time nextBtn is clicked
const setNextQuestion = function () {
  resetState();
  renderQuestion(shuffledQuestion[curQuestIndex]);

  counter.textContent = `${curQuestIndex + 1} of ${questions.length} questions`;

  progressBar.style.width = `${(curQuestIndex / questions.length) * 100}%`;
};

// event handlers
startBtn.addEventListener('click', startQuiz);

answerBtnsContainer.addEventListener('click', selectAnswer);

nextBtn.addEventListener('click', function () {
  curQuestIndex++;

  setNextQuestion();
});
