//тогглер сайдбара
$(document).on('click', '.js-sidebar-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
  } else {
    $(this).removeClass('is-active');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#burger_icon');
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
