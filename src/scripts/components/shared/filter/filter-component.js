import { Component } from '../../../lib/Component'
import { CustomSelect } from './custom-select'
import { FilterService } from './filter-service'
export class Filter extends Component {
  constructor (type, tags) {
    super()
    this.type = type
    this.tags = tags
    this.filter_service = new FilterService()
  }

  generateFilters = () => {
    if (this.type === 'tag') {
      return this.tags.map(tag => /* html */`<span role="link" aria-label="${tag}" class="tag tag-button" data-tag="${tag}" tabindex="0">#${tag}</span>`).join(' ')
    } else if (this.type === 'select') {
      return new CustomSelect(this.tags)
    }
  }

  template = () => /* html */`
    <div class="${this.type === 'tag' ? 'tag-list' : 'select'}">
      ${this.generateFilters()}
    </div>
  `
}
