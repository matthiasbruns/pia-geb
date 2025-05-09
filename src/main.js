import './style.css'
import piaLogo from '/pia_bg.jpg'
import { setupCountdown } from './countdown.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://heyzine.com/flip-book/c02fe7fc75.html" target="_blank">
      <img src="${piaLogo}" class="logo" alt="Vite logo" />
    </a>
  </div>
  <div id="countdown-container"></div>
`

// Countdown setup
const targetDate = new Date('2025-05-22T12:00:00'); // Set your target date here
const countdownContainer = document.getElementById('countdown-container');
setupCountdown(targetDate, countdownContainer);
