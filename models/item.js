import dynamoose from 'dynamoose'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

const { Schema } = dynamoose

const itemSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: String,
  qty: Number,
  assetList1: [String],
  assetList2: [String]
}, {
  timestamps: true
})

export const Item = dynamoose.model(process.env.DYNAMODB_TABLE, itemSchema)
