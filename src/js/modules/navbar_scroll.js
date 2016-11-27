import $ from 'jquery';

const $navbar = $('.navbar');
const $navLinks = $('.logo, .navbar__link');
const $navSections = $navLinks.map(function () {
  const $section = getSectionFromNavLink($(this));
  if ($section.length) {
    return $section;
  }
});

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

function onNavLinkClick(e) {
  const $section = getSectionFromNavLink($(this));

  if ($section.length) {
    scrollToElement($section);
  }
  e.preventDefault();
}

function onWindowScroll() {
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

export default function navbarScroll() {
  $navLinks.on('click', onNavLinkClick);
  $(window).on('scroll', onWindowScroll);
}

