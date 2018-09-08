import { Item } from '../models/item'
import { to, handleErr } from '../utils'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

export const updateOne = async ({ body, pathParameters: { id } }, context, callback) => {
  const [err, item] = await to(updateItem(id, body))

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

    console.log(` => Item updated [${item.id}]`)
    callback(null, response)
  }
}

// Updates an item with the received data
const updateItem = (id, data) => {
  const updateData = JSON.parse(data)

  return Item.update({ id }, { ...updateData })
}
