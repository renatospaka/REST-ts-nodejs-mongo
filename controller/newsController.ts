import NewsService from "../services/newsServices";
import * as HttpStatus from "http-status";
import * as redis from "redis";

import Helper from "../infra/helper";

class NewsController {
  async get(req, res) {
    try {
      //let client = redis.createClient(6379, "redis");
      let client = redis.createClient();
      await client.get("news", async function (err, reply) {
        if (reply) {
          Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));

        } else {
          let result = await NewsService.get();
          client.set("news", JSON.stringify(result));
          client.expire("news", 20);
          Helper.sendResponse(res, HttpStatus.OK, result);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getById(req, res) {
    try {
      const _id = req.params.id;
      let result = await NewsService.getById(_id);
      Helper.sendResponse(res, HttpStatus.OK, result);

    } catch (error) {
      console.error(error);
    }
  }

  async create(req, res) {
    try {
      const vm = req.body;
      await NewsService.create(vm);
      Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso.");

    } catch (error) {
      console.error(error);
    }
  }

  async update(req, res) {
    try {
      const _id = req.params.id;
      const vm = req.body;
      await NewsService.update(_id, vm);
      Helper.sendResponse(res, HttpStatus.OK, `{news.title} foi atualizado com sucesso.`);

    } catch (error) {
      console.error(error);  
    }
  }

  async delete(req, res) {
    try {
      const _id = req.params.id;
      await NewsService.delete(_id);
      Helper.sendResponse(res, HttpStatus.OK, "Notícia excluída com sucesso.");

    } catch (error) {
      console.error(error);  
    }
  }
}

export default new NewsController();
