import { Item } from '../models/item'
import { to, handleErr } from '../utils'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

export const deleteOne = async ({ pathParameters: { id } }, context, callback) => {
  const [err, item] = await to(Item.delete({ id }))

  if (err) {
    callback(null, handleErr(err))
  } else {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work in LAMBDA-PROXY integration
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'item deleted'
      })
    }

    console.log(` => Item [${item.id}] was deleted`)
    callback(null, response)
  }
}
