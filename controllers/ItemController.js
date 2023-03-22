import Item from '../models/Item';

export const createItem = async (req, res) => {
  console.log(req.body);
  try {
    const item = await Item.create(req.body);
    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};


export const readItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        items,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};


export const readItem = async (req, res) => {
  try {
    const item = await Item.findById(req.query.itemId);

    if (item) {
      res.status(200).json({
        success: true,
        item,
      });
    } else {
      res.status(422).json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};


export const updateItem = async (req, res) => {
  const {itemId} = req.query;


  if(itemId){
    try {
      const newData = await Item.findByIdAndUpdate({_id: itemId} , req.body);
      res.status(200).json({
        success: true,
        item: newData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error,
      });
    }
  }else{
    res.status(404).json({
      success: false,
      error: error,
    });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.query.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
      });
    }

    await Item.deleteOne({ _id: req.query.itemId });

    res.status(200).json({
      success: true,
      item: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const likeDislikeItem = async (req, res) => {
  const { id, email } = req.body;
  try {
    const item = await Item.findById(id);
    if (!item.likes.includes(email)) {
      await item.updateOne({ $push: { likes: email } });
      res.status(200).json({ status: true, msg: 'Item liked!' });
    } else {
      await item.updateOne({ $pull: { likes: email } });
      res.status(200).json({ status: true, msg: 'Item UnLiked!' });
    }
  } catch (error) {
    res.status(500).json({ status: false, err: error.message });
  }
};
