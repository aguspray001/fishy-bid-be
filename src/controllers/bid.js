const bidProcess = require('../process/bid');
const { requestHandler } = require("../helpers/requestHandler");
let process = new bidProcess();

exports.bidItem = async (req, res, next) => {
  const { itemId, userId } = req.params;
  requestHandler(req, res, next, async () => {
    return await process.bid(itemId, userId)
  })
};

