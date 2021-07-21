const { requestHandler } = require("../helpers/requestHandler");

const marketMethods = require("../methods/market");
let model = new marketMethods();

exports.addMarket = async (req, res, next) => {
  requestHandler(req, res, next, true , async () => {
    const {name, location, items} = req.body
    const image = req.file.path
    return await model.insert({name, location, items, image});
  });
};

exports.getMarketById = async (req, res, next) => {
  requestHandler(req, res, next, false, async () => {
    const { marketId } = req.params;
    console.log(req.params);
    return await model.getById(marketId);
  });
};

exports.getAllMarket = async (req, res, next) => {
  const { page, limit } = await req.query;
  requestHandler(req, res, next, false, async () => {
    return await model.paging(limit, page);
  });
};

exports.updateMarket = async (req, res, next) => {
  requestHandler(req, res, next, false, async () => {
    const { marketId } = req.params;
    const {name, location, items} = req.body
    const image = req.file.path
    return await model.update(marketId, {name, location, items, image});
  });
};

exports.deleteMarket = async (req, res, next) => {
  const {marketId} = req.params;
  requestHandler(req, res, next, false, async () =>{
    return await model.delete(marketId)
  })
};