/**
 * @author PrimeModule
 * @required jQuery
 */
(function($) {
  /**
   * @description ReadMore plugin instance
   * @param {<HTMLElement>} element
   */
  var ReadMore = function(element) {
    /**
     * @type {Array.<HTMLElement>}
     */
    this.$element = $(element);

    /**
     * @type {Array.<HTMLElement>}
     */
    this.$trigger = this.$element.find('.js-read-more-trigger');

    /**
     * @type {Array.<HTMLElement>}
     */
    this.$content = this.$element.find('.js-read-more-content');

    this._bindEvents();
  };

  /**
   * @description Bind plugin events
   */
  ReadMore.prototype._bindEvents = function() {
    this.$trigger.on('click', this._onClick.bind(this));
  };

  /**
   * @description Handle on trigger click event
   */
  ReadMore.prototype._onClick = function(evt) {
    evt.preventDefault();

    this.$element.toggleClass('read-more--active');
    this.$content.slideToggle();
  };

  /**
   * @description Adding readMore as jQuery plugin
   */
  $.fn.readMore = function() {
    this.each(function(index, element) {
      new ReadMore(element);
    });
  };
})(jQuery);
