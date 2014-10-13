var serialize = require('../index');
var expect = require('chai').expect;

var output;

it('ok', function () {
  output = serialize({ a: 'hello' });
  expect(output).eql([
    { name: 'a', value: 'hello' }
  ]);
});

it('many', function () {
  output = serialize({ a: 'hello', b: 'world' });
  expect(output).eql([
    { name: 'a', value: 'hello' },
    { name: 'b', value: 'world' }
  ]);
});

it('nested', function () {
  output = serialize({ a: { b: 'world' }});
  expect(output).eql([
    { name: 'a[b]', value: 'world' },
  ]);
});

it('array', function () {
  output = serialize({ a: ['one', 'two', 'three' ]});
  expect(output).eql([
    { name: 'a[]', value: 'one' },
    { name: 'a[]', value: 'two' },
    { name: 'a[]', value: 'three' },
  ]);
});

it('array', function () {
  output = serialize({ a: ['one', 'two', 'three' ]}, { numeric: true });
  expect(output).eql([
    { name: 'a[0]', value: 'one' },
    { name: 'a[1]', value: 'two' },
    { name: 'a[2]', value: 'three' },
  ]);
});

it('array', function () {
  output = serialize({ a: [ {h:'h', i:'i'}, { j:'j', k:'k'} ] }, { numeric: true });
  expect(output).eql([
    { name: 'a[0][h]', value: 'h' },
    { name: 'a[0][i]', value: 'i' },
    { name: 'a[1][j]', value: 'j' },
    { name: 'a[1][k]', value: 'k' },
  ]);
});

it('array', function () {
  output = serialize({ a: [ {h:'h', i:'i'}, { j:'j', k:'k'} ] });
  expect(output).eql([
    { name: 'a[][h]', value: 'h' },
    { name: 'a[][i]', value: 'i' },
    { name: 'a[][j]', value: 'j' },
    { name: 'a[][k]', value: 'k' },
  ]);
});

it('nested deeper', function () {
  output = serialize({ a: { b: { c: 'hello' }}});
  expect(output).eql([
    { name: 'a[b][c]', value: 'hello' },
  ]);
});

it('nested deeper with 2 keys', function () {
  output = serialize({ a: { b: { c: 'hello', d: 'world' }}});
  expect(output).eql([
    { name: 'a[b][c]', value: 'hello' },
    { name: 'a[b][d]', value: 'world' },
  ]);
});

it('prefixed', function () {
  output = serialize({ a: ['one', 'two', 'three' ]}, 'data');
  expect(output).eql([
    { name: 'data[a][]', value: 'one' },
    { name: 'data[a][]', value: 'two' },
    { name: 'data[a][]', value: 'three' },
  ]);
});

it('type:query', function () {
  output = serialize({ a: ['one', 'two', 'three' ]}, { type: 'query' });
  expect(output).eql('a[]=one&a[]=two&a[]=three');
});

it('type:query, numeric:true', function () {
  output = serialize({ a: ['one', 'two', 'three' ]}, { type: 'query', numeric: true });
  expect(output).eql('a[0]=one&a[1]=two&a[2]=three');
});

