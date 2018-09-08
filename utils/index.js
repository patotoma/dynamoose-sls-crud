import pe from 'parse-error'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

// *** Error handling support in promises
export const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])

export const handleErr = (error, statusCode = 500) => {
  console.error(' => ERROR:', error.stack)

  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work in LAMBDA-PROXY integration
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ error })
  }
}
