import { PhotographerService } from '../photographers'

export class HomeComponent extends HTMLElement {
  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  async connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.data = await this.photographer_service.getAll()
    this.data = this.data.map((p) => {
      p.tagline = p.tagline.replace("'", '&')
      return p
    })
    this.tags = await this.photographer_service.getTagList()

    await this.render()

    const tagFilter = this.shadow.querySelector('tag-filter')
    tagFilter.addEventListener('selected-tag', ({ detail }) => this.updateFilterValue(detail.tag))
  }

  updateFilterValue (tag) {
    const photographers = this.shadow.querySelector('photographer-component')
    if (photographers.getAttribute('filter') === tag) this.shadow.querySelector('photographer-component').removeAttribute('filter')
    else this.shadow.querySelector('photographer-component').setAttribute('filter', tag)
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <section>
      <tag-filter type="tag" filter_data='${JSON.stringify(this.tags)}'></tag-filter>
      <h1>Nos Photographes</h1>
      <photographer-component photographers='${JSON.stringify(this.data)}'></photographer-component>
    </section>
    `
  }
}

customElements.define('home-component', HomeComponent)
