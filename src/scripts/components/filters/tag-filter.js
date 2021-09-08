import { PhotographerService } from '../photographers'

class TagFilter extends HTMLElement {
  static get observedAttributes () {
    return ['type', 'filter_data']
  }

  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  async attributeChangedCallback (attrName, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attrName] = newValue
    }
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    await this.render()

    this.tags = this.shadow.querySelectorAll('.tag')
    this.tags.forEach(this.handleClick)
  }

  disconnectedCallback () {
    this.tags.forEach(tag => tag.removeEventListener('click'))
  }

  async tagList () {
    return await JSON.parse(this.filter_data).map(tag => this.type === 'tag'
      ? /* html */`<a class="tag" href="">#${tag}</a>`
      : /* html */`<option class="tag" value="${tag}">#${tag}</option>`)
      .join(' ')
  }

  handleClick = async (tag) => {
    tag.addEventListener('click', (event) => {
      event.preventDefault()
      const selectTagEvent = new CustomEvent('selected-tag', { bubbles: true, detail: { tag: event.target.textContent.replace('#', '') } })
      this.dispatchEvent(selectTagEvent)
    })
  }

  async template () {
    if (this.type === 'select') {
      return /* html */`
      <select>
        ${await this.tagList()}
      </select>
      `
    } else if (this.type === 'tag') {
      return `${await this.tagList()}`
    }
  }

  async render () {
    this.shadow.innerHTML = /* html */ `${await this.template()}`
  }
}

customElements.define('tag-filter', TagFilter)
