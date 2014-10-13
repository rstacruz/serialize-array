/*
 * npmjs.org/package/serialize-array
 */

;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.SerializeArray = factory();
  }

}(this, function () {

  function serialize (object, prefix, options) {
    if (!options && typeof prefix === 'object') {
      options = prefix;
      prefix = undefined;
    }

    if (!options) options = {};

    var list = [];

    each(object, function (val, key) {
      if (Array.isArray(object) && !options.numeric) key = '';
      var nkey = join(prefix, key);

      if (typeof val === 'object') {
        list = list.concat(serialize(val, nkey, { numeric: options.numeric }));
      } else {
        list.push({ name: nkey, value: val });
      }
    });

    if (options && options.type === 'query')
      return querify(list);
    else
      return list;
  }

  function join (left, right) {
    if (!left)
      return right;
    else
      return left + "[" + right + "]";
  }

  function each (object, fn) {
    if (Array.isArray(object)) {
      for (var i = 0, len = object.length; i < len; i++) {
        fn(object[i], i);
      }
    }
    else {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          fn(object[key], key);
        }
      }
    }
  }

  function querify (list) {
    var items = [];
    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i];
      items.push(
        item.name + '=' +
        encodeURIComponent(item.value));
    }

    return items.join("&");
  }

  return serialize;

}));
