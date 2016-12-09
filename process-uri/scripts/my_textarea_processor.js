"use strict";

var MyAutoHeightProcessor = (function () {
  var mySpan = $('<span>').addClass("hidden-span-element").appendTo('body');

  function initSpan(element){
    mySpan.text(element.text())
        .width(element.width())      
        .css({
          'font' : element.css('font'),
          'line-height' : element.css('line-height')
        });
  }

  function AutoHeightProcessor(elementSelector) {
    this.elementSelector = elementSelector;
    this.initHeight = $(this.elementSelector).height();
    this.init();
  }

  AutoHeightProcessor.prototype = {
    init : function () {
      var _self = this; 
      $(this.elementSelector).on({
        input: function(){
          mySpan.text($(this).val());      
          $(this).height(_self.getHeight());
        },
        focus: function(){
         initSpan($(this));
        },
        keypress: function(e){
            if (e.which == 13) e.preventDefault();
        }
      });
    },
    getHeight : function () {
      var mySpanHeight = mySpan.height();
      return (mySpanHeight > this.initHeight) ?  mySpanHeight : this.initHeight;
    } 
  };
  
  return {
      init : function (inputElement) {
        new AutoHeightProcessor(inputElement);
      }
    };
})();