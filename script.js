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
    question: 'Will Sohad do great tomorrow?',
    answers: [
      { answer: 'Yes', correct: true },
      { answer: 'No' },
      { answer: 'Of course', correct: true },
      { answer: 'Definitely', correct: true },
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
    question: 'Will tomorrow be a great day for Sohad?',
    answers: [
      { answer: 'Absolutely', correct: true },
      { answer: 'What!' },
      { answer: 'Maybe' },
      { answer: 'No question about it', correct: true },
    ],
  },
];

let shuffledQuestion, curQuestIndex;

const startBtn = document.getElementById('start-btn');
const questsContainer = document.getElementById('questions-container');
const nextBtn = document.getElementById('next-btn');
const questionEl = document.getElementById('question');
const answerBtnsContainer = document.getElementById('answers');
const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('counter');

const showElement = function (el) {
  el.classList.remove('hidden');
};

const resetState = function () {
  document.body.className = '';
  nextBtn.classList.add('hidden');
  while (answerBtnsContainer.firstChild)
    answerBtnsContainer.firstChild.remove();
};

const startQuiz = function () {
  showElement(questsContainer);
  showElement(nextBtn);
  startBtn.classList.add('hidden');

  shuffledQuestion = questions.sort(() => Math.random() - 0.5);
  curQuestIndex = 0;

  setNextQuestion();
};

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

const setNextQuestion = function () {
  resetState();
  renderQuestion(shuffledQuestion[curQuestIndex]);

  counter.textContent = `${curQuestIndex + 1} of ${questions.length} questions`;

  progressBar.style.width = `${(curQuestIndex / questions.length) * 100}%`;
};

const setStatusClass = function (el, state) {
  if (state) el.className = 'correct';
  else el.className = 'wrong';
};

const selectAnswer = function (e) {
  const btn = e.target;
  const { correct } = btn.dataset;

  setStatusClass(document.body, correct);

  if (shuffledQuestion.length > curQuestIndex + 1) showElement(nextBtn);
  else {
    startBtn.textContent = 'Restart';
    showElement(startBtn);
  }
};

startBtn.addEventListener('click', startQuiz);

answerBtnsContainer.addEventListener('click', selectAnswer);

nextBtn.addEventListener('click', function () {
  curQuestIndex++;

  setNextQuestion();
});
