//тогглер сайдбара
$(document).on('click', '.js-sidebar-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
    $('body').addClass('is-overflow');
  } else {
    $(this).removeClass('is-active');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#burger_icon');
    $('body').removeClass('is-overflow');
  }
  $('.page__sidebar').toggleClass('is-open');
  return false;
});


//тогглер размера сайдбара
$(document).on('click', '.js-sidebar-resizer', function () {
  $(this).toggleClass('is-active');
  $('.page').toggleClass('sidebar-collapsed');
  return false;
});

//тогглер размера сайдбара
$(document).on('click', '.js-objects-menu-toggler', function () {
  $(this).toggleClass('is-active');
  $('.objects-menu__wrapper').toggleClass('is-open');
  return false;
});

//меню объектов
var wrap = document.querySelector(".objects-menu__wrapper");
var list = document.querySelector(".objects-menu__list");

wrap.setAttribute("data-overflowing", determineOverflow(list, wrap));

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  wrap.setAttribute("data-overflowing", determineOverflow(list, wrap));
}

wrap.addEventListener("scroll", function() {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });
  }
  ticking = true;
});

function determineOverflow(content, container) {
  var containerMetrics = container.getBoundingClientRect();
  var containerMetricsRight = Math.floor(containerMetrics.right);
  var containerMetricsLeft = Math.floor(containerMetrics.left);
  var contentMetrics = content.getBoundingClientRect();
  var contentMetricsRight = Math.floor(contentMetrics.right);
  var contentMetricsLeft = Math.floor(contentMetrics.left);
  if (containerMetricsLeft > contentMetricsLeft && containerMetricsRight < contentMetricsRight) {
    return "both";
  } else if (contentMetricsLeft < containerMetricsLeft) {
    return "left";
  } else if (contentMetricsRight > containerMetricsRight) {
    return "right";
  } else {
    return "none";
  }
}

const scrollContainer = document.querySelector(".js-horizontal-scroll");

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});

let mouseDown = false;
let startX, scrollLeft;
const slider = document.querySelector('.js-horizontal-scroll');

const startDragging = (e) => {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
}

const stopDragging = (e) => {
  slider.classList.remove("is-dragging");
  mouseDown = false;
}

const move = (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
  slider.classList.add("is-dragging");
}

slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

//псевдо селект
$(document).on('click', '.js-pseudo-select-toggler', function () {
  $(this).closest('.pseudo-select').toggleClass('is-open');
  return false
});

$(document).on('click', '.pseudo-select__item', function () {
  $(this).closest('.pseudo-select').find('.pseudo-select__item').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).closest('.pseudo-select').find('.pseudo-select__value span').text($(this).text());
  return false
});
