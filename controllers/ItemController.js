import Item from '../models/Item';

// Create item
export const createItem = async (req, res) => {
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

// Read items (all)
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

// Read item
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

// Update item
export const updateItem = async (req, res) => {
  const {itemId} = req.query;
  const newItem = req.body;

  if(itemId && newItem){
    try {
      console.log(newItem);
      const newData = await Item.findByIdAndUpdate({_id: itemId} , newItem);
      // console.log(newData);
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

// Delete item
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
