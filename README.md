# property-resolver-js

1. [english](#english-docs)

## english docs
`property-resolver-js` is a Node.js module, which provides 1 function, `resolve`.

## Github

Github: https://github.com/thejeff77/property-resolver.git

## License

MIT

## installation and usage

``` bash
npm install property-resolver-jsq
```

``` javascript
var resolver = require("property-resolver-js");
```

## Resolution of properties.

``` javascript
var jsonProps = {
  A:'${B.foo}'
  B: {
    foo: 'bar'
  }
};
var resolvedJsonProps = resolver.resolve(jsonProps, "${", "}", ".");
```

Result (resolvedJsonProps):
``` javascript
{
  A:'bar'
  B: {
    foo: 'bar'
  }
};
```

When using the resolver, properties that are not found will be turned into ???.

## Parameters

1. The json properties structure
2. The property prefix
3. The property suffix
4. The delimeter for property placeholder resolution. Ex: ${var1.var2.var3} would have a delimiter of ".".

## Issues

* Currently does not support JSON arrays, as these aren't common when converting java *.properties files to json.


