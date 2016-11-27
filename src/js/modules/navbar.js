import $ from 'jquery';

const $navbar = $('.navbar');
const $nav = $('.navbar__nav');
const $toggler = $('.navbar__toggler');
const $navLinks = $('.logo, .navbar__link');
const $navSections = $navLinks.map(function () {
  const $section = getSectionFromNavLink($(this));
  if ($section.length) {
    return $section;
  }
});

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

function getSectionFromNavLink($navLink) {
  const navLinkHref = $navLink.attr('href');
  const $section = (navLinkHref === '#') ? $('#cover') : $(navLinkHref);
  return $section;
}

function scrollToElement($element) {
  const scrollTop = $element.offset().top;
  $('html, body').stop().animate({
    scrollTop: scrollTop
  }, 300);
}

function handleNavLinkClick(e) {
  const $section = getSectionFromNavLink($(this));

  collapseNav();
  if ($section.length) {
    scrollToElement($section);
  }
  e.preventDefault();
}

function onScroll() {
  const windowScrollTop = $(this).scrollTop() + $navbar.outerHeight();
  const scrolledSections = $navSections.map(function () {
    if ($(this).offset().top < windowScrollTop) {
      return this;
    }
  });
  const $currentSection = scrolledSections[scrolledSections.length - 1];

  $navLinks
    .removeClass('active')
    .filter(`[href="#${$currentSection.attr('id')}"]`)
    .addClass('active');
}

export default function navbar(isFixed = false) {
  if (isFixed) {
    $navbar.addClass('navbar--fixed');
  }
  $toggler.on('click', toggleNav);
  $navLinks.on('click', handleNavLinkClick);
  $(window).on('scroll', onScroll);
}
