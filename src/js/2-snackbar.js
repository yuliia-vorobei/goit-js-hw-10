import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const buttonFulfilled = document.querySelector('input[value="fulfilled"]');
const buttonRejected = document.querySelector('input[value="rejected"]');
const inputDelay = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');
let delay = 0;
let isFulfilled = false;

buttonFulfilled.addEventListener('click', fulfilledHandler);
function fulfilledHandler() {
  isFulfilled = true;
}

buttonRejected.addEventListener('click', rejectedHandler);
function rejectedHandler() {
  isFulfilled = false;
}

inputDelay.addEventListener('input', inputHandler);
function inputHandler(event) {
  delay = parseInt(event.target.value);
}

form.addEventListener('submit', submitHandler);
function submitHandler(event) {
  event.preventDefault();
  setTimeout(() => {
    createPromise()
      .then(resolve =>
        console.log(
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            color: 'green',
            messageColor: 'white',
            position: 'topRight',
            timeout: false,
          })
        )
      )
      .catch(reject =>
        console.log(
          iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            color: 'red',
            messageColor: 'white',
            position: 'topRight',
            timeout: false,
          })
        )
      );
  }, delay);
  form.reset();
}

function createPromise() {
  return new Promise((resolve, reject) => {
    if (isFulfilled) {
      resolve(`✅ Fulfilled promise in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise in ${delay}ms`);
    }
  });
}
