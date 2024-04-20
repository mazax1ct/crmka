$(document).ready(function () {
  //кастомный селект
  $('.js-select').each(function() {
    var $p = $(this).closest('.select-wrapper');
    $(this).select2({
      minimumResultsForSearch: Infinity,
      dropdownPosition: 'below',
      dropdownParent: $p
    });
	}).on("select2:open", function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.addClass('open');
	}).on("select2:close", function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.removeClass('open');
	});
});

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
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).attr('title', 'Увеличить');
    $('.page').addClass('sidebar-collapsed');
  } else {
    $(this).removeClass('is-active');
    $(this).attr('title', 'Уменьшить');
    $('.page').removeClass('sidebar-collapsed');
  }
  return false;
});

//тогглер блока пользователя
$(document).on('click', '.js-user-profile-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $('.user-profile__dropdown').fadeIn();
  } else {
    $(this).removeClass('is-active');
    $('.user-profile__dropdown').fadeOut();
  }
  return false;
});

//тогглер сабменю
$(document).on('click', '.js-submenu-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).attr('title', 'Закрыть меню');
    $(this).closest('.main-menu__item').find('.main-menu__submenu').slideDown();
  } else {
    $(this).removeClass('is-active');
    $(this).attr('title', 'Открыть меню');
    $(this).closest('.main-menu__item').find('.main-menu__submenu').slideUp();
  }
  return false;
});

//тогглер меню объектов
$(document).on('click', '.js-objects-menu-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).text('Сверуть список');
    $('.objects-menu__wrapper').addClass('is-open');
  } else {
    $(this).removeClass('is-active');
    $(this).text('Развернуть список');
    $('.objects-menu__wrapper').removeClass('is-open');
  }
  return false;
});

//меню объектов
if($('.objects-menu__wrapper').length) {
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
}

//псевдо селект
$(document).on('click', '.js-pseudo-select-toggler', function () {
  $(this).closest('.pseudo-select').toggleClass('is-open');
  return false
});

$(document).on('click', '.pseudo-select__item', function () {
  $(this).closest('.pseudo-select').find('.pseudo-select__item').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).closest('.pseudo-select').find('.pseudo-select__value span').text($(this).text());
  $(this).closest('.pseudo-select').removeClass('is-open');
  return false
});

//timepicker
$(document).on('focus', '.js-time-picker input', function () {
  $('.time-picker').removeClass('is-open');
  $(this).closest('.time-picker').addClass('is-open');
  document.addEventListener('click', closeTimePiker);
});

function closeTimePiker(evt) {
  if (!$('.time-picker.is-open').is(evt.target) && $('.time-picker.is-open').has(evt.target).length === 0) {
    $('.time-picker').removeClass('is-open');
    document.removeEventListener('click', closeTimePiker);
	}
}

$(document).on('click', '.time-picker__item', function () {
  $(this).closest('.time-picker').find('.time-picker__item').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).closest('.time-picker').find('.time-picker__input').val($(this).text());
  $(this).closest('.time-picker').removeClass('is-open');
  document.removeEventListener('click', closeTimePiker);
});

//datepicker
document.querySelectorAll(".js-datepicker").forEach((button) => {
  button.addEventListener("click", (event) => {
    const input = event.srcElement.previousElementSibling;
    try {
      input.showPicker();
    } catch (error) {
      window.alert(error);
    }
  });
});

//множественный тогглер чекбоксов
$(document).on('click', '.js-select-all', function () {
  $(this).closest('table').find('input[type="checkbox"][data-checkbox="'+$(this).attr('data-checkbox')+'"]').prop('checked', this.checked);
});
