import uuid from 'uuid/v1'
import { Item } from '../models/item'
import { to, handleErr } from '../utils'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

export const batchAdd = async ({ body }, context, callback) => {
  const [err, items] = await to(Promise.all(addItems(body)))

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

    console.log(` => Items stored: ${items.length}`)
    callback(null, response)
  }
}

// Builds an array of promises for creating and saving the items
const addItems = data => {
  const itemsData = JSON.parse(data)
  if (itemsData.length && typeof itemsData !== 'string') {
    return itemsData.map(item => Item.create({
      id: uuid(),
      ...item
    }))
  } else {
    throw new Error('Type of items to add must be an array')
  }
}
