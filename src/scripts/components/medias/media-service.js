import { Network, Query } from '../../lib'

export class MediaService {
  constructor () {
    this.network = new Network()
    this.query = new Query()
  }

  async getAll () {
    return await this.network.fetchDataByName('media')
  }

  async get (query) {
    return await this.query.run(await this.getAll(), query)
  }

  async getPhotographerMedia (id) {
    return await this.query.run(await this.getAll(), {
      photographerId: parseInt(id)
    })
  }
}
