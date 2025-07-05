const easyTexts = [
  'The cat sat on the warm window ledge, watching the birds fly by. It blinked slowly and stretched its paws, enjoying the quiet afternoon with no sound but the wind.',
  'John likes to ride his bike to the park. He plays with his friends, eats snacks, and laughs a lot. When the sun sets, he rides back home feeling happy.',
  'The dog barked loudly at the mailman. Mom told it to sit and stay quiet. It wagged its tail and sat on the porch while watching cars pass by the house.',
  'I went to the market with my sister. We bought bread, fruit, and some candy. After shopping, we sat on a bench and shared stories while eating fresh mango slices.',
  'Every morning, I drink water and read a book. The birds chirp outside my window. It’s a peaceful start before I start my homework and prepare for school later.',
];

const mediumTexts = [
  'Typing every day helps you become faster and more confident. Over time, your hands move without thinking, and you make fewer mistakes. Consistency is the key to building skill, even when progress feels slow at first.',
  'The power went out during the storm, so we lit candles and told funny stories. It felt like a small adventure. No phones, no noise just laughter, snacks, and everyone together in one room like old times.',
  'School can sometimes feel stressful, but taking breaks helps. A short walk, a glass of water, or even deep breaths can make a difference. When your mind feels calm, it’s easier to learn and stay focused on your goals.',
  'My father tells stories about his childhood in the village. They didn’t have phones or electricity, but they were happy. They played with friends outside, helped on the farm, and ate fresh food every single day.',
  'Learning a new language takes time and practice. You might forget words or mix things up, but that’s okay. The more you listen, speak, and read, the easier it becomes. Mistakes are just part of getting better.',
];

const hardTexts = [
  "Building good habits is not about sudden motivation it's about showing up, even when you don't feel like it. Whether it's typing practice, reading a book, or learning something new, progress comes through repetition and patience. Small daily actions lead to lasting change, and success is built on these quiet efforts over time.",
  'The internet has revolutionized how we learn, communicate, and work. From free online courses to instant video calls across the world, we are more connected than ever. But with that power comes the need for responsibility to use it wisely, to avoid distractions, and to protect our time and attention from being drained by constant noise.',
  'Self-discipline is the ability to do what you should do even when you don’t want to. It’s not about feeling motivated every day, but about building systems that help you follow through. People who succeed often struggle too they just don’t let their feelings decide their actions all the time.',
  'Technology is growing fast. In just ten years, we’ve seen huge changes from smartphones to smart homes, from cash payments to instant transfers. As tools improve, we must also improve our ability to adapt and learn. Those who resist change often get left behind, while those who learn stay ready for anything.',
  'Confidence doesn’t come from being perfect it comes from knowing you can handle imperfection. When you speak, code, or try something new, mistakes might happen. But each attempt makes you better. Growth only happens when you keep showing up, even if things feel hard or uncomfortable in the moment.',
];

/* eslint-disable no-plusplus */
const startBtn = document.getElementById('start-btn');
const timeSelected = document.getElementById('select-time');
const levelSelected = document.getElementById('select-difficulty');
const startScreenEle = document.getElementById('start-screen');
const typeScreenEle = document.getElementById('typing-screen');
const timeCountEle = document.getElementById('time-count');
const wpmCountEle = document.getElementById('wpm-count');
const resultScreenEle = document.getElementById('result-screen');
const sentenceContainer = document.getElementById('main-sentence');
const input = document.querySelector('input');
const wordTypedEle = document.querySelector('#word-type span');
const mistakesEle = document.querySelector('#mistake-count span');
const timeSpentEle = document.querySelector('#time-spent span');
const wpmResultEle = document.querySelector('.wpm-result');
const correctWordEle = document.querySelector('#correct-word span');
const mistakeResultEle = document.querySelector('#mistake-result span');
const totalWordEle = document.querySelector('#total-word span');
const totalWordTypeEle = document.querySelector('#total-word-typed span');
const accuracyEle = document.querySelector('#accuracy span');

