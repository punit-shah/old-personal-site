import $ from 'jquery';

const $error = $('.error img');
const $bubble = $('.error__bubble');

function dontTouchMe() {
  $bubble
    .fadeIn(250)
    .delay(500)
    .fadeOut(250);
}

export default function error() {
  $error.on('click', dontTouchMe);
}
