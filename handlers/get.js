import { Item } from '../models/item'
import { to, handleErr } from '../utils'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

export const getById = async ({ pathParameters: { id } }, context, callback) => {
  const [err, item] = await to(Item.get({ id }))

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work in LAMBDA-PROXY integration
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    console.log(` => Item retreived [${item.id}]`)
    callback(null, response)
  }
}
