const { requestHandler } = require("../helpers/requestHandler");

const marketProcess = require("../process/market");
let process = new marketProcess();

exports.addMarket = async (req, res, next) => {
  requestHandler(req, res, next, async () => {
    const { name, location, items } = req.body;
    const image = req.file.path;
    return await process.insert({ name, location, items, image });
  });
};

exports.getMarketById = async (req, res, next) => {
  requestHandler(req, res, next, async () => {
    const { marketId } = req.params;
    return await process.getById(marketId);
  });
};

exports.getAllMarket = async (req, res, next) => {
  const { page, limit } = await req.query;
  requestHandler(req, res, next, async () => {
    return await process.paging(limit, page);
  });
};

exports.updateMarket = async (req, res, next) => {
  requestHandler(req, res, next, async () => {
    const { marketId } = req.params;
    const { name, location, items } = req.body;
    const image = req.file.path;
    return await process.update(marketId, { name, location, items, image });
  });
};

exports.deleteMarket = async (req, res, next) => {
  const { marketId } = req.params;
  requestHandler(req, res, next, async () => {
    return await process.delete(marketId);
  });
};
