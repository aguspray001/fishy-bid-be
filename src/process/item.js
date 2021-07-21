const ItemSchema = require("../models/item");
const { removeImage } = require("../helpers/removeImage");

class itemProcess {
  async insert(data) {
    const resp = await ItemSchema.create(data);
    return { data: resp };
  }
  async getById(id) {
    const data = await ItemSchema.findById(id);
    return { data };
  }
  async paging(limit, currentPage) {
    const count = await ItemSchema.find().countDocuments();
    const data = await ItemSchema.find()
      .skip(parseInt(currentPage - 1) * parseInt(limit))
      .limit(parseInt(limit));
    return { count, data };
  }
  async update(id, data) {
    const resp = await ItemSchema.findByIdAndUpdate(id, data);
    return { data: resp };
  }
  async delete(id) {
    const item = await ItemSchema.findById(id);
    removeImage(item.image);
    const resp = await ItemSchema.findByIdAndRemove(id);
    return { data: resp };
  }
}

module.exports = itemProcess;
