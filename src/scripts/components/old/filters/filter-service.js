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
      if (type.toLowerCase() === 'asc') return (current.name ?? current.title).localeCompare(next.name ?? next.title) === 1
      else if (type.toLowerCase() === 'desc') return (current.name ?? current.title).localeCompare(next.name ?? next.title) === -1
    })
  }

  async greaterThan (data) {
    return await data.sort((current, next) => current.likes < next.likes)
  }

  async lowerThan (data) {
    return await data.sort((current, next) => current.likes > next.likes)
  }

  async sortByDate (data, type) {
    return await data.sort((current, next) => {
      if (type.toLowerCase() === 'asc') return new Date(next.date) - new Date(current.date)
      else if (type.toLowerCase() === 'desc') return new Date(current.date) - new Date(next.date)
    })
  }
}
