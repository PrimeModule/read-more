/**
 * @author PrimeModule
 * @required jQuery
 */
(function($) {
  /**
   * @description ReadMore plugin instance
   * @param {Array.<HTMLElement>} $element
   * @param {Array.<Array.<HTMLElement>>} triggers
   */
  var ReadMore = function(element, triggers) {
    /**
     * @type {Array.<HTMLElement>}
     */
    this.$root = $(element);

    /**
     * @type {Array.<Array.<HTMLElement>>}
     */
    this.triggers = triggers;

    this.setup();
    this._bindEvents();
  };

  /**
   * @description Setup plugin - push inline triggers to triggers array.
   */
  ReadMore.prototype.setup = function() {
    var $parentRoot, $inlineTriggers;

    this.$root.hide(); // Hide content

    $parentRoot = this.$root.parent('.js-read-more');
    $parentRoot = $parentRoot.length > 0 ? $parentRoot : null;

    if (!!$parentRoot) {
      $inlineTriggers = $parentRoot.find('.js-read-more-trigger');

      if ($inlineTriggers.length > 0) {
        this.triggers.push($inlineTriggers);
      }
    }
  };

  /**
   * @description Bind plugin events to each of triggers
   */
  ReadMore.prototype._bindEvents = function() {
    $(this.triggers).each(function(index, $trigger) {
      $trigger.on('click', this._onTriggerClick.bind(this));
    }.bind(this));
  };

  /**
   * @description On click event handler
   */
  ReadMore.prototype._onTriggerClick = function(evt) {
    evt.preventDefault();

    var $currentTarget, action;

    $currentTarget = $(evt.currentTarget);

    action = $currentTarget.data('rm-action');
    action = !!action ? action : 'toggle';

    switch (action) {
    case 'toggle':
      $currentTarget.toggleClass('read-more--active');
      this.$root.slideToggle();
      break;
    case 'open':
      $currentTarget.addClass('read-more--active');
      this.$root.slideDown();
      break;
    case 'close':
      $currentTarget.removeClass('read-more--active');
      this.$root.slideUp();
      break;
    }
  };

  /**
   * @description Adding readMore as jQuery plugin
   */
  $.fn.readMore = function() {
    /**
     * @type {Array.<HTMLElement>}
     */
    var $triggers = $('.js-read-more-trigger');

    /**
     * @type {Array.<HTMLElement>}
     */
    var filteredTriggers = [];

    return this.each(function(index, element) {
      filteredTriggers = $.fn.readMore.filterTriggers(element, $triggers);

      new ReadMore(element, filteredTriggers);

      filteredTriggers.length = 0;
    });
  };

  /**
   * @description Return array with triggers which matched element id
   * @return {Array.<Array.<HTMLElement>>}
   */
  $.fn.readMore.filterTriggers = function(element, $triggers) {
    var elementId = $(element).attr('id');
    var filteredTriggers = [];

    if (!!elementId) {
      $triggers.each(function(index, trigger) {
        var $trigger, dataLink, hrefLink, joinLink;

        $trigger = $(trigger);

        dataLink = $trigger.attr('href');
        hrefLink = $trigger.data('rm-link');

        dataLink = !!dataLink ? dataLink.replace('#', '') : null;
        hrefLink = !!hrefLink ? hrefLink.replace('#', '') : null;

        joinLink = dataLink || hrefLink; // data-link priority

        if (!!joinLink && joinLink === elementId) {
          filteredTriggers.push($trigger);
        }
      });
    }

    return filteredTriggers;
  };
})(jQuery);
