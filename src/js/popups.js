$(document).on('click', '#js-show-new-object', function () {
  $('#js-new-object').show();
  return false;
});

$(document).on('click', '#js-hide-new-object', function () {
  $('#js-new-object').hide();
  return false;
});

$(document).on('click', '#js-show-new-object-step-2', function () {
  $('#js-new-object-step-1').hide();
  $('#js-new-object-step-2').show();
  return false;
});

$(document).on('click', '#js-show-new-object-step-1', function () {
  $('#js-new-object-step-2').hide();
  $('#js-new-object-step-1').show();
  return false;
});

$(document).on('click', '.js-popup-accordion-toggler', function () {
  $(this).toggleClass('is-active');
  $(this).closest('.popup-accordion').find('.popup-accordion__body').slideToggle();
  return false;
});

$(document).on('click', '.js-popup-close', function () {
  $.fancybox.close();
  return false
});

$(document).on('click', '#js-show-add-tenant-step-2', function () {
  $('#add-tenant-step-1').hide();
  $('#add-tenant-step-2').show();
  return false;
});

$(document).on('click', '#js-show-add-tenant-step-2', function () {
  $('#add-tenant-step-1').hide();
  $('#add-tenant-step-2').show();
  return false;
});
