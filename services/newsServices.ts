import NewsRepository from '../repository/newsRepository';

class NewsService {
  get() {
    return NewsRepository.find({});
  }

  getById(_id) {
    return NewsRepository.findById({_id});
  }

  create(_news) {
    return NewsRepository.create(_news);
  }

  update(_id, _news) {
    return NewsRepository.findByIdAndUpdate(_id, _news)
  }

  delete(_id) {
    return NewsRepository.findByIdAndRemove(_id)
  }
}

export default new NewsService();