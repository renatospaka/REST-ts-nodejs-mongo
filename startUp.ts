import * as express from "express";
import * as bodyParser from "body-parser";
import Database from "./infra/db";
import NewsController from "./controller/newsController";

class StartUp {
  public app: express.Application;
  private _db: Database;
  private bodyParser;

  constructor() {
    this._db = new Database();
    this._db.createConnection();
    
    this.app = express();
    this.middler();
    this.routes();
  }

  middler() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send({ versao: "0.0.1"})
    })

    this.app.route("/api/v1/news").get(NewsController.get);
    this.app.route("/api/v1/news/:id").get(NewsController.getById);
    this.app.route("/api/vi/news").post(NewsController.create);
    this.app.route("/api/vi/news/:id").put(NewsController.update);
    this.app.route("/api/vi/news/:id").delete(NewsController.delete);
  }
}

export default new StartUp();