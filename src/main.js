import './style.css'
import piaLogo from '/pia_bg.png'
import { setupCountdown } from './countdown.js'

document.querySelector('#app').innerHTML = `
  <div>
    <img src="${piaLogo}" class="logo" alt="Pia logo" />
  </div>
  <div id="countdown-container"></div>
`

// Countdown setup
const targetDate = new Date('2025-05-22T12:00:00'); // Set your target date here
const countdownContainer = document.getElementById('countdown-container');
setupCountdown(targetDate, countdownContainer);
