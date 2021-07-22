const itemProcess = require("../process/item");
const { requestHandler } = require("../helpers/requestHandler");
let process = new itemProcess();

exports.addItem = async (req, res, next) => {
  requestHandler(req, res, async () => {
    const { name, jenis, grade, status, harga, market_place } = await req.body;
    const image = await req.file.path;
    return await process.insert({ name, jenis, grade, status, harga, market_place, image });
  });
};

exports.getItemById = async (req, res, next) => {
  requestHandler(req, res, next, async ()=>{
    const {itemId} = req.params;
    return await process.getById(itemId)
  })
};

exports.getAllItem = async (req, res, next) => {
  requestHandler(req, res, async ()=>{
    const { limit, page } = await req.query;
    return await process.paging(limit, page)
  })
}

exports.updateItem = async (req, res, next) => {
  requestHandler(req, res, async () => {
    const { itemId } = req.params;
    const { name, jenis, grade, status, harga, market_place } = await req.body;
    const image = req.file.path;
    const data = { name, jenis, grade, status, harga, market_place, image };
    return await process.update(itemId, data);
  });
};

exports.deleteItem = async (req, res, next) => {
  const { itemId } = req.params;
  requestHandler(req, res, async () => {
    return await process.delete(itemId);
  });
};