let currentWord = 0;
let isTyping = false;
let doneTyping = false;
let mistake = 0;
// get Random word Paragraph

function getRandomParagraph() {
  const random = Math.floor(Math.random() * 5);
  switch (levelSelected.value) {
    case 'easy':
      return easyTexts[random];
    case 'Medium':
      return mediumTexts[random];
    default:
      return hardTexts[random];
  }
}

function displayWord() {
  const sentence = getRandomParagraph();

  const word = sentence
    .split(' ')
    .map((item) => `<span class = 'word'>${item}</span>`)
    .join(' ');

  sentenceContainer.innerHTML = word;
}

function handleCurrentWordStates() {
  const word = document.querySelectorAll('.word');
  word.forEach((item) => item.classList.remove('current'));
  word[currentWord].classList.add('current');
  input.maxLength = word[currentWord].textContent.length;
}

// check work if its right or wrong

function checkWord() {
  const previousWord = document.querySelector('.current');
  if (previousWord.textContent.toLowerCase() === input.value) {
    previousWord.classList.add('correct');
  } else {
    previousWord.classList.add('wrong');
    mistake++;
  }
}

// display result
function displayResult() {
  const timeRemain = timeCountEle.textContent.replace('s', '');
  const accuracy = ((currentWord - mistake) / currentWord) * 100;

  timeSpentEle.textContent = `${+timeSelected.value - +timeRemain} seconds`;
  wpmResultEle.textContent = wpmCountEle.textContent;
  correctWordEle.textContent = currentWord - mistake;
  mistakeResultEle.textContent = mistake;
  totalWordTypeEle.textContent = currentWord;
  totalWordEle.textContent = sentenceContainer.children.length;
  accuracyEle.textContent = `${accuracy.toFixed(1)}%`;
}

// move to next word

function moveToNextWord() {
  currentWord++;
  checkWord();
  if (currentWord >= sentenceContainer.children.length) {
    displayResult();
    doneTyping = true;
    typeScreenEle.classList.remove('active');
    resultScreenEle.classList.add('active');
  } else {
    input.value = '';
    handleCurrentWordStates();
    wordTypedEle.textContent = currentWord;
    mistakesEle.textContent = mistake;
  }
}

// calculate word per mins

function wordPerMins(time) {
  return Math.round((currentWord * 60) / time);
}

// timer countdown
function countDown(time, onComplete) {
  let count = time - 1;
  return () => {
    const timeCount = setInterval(() => {
      if (count < 0 || doneTyping) {
        clearInterval(timeCount);
        if (onComplete) onComplete();
      }
      if (count < 15) timeCountEle.style.color = 'red';
      else timeCountEle.style.color = '#088b60';

      timeCountEle.textContent = `${count}s`;
      wpmCountEle.textContent = wordPerMins(+timeSelected.value - count);
      count--;
    }, 1000);
  };
}

// start typing timer start countdown
function startTyping() {
  const timer = countDown(+timeSelected.value, () => {
    typeScreenEle.classList.remove('active');
    resultScreenEle.classList.add('active');
    displayResult();
  });

  timer();
}

// eventListeners

startBtn.addEventListener('click', () => {
  startScreenEle.classList.remove('active');
  typeScreenEle.classList.add('active');
  timeCountEle.textContent = `${timeSelected.value}s`;
  input.focus();
  displayWord();
  handleCurrentWordStates();
  wordTypedEle.textContent = currentWord;
  mistakesEle.textContent = mistake;
});

input.addEventListener('keydown', (e) => {
  const alphabet = [];
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }

  if (!input.value && !alphabet.includes(e.key.toLowerCase()))
    e.preventDefault();
  else if (input.value && e.key === ' ') {
    e.preventDefault();
    moveToNextWord();
  } else if (!isTyping) {
    startTyping();
    isTyping = true;
    input.placeholder = '';
  }
});
input.addEventListener('paste', (e) => {
  e.preventDefault();
});

input.addEventListener('input', () => {});
