/* ==========================================================================
   Breakpoint events
   ========================================================================== */

+function ($) {
  'use strict';

  // Variables
  // ======================

  //todo: fill these in at compile time?
  var breakpoints = {
    'screen-lg': 1200,
    'screen-md': 992,
    'screen-sm': 768,
    'screen-xs': 0
  }

  // Functions
  // ======================
  var previousWindowWidth = -1;

  var resizeHandler = function(e){
    var prevBp,bpToTrigger,thisWidth = $(window).width()
    for(var bp in breakpoints){
      if(thisWidth >= breakpoints[bp] && ( !prevBp || thisWidth < breakpoints[prevBp] )){
        if(
             previousWindowWidth < breakpoints[bp]
          || previousWindowWidth >= breakpoints[prevBp]
          ){
          bpToTrigger = bp
        }
      }
      prevBp = bp;
    }
    if(bpToTrigger){
      $(window).trigger('breakpoint.'+bpToTrigger)
    }
    previousWindowWidth = thisWidth
  }

  $(window).on('ready',resizeHandler); // trigger after load

  // Events
  // ======================
  $(window).on('resize',resizeHandler)

}(jQuery);
