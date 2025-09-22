// Global variables
let globalCounter = 0;
let progressValue = 0;
let isLoading = false;
let isFlipped = false;

/* ----------- Functions ----------- */

// Update Progress Bar
function updateProgressBar(targetPercentage, duration = 800) {
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const startValue = progressValue;
  const increment = (targetPercentage - startValue) / (duration / 16);
  let currentValue = startValue;

  return new Promise((resolve) => {
    const animationTimer = setInterval(() => {
      currentValue += increment;
      if ((increment > 0 && currentValue >= targetPercentage) ||
          (increment < 0 && currentValue <= targetPercentage)) {
        currentValue = targetPercentage;
        clearInterval(animationTimer);
        resolve(currentValue);
      }
      progressBar.style.width = currentValue + '%';
      progressText.textContent = Math.round(currentValue) + '%';
      progressValue = currentValue;
    }, 16);
  });
}

// Random Number
function generateRandomNumber(min, max) {
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomValue;
}

// Animate Element
function animateElement(elementId, animationClass, callback = null) {
  const element = document.getElementById(elementId);
  if (!element) return false;

  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
    if (callback && typeof callback === 'function') callback(element);
  }, 600);
  return true;
}

// Counter Logic
function modifyCounter(operation, value = 1) {
  switch(operation) {
    case 'increment': globalCounter += value; break;
    case 'decrement': globalCounter -= value; break;
    case 'reset': globalCounter = 0; break;
    case 'set': globalCounter = value; break;
    default: return globalCounter;
  }
  document.getElementById('counter').textContent = globalCounter;
  animateElement('counter', 'animate-bounce');
  return globalCounter;
}

/* ----------- UI Interactions ----------- */

function animateProgress() {
  const targetValue = generateRandomNumber(0, 100);
  updateProgressBar(targetValue).then((finalValue) => {
    if (finalValue === 100) showNotification('🎉 Task Complete!');
  });
}

function toggleLoading() {
  const spinner = document.getElementById('spinner');
  const statusText = document.getElementById('loadingStatus');
  isLoading = !isLoading;

  if (isLoading) {
    spinner.style.display = 'block';
    statusText.textContent = 'Loading...';
    spinner.classList.add('fade-in');

    const loadTime = generateRandomNumber(2000, 5000);
    setTimeout(() => { if (isLoading) toggleLoading(); }, loadTime);
  } else {
    spinner.style.display = 'none';
    statusText.textContent = 'Complete';
    setTimeout(() => { statusText.textContent = 'Ready'; }, 2000);
  }
}

function flipCard() {
  const card = document.getElementById('flipCard');
  isFlipped = !isFlipped;
  if (isFlipped) card.classList.add('flipped');
  else card.classList.remove('flipped');
  return isFlipped;
}

// Counter buttons
function incrementCounter() { return modifyCounter('increment'); }
function decrementCounter() { return modifyCounter('decrement'); }
function resetCounter() { return modifyCounter('reset'); }

// Modal
function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('show'), 10);
}
function hideModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 300);
}

// Animate all
function animateAllCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => animateElement(card.id, 'animate-bounce'));
}