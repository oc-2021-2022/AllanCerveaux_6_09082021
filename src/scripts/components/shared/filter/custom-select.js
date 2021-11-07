import { Component } from '../../../lib/Component'

export class CustomSelect extends Component {
  constructor (options) {
    super()
    this.options = options
    this.openList = false
    console.log(this.options)
    this.selectContainer = this.createElement('div')
    this.$(this.selectContainer)
      .addClass('select')
      .html(/* html */`
        <div class="selected-option">
          <span class="option">Popularity</span>
          <span class="arrow">&bigvee;</span>
        </div>
        <ul class="options-list">${this.options.map(tag => /* html */`<li class="tag tag-option" data-tag="${tag}">${tag}</li>`).join('')}</ul>
      `)
  }

  template = () => this.selectContainer
}
