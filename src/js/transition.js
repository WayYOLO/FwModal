//Bootstrap: transition.js v3.3.5
 // Transition.js 就是为了判断当前使用的浏览器是否支持 CSS 过渡
// Transition.js 是 transitionEnd 事件和 CSS 过渡效果模拟器的基本帮助器类。它被其他插件用来检查 CSS 过渡效果支持，并用来获取过渡效果。
+function ($) {
  function transitionEnd() {
     // 创建一个元素用于测试
    var el = document.createElement('bootstrap')
       // 将所有主流浏览器实现方式整合成一个对象，用于遍历
      // key   是属性名称
     // value 是事件名称
    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }
    // 循环遍历上面那个对象，判断 CSS 属性是否存在
    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false   // transitionend 事件是否已触发标识
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true }) // 表示已触发
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) } // 未触发，强制其触发
    setTimeout(callback, duration) // 一段时间后检测是否触发
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
      // 支持过渡的时候才执行后面的代码
    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);