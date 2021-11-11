import { Component } from '../../../lib/Component'
import { CustomSelect } from './custom-select'
import { FilterService } from './filter-service'
export class Filter extends Component {
  constructor (type, tags, active = true) {
    super()
    this.type = type
    this.tags = tags
    this.active = active
    this.filter_service = new FilterService()
  }

  generateFilters = () => {
    if (this.type === 'tag') {
      return this.tags.map(tag => /* html */`<span role="link" aria-label="${tag}" class="tag tag-button" data-tag="${tag}" tabindex="0" >#${tag}</span>`).join(' ')
    } else if (this.type === 'select') {
      this.customSelect = new CustomSelect(this.tags)
      return this.customSelect.render()
    }
  }

  onClick () {
    if (this.active) this.$('.tag').on('click', ({ target }) => document.dispatchEvent(new CustomEvent('selected-tag', { detail: target })))
  }

  toggleSelectList () {
    this.$('.select')
      .click(this.customSelect.toggleList)
      .keydown((event) => {
        if (event.keyCode === 32 || event.key === 'Enter') {
          this.customSelect.toggleList()
        }
      })
  }

  selectTagOption () {
    this.$('.tag-option').on('click', ({ target }) => {
      this.customSelect.selectedTag(target)
    })
  }

  template = async () => /* html */`
    <div class="${this.type === 'tag' ? 'tag-list' : 'select'}">
      ${await this.generateFilters()}
    </div>
  `
}
