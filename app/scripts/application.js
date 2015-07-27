(function ($, service) {
  'use strict';

  /**
   * Main app module pattern
   *
   * @module App
   * @requires jQuery
   * @requires services
   */
  App.module.application = (function () {

    /**
     * Initialize application
     *
     * @private
     */
    function init() {}

    /**
     * Run init when browser is ready.
     *
     * @private
     */
    $(function () {
      init();
    });

    return {};

  }());

}(jQuery, App.module.service));