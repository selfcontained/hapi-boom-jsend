[![Build Status](https://travis-ci.org/selfcontained/hapi-boom-jsend.svg?branch=master)](https://travis-ci.org/selfcontained/hapi-boom-jsend)

hapi-boom-jsend
===============

hapi plugin to convert [boom][] errors into [jsend][] responses


```bash
npm install hapi-boom-jsend
```

## 4XX responses

4XX responses created by [boom][] are converted into jsend **fail** responses.  The `error` and `statusCode` properties are left on the payload, while the others are coerced into [jsend][] properties.

### Before

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "your message"
}
```

### After
```json
{
  "status": "fail",
  "error": "Bad Request",
  "statusCode": 400,
  "data": { "message": "your message" }
}
```

## 5XX responses

5XX responses created by [boom][] are converted into jsend **error** responses.  The `error`, `statusCode`, and `message` properties are left on the payload.  `status` and `data` are added as well.

### Before

```json
{
  "statusCode": 502,
  "error": "Bad Gateway",
  "message": "An internal server error occurred"
}
```

### After

```json
{
  "status": "error",
  "error": "Bad Gateway",
  "statusCode": 502,
  "data": {},
  "message": "An internal server error occurred"
}
```

[hapi]: https://github.com/hapijs/hapi
[jsend]: http://labs.omniti.com/labs/jsend
[boom]: https://github.com/hapijs/boom
