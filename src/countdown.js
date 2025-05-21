import confetti from 'canvas-confetti';

let countdownTextElement;
let actionButtonElement;
let currentTargetDate;
let countdownIntervalId = null; // To store the interval ID
let isExpired = false; // Flag to track if countdown has expired

// Handles the countdown expiration logic
export function handleExpiration(targetDate) {
  if (!countdownTextElement || !actionButtonElement) {
    console.error('Countdown elements not initialized. Call setupCountdown first.');
    return;
  }
  isExpired = true; // Set the flag
  if (countdownIntervalId) {
    clearInterval(countdownIntervalId); // Clear the interval
    countdownIntervalId = null;
  }
  countdownTextElement.innerHTML = `<strong>Das Datum ist erreicht!</strong> (${targetDate.toLocaleString('de-DE')})`;
  actionButtonElement.style.display = 'inline-block';
  // Add confetti and fireworks effect here
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Fireworks effect
  const end = Date.now() + (5 * 1000);

  // go Buckeyes!
  const colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// Countdown component
export function setupCountdown(targetDate, container) {
  currentTargetDate = targetDate;
  isExpired = false; // Reset expiration state on new setup
  if (countdownIntervalId) { // Clear any existing interval
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
  countdownTextElement = document.createElement('div');
  countdownTextElement.id = 'countdown-text';
  countdownTextElement.style.margin = '1em 0';
  countdownTextElement.style.fontSize = '1.2em';
  countdownTextElement.style.whiteSpace = 'pre-line';
  container.appendChild(countdownTextElement);

  actionButtonElement = document.createElement('button');
  actionButtonElement.textContent = 'Überaschung ansehen';
  actionButtonElement.style.display = 'none'; // Keep this as it's for conditional display
  // Removed inline styles to use global button style from style.css
  actionButtonElement.addEventListener('click', () => {
    window.open('https://heyzine.com/flip-book/03112e6c92.html', '_blank');
  });
  container.appendChild(actionButtonElement);

  function updateCountdown() {
    if (isExpired) { // If already expired (e.g., by triggerExpiration), do nothing
      return;
    }
    const now = new Date();
    const diff = currentTargetDate - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      countdownTextElement.innerHTML = `<strong>Countdown bis:</strong> ${currentTargetDate.toLocaleString('de-DE')}<br><span style='font-size:1.5em;'>${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden</span><br>Bitte habe noch etwas Geduld. ♥️`;
      actionButtonElement.style.display = 'none';
    } else {
      handleExpiration(currentTargetDate); // This will also clear the interval
    }
  }

  updateCountdown();
  countdownIntervalId = setInterval(updateCountdown, 1000); // Store interval ID
}

// Function to externally trigger the expiration
export function triggerExpiration() {
  if (currentTargetDate) {
    handleExpiration(currentTargetDate);
  } else {
    console.error('Target date not set. Call setupCountdown first.');
  }
}
