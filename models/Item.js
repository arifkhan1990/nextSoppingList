import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

// Create Schema
const ItemSchema = new Schema({
  item_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  likes: [],
  item_image: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.models.Item || model('Item', ItemSchema);

export default Item;
