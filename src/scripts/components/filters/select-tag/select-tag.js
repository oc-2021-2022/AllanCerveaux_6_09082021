import { Component } from '../../../lib/Component'
import stylesheet from './_select_tag.scss'

export class SelectTag extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['options']
  }

  constructor () {
    super()
    this.list_open = false
  }

  setEvents () {
    this.shadow.querySelector('.select').addEventListener('click', this.toggleList)
    const tags = this.shadow.querySelectorAll('.tag')
    tags.forEach(tag => tag.addEventListener('click', this.sendTag))
  }

  toggleList = () => {
    if (!this.list_open) {
      this.shadow.querySelector('.options-list').classList.add('toggle-option')
      this.list_open = true
      this.shadow.querySelector('.selected-option>.arrow').innerHTML = '&xwedge;'
    } else {
      this.shadow.querySelector('.options-list').classList.remove('toggle-option')
      this.list_open = false
      this.shadow.querySelector('.selected-option>.arrow').innerHTML = '&bigvee;'
    }
  }

  sendTag = (event) => {
    this.shadow.querySelector('.selected-option>.option').textContent = event.target.getAttribute('data-tag')
    this.dispatchEvent(
      new CustomEvent('select-get-tag', { detail: event.target })
    )
    this.shadow.querySelector('.options-list').classList.remove('toggle-option')
    this.shadow.querySelector('.selected-option>.arrow').innerHTML = '&bigvee;'
    this.selectedTag(event.target)
  }

  selectedTag (tag) {
    this.shadow.querySelectorAll('.tag').forEach(tag => tag.removeAttribute('selected'))
    tag.setAttribute('selected', true)
    this.hideSelect()
  }

  hideSelect () {
    this.shadow.querySelectorAll('.tag').forEach(tag => {
      tag.hasAttribute('selected') ? tag.style.display = 'none' : tag.style.display = 'block'
    })
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <div class="select">
      <div class="selected-option">
        <span class="option">Popularity</span>
        <i class="arrow">&bigvee;</i>
      </div>
      <ul class="options-list">${JSON.parse(this.options).map(tag => /* html */`<li class="tag tag-option" data-tag="${tag}">${tag}</li>`).join('')}</ul>
    </div>
    `
    this.hideSelect()
    this.shadow.querySelectorAll('.tag').item(0).style.display = 'none'
  }
}

customElements.define('select-tag', SelectTag)
