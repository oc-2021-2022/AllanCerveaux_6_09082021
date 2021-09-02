import { Network, Query } from '../../lib'

export class PhotographerService {
  constructor () {
    this.network = new Network()
    this.query = new Query()
  }

  async getAll () {
    return await this.network.fetchDataByName('photographers')
  }

  async get (query) {
    return await this.query.run(await this.getAll(), query)
  }

  async getById (id) {
    return await this.query.run(await this.getAll(), {
      id: id
    })
  }
}
