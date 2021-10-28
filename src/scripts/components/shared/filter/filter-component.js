import { Component } from '../../../lib/Component'
import { Creator } from '../../../lib/Creator'
import { FilterService } from './filter-service'
export class Filter extends Component {
  constructor (type, tags) {
    super()
    this.type = type
    this.tags = tags
    this.filter_service = new FilterService()
    this.init()
  }
  
  generate_filter() {
    if (this.type === 'tag') {
      this.tags.forEach(tag => {
        const span = Creator.createElement('span')
        span.addClass('ta')
      });
    }
  }
  
  init () {
    this.container = Creator.createElement('div')
  }
}
