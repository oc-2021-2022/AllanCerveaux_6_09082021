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

  sortByName (data, type) {
    return data.sort((current, next) => {
      if (type.toLowerCase() === 'asc') return (current.name ?? current.title).localeCompare(next.name ?? next.title) === 1 ? 1 : -1
      else if (type.toLowerCase() === 'desc') return (current.name ?? current.title).localeCompare(next.name ?? next.title) === -1 ? 1 : -1
    })
  }

  greaterThan (data) {
    return data.sort((current, next) => current.likes < next.likes ? 1 : -1)
  }

  lowerThan (data) {
    return data.sort((current, next) => current.likes > next.likes ? 1 : -1)
  }

  sortByDate (data, type) {
    return data.sort((current, next) => {
      if (type.toLowerCase() === 'asc') return new Date(next.date) - new Date(current.date)
      else if (type.toLowerCase() === 'desc') return new Date(current.date) - new Date(next.date)
    })
  }
}
