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
  $('.page__sidebar').toggleClass('is-collapse');
  return false;
});
