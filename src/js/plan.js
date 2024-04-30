function addSeparatorsNF(nStr, inD, outD, sep) {
  nStr += '';
  var dpos = nStr.indexOf(inD);
  var nStrEnd = '';
  if (dpos != -1) {
    nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
    nStr = nStr.substring(0, dpos);
  }
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + sep + '$2');
  }
  return nStr + nStrEnd;
}

function tooltipConstructor(key) {
  var $this = $('polygon[data-key="' + key + '"]'),
    tipString = '';

  tipString = tipString +
    '<div class="plan__tooltip-inner"><div class="plan__tooltip-title">' + $this.data('title') + '</div>' +
    '<div class="plan__tooltip-status text-status_2 '+ $this.data('status') +'"><div class="status-icon"></div> ' + $this.data('status-text') + '</div>' +
    '<div class="plan__tooltip-props"><div class="plan__tooltip-prop"><div class="plan__tooltip-prop-title">Площадь</div> ' + $this.data('square') + ' м2</div>' +
    '<div class="plan__tooltip-prop"><div class="plan__tooltip-prop-title">Стоимость м2</div> ' + addSeparatorsNF($this.data('price'), ' ', ' ', ' ') + ' ₽</div>' +
    '<div class="plan__tooltip-prop"><div class="plan__tooltip-prop-title">Стоимость аренды</div> ' + addSeparatorsNF($this.data('cost'), ' ', ' ', ' ') + ' ₽/мес.</div></div>' +
    '<a class="button button--type_1" href="'+ $this.data('href') +'">Подробнее</a></div>';

  return tipString;
}

var tooltip = $('.js-tooltip');

$(document).on('click', '.plan', function(evt) {
    if ($('polygon').is(evt.target)) {
      $('polygon').removeClass('is-active');
      $(evt.target).addClass('is-active');
      tooltip.html('').hide();
      tooltip.html(tooltipConstructor(evt.target.dataset.key));
      tooltip.show();
      return false
    } else if ($('.js-tooltip *').is(evt.target)) {

    } else {
      $('polygon').removeClass('is-active');
      tooltip.html('').hide();
      return false
    }
});
