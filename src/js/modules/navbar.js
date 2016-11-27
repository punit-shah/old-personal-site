import $ from 'jquery';

const $navbar = $('.navbar');
const $nav = $('.navbar__nav');
const $toggler = $('.navbar__toggler');
const $navLinks = $('.navbar__link');
const $logo = $('.logo');

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

function scroll(elementId) {
  const scrollTop = elementId ? $(elementId).offset().top : 0;
  $('html, body').animate({
    scrollTop: scrollTop
  }, 300);
}

function scrollToTop() {
  scroll();
}

function handleNavLinkClick(e) {
  collapseNav();
  scroll($(e.target).attr('href'));
}

export default function navbar(isFixed = false) {
  if (isFixed) {
    $navbar.addClass('navbar--fixed');
  }
  $toggler.on('click', toggleNav);
  $navLinks.on('click', handleNavLinkClick);
  $logo.on('click', scrollToTop);
}
