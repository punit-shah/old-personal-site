import $ from 'jquery';

const $navbar = $('.navbar');
const $nav = $('.navbar__nav');
const $toggler = $('.navbar__toggler');
const $navLinks = $('.logo, .navbar__link');

function collapseNav() {
  $nav.removeClass('navbar__nav--expanded');
  $toggler.attr('aria-expanded', 'false');
}

function expandNav() {
  $nav.addClass('navbar__nav--expanded');
  $toggler.attr('aria-expanded', 'true');
}

function toggleNav() {
  if ($toggler.attr('aria-expanded') === 'true') {
    collapseNav();
  } else {
    expandNav();
  }
}

export default function navbar(isFixed = false) {
  if (isFixed) {
    $navbar.addClass('navbar--fixed');
  }
  $toggler.on('click', toggleNav);
  $navLinks.on('click', collapseNav);
}
