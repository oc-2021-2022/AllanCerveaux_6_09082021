import stylesheet from 'bundle-text:./_filter_component.scss'
import { Component } from '../../../lib/Component'
import '../select-tag/select-tag'
class FilterComponent extends Component {
  styles = stylesheet

  static get observedAttributes () {
    return ['type', 'filter_data']
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

  template () {
    if (this.type === 'select') {
      return /* html */`
        <select-tag options='${this.filter_data}'></select-tag>
      `
    } else if (this.type === 'tag') {
      return JSON.parse(this.filter_data).map(tag => /* html */`<a class="tag tag-button" href="" aria-label='${tag}' data-tag="${tag}">#${tag}</a>`).join(' ')
    }
  }

  render () {
    this.shadow.innerHTML = /* html */`${this.template()}`
  }
}

customElements.define('filter-component', FilterComponent)
