const app = require("express")();
const BidSchema = require("../models/bid");
const ItemSchema = require("../models/item");

class bidProcess {
  async bid(itemId, userId) {
    const bidItem = await BidSchema.findOne({ itemId: itemId })
      .then((r) => r)
      .catch((e) => e);
    // get item with id params and status 0
    const item = await ItemSchema.findOne({ _id: itemId, status : 0 })
      .then((r) => r)
      .catch((e) => e);

    if (!bidItem && item) {
      const resp = await BidSchema.create({
        bidPrice: parseInt(item.price),
        bidHistory: [{ userId, bidPrice: bidItem.bidPrice }],
        itemId,
        userId,
      });
      return { data: resp };
    }
    if (bidItem && item) {
      bidItem.bidPrice += 2000;
      bidItem.itemId = itemId;
      bidItem.userId = userId;
      bidItem.bidHistory.push({ userId, bidPrice: bidItem.bidPrice });
      await bidItem.save();
      const resp = await BidSchema.findById(bidItem._id)
        .populate({
          path: "itemId",
          select: "_id name type price grade image",
          populate: {
            path: "marketId",
            select: "_id name location",
          },
        })
        .populate({ path: "userId", select: "_id email name" });

      this.countdown(itemId, async () => {
        item.status = 1;
        await item.save();
      });

      return { data: resp };
    }
    if (!item) {
      const e = new Error();
      e.message = "Item is not Found / Sold in this Market";
      e.name = "Item not found / sold";
      e.errorStatus = 404;
      throw e; //throw untuk membuang error, return untuk data
    }
  }

  async countdown(itemId, cb) {

    var countdown = 1000;
    setInterval(() => {
      countdown--;
      io.emit(`timer1`, { countdown: countdown });
    }, 1000);

    io.on("connection", (socket) => {
      socket.on("reset", (data) => {
        console.log("reset!");
        countdown = 1000;
        io.emit(`timer1`, { countdown: countdown });
      });
    });
    if (countdown === 0) cb();
  }
}

module.exports = bidProcess;
