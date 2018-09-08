import uuid from 'uuid/v1'
import { Item } from '../models/item'
import { to, handleErr } from '../utils'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

export const addOne = async ({ body }, context, callback) => {
  const [err, item] = await to(addItem(body))

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

    console.log(` => Item stored [${item.id}]`)
    callback(null, response)
  }
}

// Creates and saves one item based in the Item model
const addItem = data => {
  const itemData = JSON.parse(data)
  return Item.create({
    id: uuid(),
    ...itemData
  })
}
