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
