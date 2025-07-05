const startBtn = document.getElementById('start-btn');
const timeSelected = document.getElementById('select-time');
const levelSelected = document.getElementById('select-difficulty');
const startScreenEle = document.getElementById('start-screen');
const typeScreenEle = document.getElementById('typing-screen');
// const resultScreenEle = document.getElementById('result-screen');

// eventListeners

startBtn.addEventListener('click', () => {
  startScreenEle.classList.remove('active');
  typeScreenEle.classList.add('active');
  console.log(timeSelected.value, levelSelected.value);
});
