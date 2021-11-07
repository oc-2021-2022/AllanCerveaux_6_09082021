import { Network, Query } from '../../lib'
import { FilterService } from '../shared/filter'

export class MediaService {
  constructor () {
    this.network = new Network()
    this.query = new Query()
    this.filter_service = new FilterService()
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

  async filterOption (option, arr, reversed) {
    let data = null
    switch (option) {
      case 'title':
        data = await this.filter_service.sortByName(arr, reversed ? 'DESC' : 'ASC')
        break
      case 'popularity':
        data = reversed ? await this.filter_service.lowerThan(arr) : await this.filter_service.greaterThan(arr)
        break
      case 'date':
        data = await this.filter_service.sortByDate(arr, reversed ? 'ASC' : 'DESC')
        break
      default:
        data = arr
        break
    }
    return data
  }
}
