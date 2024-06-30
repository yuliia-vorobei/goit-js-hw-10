import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let userSelectedDate;
let intervalId = null;
startButton.disabled = true;

// start button plus updating of spans//
startButton.addEventListener('click', clickHandler);
function clickHandler(event) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  startButton.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimerFields({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      input.disabled = false;
      return;
    }
    const timeComponents = convertMs(timeDifference);
    updateTimerFields(timeComponents);
  }, 1000);
}
// library options //
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates.length > 0) {
      const date = new Date();
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= date) {
        iziToast.show({
          message: 'Please choose a date in the future',
          color: 'red',
          messageColor: 'white',
          position: 'topRight',
          timeout: false,
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    }
  },
};

const inputLibrary = flatpickr('#datetime-picker', options);

// given function for counting //
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTimerFields({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
