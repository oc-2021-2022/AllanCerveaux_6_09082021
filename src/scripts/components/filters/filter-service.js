import { Query } from '../../lib'

export class FilterService {
  constructor () {
    this.query = new Query()
  }

  async sortByTagsName (data, ...tags) {
    if (!tags.length || tags[0] === null || tags[0] === 'undefined') return data

    return await this.query.run(data, {
      tags: { $in: tags }
    })
  }

  async sortByName (data, type) {
    return await data.sort((current, next) => {
      if (type.toLowerCase() === 'asc') return current.name.localeCompare(next.name) === 1
      else if (type.toLowerCase() === 'desc') return current.name.localeCompare(next.name) === -1
    })
  }
}
