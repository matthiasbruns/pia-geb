import confetti from 'canvas-confetti';

// Countdown component
export function setupCountdown(targetDate, container) {
  const countdownText = document.createElement('div');
  countdownText.id = 'countdown-text';
  countdownText.style.margin = '1em 0';
  countdownText.style.fontSize = '1.2em';
  countdownText.style.whiteSpace = 'pre-line';
  container.appendChild(countdownText);

  const actionButton = document.createElement('button');
  actionButton.textContent = 'Überaschung ansehen';
  actionButton.style.display = 'none'; // Keep this as it's for conditional display
  // Removed inline styles to use global button style from style.css
  actionButton.addEventListener('click', () => {
    window.open('https://heyzine.com/flip-book/03112e6c92.html', '_blank');
  });
  container.appendChild(actionButton);

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      countdownText.innerHTML = `<strong>Countdown bis:</strong> ${targetDate.toLocaleString('de-DE')}<br><span style='font-size:1.5em;'>${days} Tage, ${hours} Stunden, ${minutes} Minuten, ${seconds} Sekunden</span><br>Bitte habe noch etwas Geduld. ♥️`;
      actionButton.style.display = 'none';
    } else {
      countdownText.innerHTML = `<strong>Das Datum ist erreicht!</strong> (${targetDate.toLocaleString('de-DE')})`;
      actionButton.style.display = 'inline-block';
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
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
