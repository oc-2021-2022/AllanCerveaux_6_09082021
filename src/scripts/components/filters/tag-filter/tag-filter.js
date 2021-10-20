import stylesheet from 'bundle-text:./_tag_filter.scss'
import { Component } from '../../../lib/Component'
import '../select-tag/select-tag'
class FilterComponent extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['type', 'filter_data']
  }

  generatedFilterList () {
    if (this.filter_data) {
      return JSON.parse(this.filter_data).map(tag => this.type === 'tag'
        ? /* html */`<a class="tag tag-button" href="" aria-label='${tag}' data-tag="${tag}">#${tag}</a>`
        : /* html */`<li class="tag tag-option" data-tag="${tag}">${tag}</li>`)
        .join(' ')
    }
  }

  template () {
    if (this.type === 'select') {
      return /* html */`
        <select-tag options='${this.generatedFilterList()}'></select-tag>
      `
    } else if (this.type === 'tag') {
      return this.generatedFilterList()
    }
  }

  setEvents () {
    this.tags = this.shadow.querySelectorAll('.tag')
    this.tags.forEach(tag => tag.addEventListener('click', (event) => this.handleClick(event, tag)))
    if (this.shadow.querySelector('select-tag') !== null) this.shadow.querySelector('select-tag').addEventListener('select-get-tag', this.handleClick)
  }

  handleClick = (event, link = null) => {
    event.preventDefault()
    if (link) {
      const tags = Array.from(this.tags).filter(tag => tag.classList.contains('active'))
      if (!link.classList.contains('active')) {
        link.className += ' active'
      }
      tags.forEach(tag => {
        tag.className = 'tag tag-button'
      })
    }
    const tag = event.target.getAttribute('data-tag') ?? event.detail.getAttribute('data-tag')
    this.dispatchEvent(new CustomEvent('selected-tag', { bubbles: true, detail: { tag } }))
  }

  render () {
    this.shadow.innerHTML = /* html */`${this.template()}`
  }
}

customElements.define('filter-component', FilterComponent)
