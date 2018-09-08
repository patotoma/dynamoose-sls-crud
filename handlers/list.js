import pe from 'parse-error'
import { Item } from '../models/item'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

export const listAll = async ({ body }, context, callback) => {
  const [err, items] = await to(Item.scan().exec())

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work in LAMBDA-PROXY integration
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    }

    console.log(` => Items retreived...
    ${items}`)
    callback(null, response)
  }
}

// *** Error handling support in promises
const to = promise =>
  promise
    .then(data => [null, data])
    .catch(err => [pe(err)])

const handleErr = (error, statusCode = 500) => {
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
