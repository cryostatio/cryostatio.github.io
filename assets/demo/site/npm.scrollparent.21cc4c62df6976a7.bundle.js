(self.webpackChunkcryostat_web=self.webpackChunkcryostat_web||[]).push([[9636],{27274:function(module,exports){eval('var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === \'function\' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n}(this, function () {\n  var regex = /(auto|scroll)/;\n\n  var parents = function (node, ps) {\n    if (node.parentNode === null) { return ps; }\n\n    return parents(node.parentNode, ps.concat([node]));\n  };\n\n  var style = function (node, prop) {\n    return getComputedStyle(node, null).getPropertyValue(prop);\n  };\n\n  var overflow = function (node) {\n    return style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x");\n  };\n\n  var scroll = function (node) {\n   return regex.test(overflow(node));\n  };\n\n  var scrollParent = function (node) {\n    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {\n      return ;\n    }\n\n    var ps = parents(node.parentNode, []);\n\n    for (var i = 0; i < ps.length; i += 1) {\n      if (scroll(ps[i])) {\n        return ps[i];\n      }\n    }\n\n    return document.scrollingElement || document.documentElement;\n  };\n\n  return scrollParent;\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjcyNzQuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxNQUFNLElBQTBDO0FBQ2hELElBQUksaUNBQU8sRUFBRSxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLGtHQUFDO0FBQ3ZCLElBQUksS0FBSyxFQUlOO0FBQ0gsQ0FBQztBQUNEOztBQUVBO0FBQ0Esb0NBQW9DOztBQUVwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY3J5b3N0YXQtd2ViLy4vbm9kZV9tb2R1bGVzL3Njcm9sbHBhcmVudC9zY3JvbGxwYXJlbnQuanM/MmVkMCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5TY3JvbGxwYXJlbnQgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICB2YXIgcmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XG5cbiAgdmFyIHBhcmVudHMgPSBmdW5jdGlvbiAobm9kZSwgcHMpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlID09PSBudWxsKSB7IHJldHVybiBwczsgfVxuXG4gICAgcmV0dXJuIHBhcmVudHMobm9kZS5wYXJlbnROb2RlLCBwcy5jb25jYXQoW25vZGVdKSk7XG4gIH07XG5cbiAgdmFyIHN0eWxlID0gZnVuY3Rpb24gKG5vZGUsIHByb3ApIHtcbiAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApO1xuICB9O1xuXG4gIHZhciBvdmVyZmxvdyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIHN0eWxlKG5vZGUsIFwib3ZlcmZsb3dcIikgKyBzdHlsZShub2RlLCBcIm92ZXJmbG93LXlcIikgKyBzdHlsZShub2RlLCBcIm92ZXJmbG93LXhcIik7XG4gIH07XG5cbiAgdmFyIHNjcm9sbCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICByZXR1cm4gcmVnZXgudGVzdChvdmVyZmxvdyhub2RlKSk7XG4gIH07XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIDtcbiAgICB9XG5cbiAgICB2YXIgcHMgPSBwYXJlbnRzKG5vZGUucGFyZW50Tm9kZSwgW10pO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNjcm9sbChwc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIHBzW2ldO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfTtcblxuICByZXR1cm4gc2Nyb2xsUGFyZW50O1xufSkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///27274\n')}}]);