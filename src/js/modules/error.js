import $ from 'jquery';

const $error = $('.error img');
const $bubble = $('.error__bubble');

function getMessage() {
  const errorMessages = [
    '01001000010000010100100001000001',
    'you need more ram',
    'please do not touch me',
    'lets make program',
    'someone has stolen my trees',
    'your trousers are on fire',
    function time() {
      return `the time is ${Date.now()} and i am magic`;
    },
  ];

  const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
  if ($.isFunction(msg)) {
    return msg();
  } else {
    return msg;
  }
}

function showBubble() {
  $bubble
    .hide()
    .text(getMessage())
    .fadeIn(250)
    .delay(500)
    .fadeOut(250);
}

export default function error() {
  $error.on('click', showBubble);
}
