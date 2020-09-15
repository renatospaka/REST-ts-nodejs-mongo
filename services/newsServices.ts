import NewsRepository from '../repository/newsRepository';

class NewsService {
  async get() {
    return await NewsRepository.find({});
  }

  async getById(_id) {
    return await NewsRepository.findById({_id});
  }

  async create(_news) {
    return await NewsRepository.create(_news);
  }

  async update(_id, _news) {
    return await NewsRepository.findByIdAndUpdate(_id, _news)
  }

  async delete(_id) {
    return await NewsRepository.findByIdAndRemove(_id)
  }
}

export default new NewsService();