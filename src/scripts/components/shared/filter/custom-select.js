import { Component } from '../../../lib/Component'

export class CustomSelect extends Component {
  constructor (options) {
    super()

    this.options = options
    this.openList = false
  }

  toggleList = () => {
    if (!this.list_open) {
      this.$('.options-list').addClass('toggle-option')
      this.list_open = true
      this.$('.selected-option>.arrow').html('&xwedge;')
    } else {
      this.$('.options-list').removeClass('toggle-option')
      this.list_open = false
      this.$('.selected-option>.arrow').html('&bigvee;')
    }
  }

  selectedTag (tag) {
    this.$('.tag-option').each(tag => this.$(tag).removeAttribute('data-selected'))
    this.$(tag).setAttribute('data-selected', true)
    this.$('.selected-option>span.option').text(tag.textContent)
    this.hideSelect()
  }

  hideSelect () {
    this.$('.tag-option').each(tag => {
      this.$(tag).hasAttribute('data-selected') ? tag.style.display = 'none' : tag.style.display = 'block'
    })
  }

  template = () => /* html */`
  <div class="selected-option">
    <span class="option">${this.options[0]}</span>
    <span class="arrow">&bigvee;</span>
  </div>
  <ul class="options-list">${this.options.map(tag => /* html */`<li class="tag-option" data-tag="${tag}">${tag}</li>`).join('')}</ul>
  `
}
