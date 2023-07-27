const express = require("express");
const cookieParser = require("cookie-parser");

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  setupRoutes() {
    const optionRouter = require("./routes/option.route");
    const itemRouter = require("./routes/Item.route").router;
    const order_itemRouter = require("./routes/order_item.route");
    const item_order_customerRouter = require("./routes/item_order_customer.route");
    const order_customerRouter = require("./routes/order_customer.route");

    this.app.use("/api", [
      optionRouter,
      itemRouter, // Use itemRouter directly as middleware
      order_itemRouter,
      item_order_customerRouter,
      order_customerRouter,
    ]);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const myServer = new Server(3000);
myServer.start();
