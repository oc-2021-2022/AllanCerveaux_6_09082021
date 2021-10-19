import stylesheet from 'bundle-text:./_tag_filter.scss'
import { Component } from '../../../lib/Component'

class FilterComponent extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['type', 'filter_data']
  }

  generatedFilterList () {
    if (this.filter_data) {
      return JSON.parse(this.filter_data).map(tag => this.type === 'tag'
        ? /* html */`<a class="tag tag-button" href="" aria-label='${tag}'>#${tag}</a>`
        : /* html */`<option class="tag tag-option" value='${tag}'>${tag}</option>`)
        .join(' ')
    }
  }

  template () {
    if (this.type === 'select') {
      return /* html */`
        <select>${this.generatedFilterList()}</select>
      `
    } else if (this.type === 'tag') {
      return this.generatedFilterList()
    }
  }

  setEvents () {
    this.tags = this.shadow.querySelectorAll('.tag')
    this.tags.forEach(this.handleClick)
  }

  handleClick = async (tag) => {
    tag.addEventListener('click', (event) => {
      event.preventDefault()
      const tags = Array.from(this.tags).filter(tag => tag.classList.contains('active'))
      if (!tag.classList.contains('active')) {
        tag.className += ' active'
      }
      tags.forEach(tag => {
        tag.className = 'tag tag-button'
      })
      this.dispatchEvent(new CustomEvent('selected-tag', { bubbles: true, detail: { tag: event.target.textContent.replace('#', '') } }))
    })
  }

  render () {
    this.shadow.innerHTML = /* html */`${this.template()}`
  }
}

customElements.define('filter-component', FilterComponent)
