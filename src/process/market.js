const MarketSchema = require("../models/market");
const ItemSchema = require("../models/item");
const { removeImage } = require("../helpers/removeImage");

class marketProcess {
  async insert(data) {
    const resp = await MarketSchema.create(data);
    return resp;
  }
  async getById(id) {
    let data = [];
    let item_data = [];

    await ItemSchema.find({ market_place: id }).then(async (item) => {
      if (item) {
        data = await MarketSchema.findById(id);
        item_data = item;
      }
    }).catch(async (er)=>{
      if(er){
        const e = new Error()
        e.message = 'Item not Found in this Market!'
        e.name = 'Item not found'
        e.errorStatus = 404
        throw e; //throw untuk membuang error, return untuk data
      }
    });
    return { data, items: item_data }; //output request handler, yg diterima jres.data
  }
  async paging(limit, currentPage) {
    const count = await MarketSchema.find().countDocuments();
    const data = await MarketSchema.find()
      .skip(parseInt(currentPage - 1) * parseInt(limit))
      .limit(parseInt(limit));
    return { count, data };
  }
  async update(id, data) {
    const resp = await MarketSchema.findByIdAndUpdate(id, data);
    return resp;
  }
  async delete(id) {
    const market = await MarketSchema.findById(id);
    removeImage(market.image);
    const resp = await MarketSchema.findByIdAndRemove(id);
    return { resp };
  }
}

module.exports = marketProcess;
