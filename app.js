// app.js
const express = require("express");
const cookieParser = require("cookie-parser");

// Import your routers
const optionRouter = require("./routes/option.route");
const itemRouter = require("./routes/item.route");
const orderItemRouter = require("./routes/order_item.route");
const item_order_customerRouter = require("./routes/item_order_customer.route");
const order_customerRouter = require("./routes/order_customer.route");

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
    // Use the imported routers as middleware
    this.app.use("/api", [
      optionRouter,
      itemRouter,
      orderItemRouter,
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
