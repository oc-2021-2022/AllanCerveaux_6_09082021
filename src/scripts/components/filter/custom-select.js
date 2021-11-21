import { Component } from '../../lib/Component'

export class CustomSelect extends Component {
  constructor (options) {
    super()

    this.options = options
  }

  toggleList = () => {
    if (!this.list_open) {
      this.$('.options-list')
        .addClass('toggle-option')
        .setAttribute('aria-hidden', 'false')

      this.list_open = true
      this.$('.selected-option').setAttribute('aria-expended', this.list_open)
      this.$('.selected-option>.arrow').html('&xwedge;')
    } else {
      this.$('.options-list')
        .removeClass('toggle-option')
        .setAttribute('aria-hidden', 'true')

      this.list_open = false
      this.$('.selected-option').setAttribute('aria-expended', this.list_open)

      this.$('.selected-option>.arrow').html('&bigvee;')
    }
  }

  selectedTag (tag) {
    this.$('.tag-option').each(tag => this.$(tag).removeAttribute('data-selected').setAttribute('aria-selected', false))
    this.$(tag)
      .setAttribute('data-selected', true)
      .setAttribute('aria-selected', true)
    this.$('.selected-option>span.option').text(tag.textContent)
    this.hideSelect()
  }

  hideSelect () {
    this.$('.tag-option').each(tag => {
      this.$(tag).hasAttribute('data-selected') ? tag.style.display = 'none' : tag.style.display = 'block'
    })
  }

  template = () => /* html */`
  <div class="selected-option" role="listbox" tabindex="0" aria-expanded="false">
    <span class="option">${this.options[0]}</span>
    <span class="arrow">&bigvee;</span>
  </div>
  <ul class="options-list" aria-hidden="true">${this.options.map(tag => /* html */`<li class="tag-option" role="option" data-tag="${tag}" aria-selected="false" tabindex="0">${tag}</li>`).join('')}</ul>
  `
}
