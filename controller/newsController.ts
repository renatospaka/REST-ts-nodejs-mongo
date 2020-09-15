import NewsService from "../services/newsServices";
import * as HttpStatus from "http-status";
import * as redis from "redis";

import Helper from "../infra/helper";

class NewsController {
  async get(req, res) {
    let client = redis.createClient();
    client.get("news", function (err, reply) {
      if (reply) {
        console.log('redis');
        Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
      } else {
        NewsService.get()
          .then((news) => {
            console.log('db');
            client.set('news', JSON.stringify(news));
            client.expire('news', 20);

            Helper.sendResponse(res, HttpStatus.OK, news);
          })
          .catch((error) => console.error.bind(console, `Error ${error}`));
      }
    });
  }

  async getById(req, res) {
    const _id = req.params.id;

    NewsService.getById(_id)
      .then((news) => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  create(req, res) {
    let vm = req.body;

    NewsService.create(vm)
      .then((news) =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          "Notícia cadastrada com sucesso."
        )
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  async update(req, res) {
    const _id = req.params.id;
    let vm = req.body;

    NewsService.update(_id, vm)
      .then((news) =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          `{news.title} foi atualizado com sucesso.`
        )
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  async delete(req, res) {
    const _id = req.params.id;

    NewsService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, "Notícia excluída com sucesso.")
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }
}

export default new NewsController();
