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

// timer countdown
function countDown(time, onComplete) {
  let count = time;
  return () => {
    const timeCount = setInterval(() => {
      if (count < 15) timeCountEle.style.color = 'red';
      else timeCountEle.style.color = '#088b60';

      timeCountEle.textContent = `${count}s`;
      count--;
      if (count < 0) {
        clearInterval(timeCount);
        if (onComplete) onComplete();
      }
    }, 1000);
  };
}

const timer = countDown(+timeSelected.value, () => {
  typeScreenEle.classList.remove('active');
  resultScreenEle.classList.add('active');
});

// eventListeners

startBtn.addEventListener('click', () => {
  startScreenEle.classList.remove('active');
  typeScreenEle.classList.add('active');
  timeCountEle.textContent = `${timeSelected.value}s`;
  displayWord();
});
