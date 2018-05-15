if (typeof MouseEvent !== 'function') {
  (function (){
    var _MouseEvent = window.MouseEvent;
    window.MouseEvent = function (type, dict){
      dict = dict | {};
      var event = document.createEvent('MouseEvents');

      try {

        event.initMouseEvent(
          type,
          (typeof dict.bubbles == 'undefined') ? true : !!dict.bubbles,
          (typeof dict.cancelable == 'undefined') ? false : !!dict.cancelable,
          dict.view || window,
          dict.detail | 0,
          dict.screenX | 0,
          dict.screenY | 0,
          dict.clientX | 0,
          dict.clientY | 0,
          !!dict.ctrlKey,
          !!dict.altKey,
          !!dict.shiftKey,
          !!dict.metaKey,
          dict.button | 0,
          dict.relatedTarget || null
        );

      } catch (exception) {


      }
      // var evObj = new Event('click'); //comment by chikako: if initMouseEvent is an issue then research passing all the config to Event costructor and use it instead.


      return event;
    }
  })();
}
