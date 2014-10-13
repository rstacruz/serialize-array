Serializes a JS object into key/value pairs in compliance with
`jQuery.serializeArray`, Rack/Rails, and `jQuery.ajax(processData:true)`.

[![Status](http://img.shields.io/travis/rstacruz/serialize-array/master.svg?style=flat)](https://travis-ci.org/rstacruz/serialize-array "See test builds")

```js
serialize({
  person: { name: "John", age: 27 }
});

=> [
  { name: "person[name]", value: "John" },
  { name: "person[age]", value: 27 }
]
```

## Install

    $ npm install --save serialize-array

[![npm version](http://img.shields.io/npm/v/serialize-array.svg?style=flat)](https://npmjs.org/package/serialize-array "View this project on npm")

## Usage

> `serialize(object, [prefix], [options])`

* `prefix` *(string)* — prefix for the keys. defaults to null.
* `options` *(object)* — options.

Options available are:

* `type` *(string)* — can be *'array'* (array) or *'query'* (query string).  
defaults to *'array'*.
* `numeric` *(boolean)* — if true, then arrays will have their indices listed 
(eg, *[0]*). otherwise, it'll be blank *[]*. defaults to false.

## Thanks

**serialize-array** © 2014+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/serialize-array/contributors
