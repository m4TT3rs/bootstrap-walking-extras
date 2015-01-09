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

/* ==========================================================================
   Responsive modal
   ========================================================================== */

+function ($) {
  'use strict';


  // Variables
  // ======================

  var breakpoint = 768


  // Functions
  // ======================

  var addSpacing = function(modal){
    var modalContent = modal.find('.modal-content')
    var modalHeader  = modal.find('.modal-header')
    var modalFooter  = modal.find('.modal-footer')

    modalContent.css({
      paddingTop: modalHeader.outerHeight(),
      paddingBottom: modalFooter.outerHeight()
    })
  }

  var removeSpacing = function(modal){
    var modalContent = modal.find('.modal-content')

    modalContent.css({
      paddingTop: 'inherit',
      paddingBottom: 'inherit'
    })
  }

  var resizeHandler = function(){
      if($(window).width() < breakpoint){
        addSpacing( $('.modal:visible') )
      }
      else{
        removeSpacing( $('.modal:visible') )
      }
  }

  // Events
  // ======================

  $(document)
    .on('show.bs.modal', '.modal', function (e) {
      if($(window).width() < breakpoint){
        setTimeout(function(){
          addSpacing( $(e.currentTarget) )
        },200)
      }
      $(window).on('resize',resizeHandler)
    })
    .on('hidden.bs.modal', '.modal', function (e) {
      if($(window).width() < breakpoint){
        setTimeout(function(){
          removeSpacing( $(e.currentTarget) )
        },200)
      }
      $(window).off('resize',resizeHandler)
    })

}(jQuery);

//# sourceMappingURL=Bootstrap-walking-extras.js.map