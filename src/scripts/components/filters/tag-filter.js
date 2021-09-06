import { PhotographerService } from '../photographers'

class TagFilter extends HTMLElement {
  static get observedAttributes () {
    return ['type', 'filter_data']
  }

  constructor () {
    super()
    this.photographer_service = new PhotographerService()
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
    return await (await this.photographer_service.getTagList()).map(tag => /* html */`<a class="tag" href="">#${tag}</a>`).join(' ')
  }

  handleClick = async (tag) => {
    tag.addEventListener('click', (event) => {
      event.preventDefault()
      const selectTagEvent = new CustomEvent('selected-tag', { bubbles: true, detail: { tag: event.target.textContent.replace('#', '') } })
      this.dispatchEvent(selectTagEvent)
    })
  }

  async render () {
    this.shadow.innerHTML = /* html */ `${await this.tagList()}`
  }
}

customElements.define('tag-filter', TagFilter)
