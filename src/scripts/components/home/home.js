import stylesheet from 'bundle-text:./_home.scss'
import logo from 'url:../../../resources/images/logo.svg'
import { Component } from '../../lib/Component'
import { PhotographerService } from '../photographers'
import '../TextComponent'
export class HomeComponent extends Component {
  styles = stylesheet
  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  async data () {
    this.photographers_data = await this.photographer_service.getAll()
    this.photographers_data = this.photographers_data.map((p) => {
      p.tagline = p.tagline.replace("'", '&')
      return p
    })
    this.tags = await this.photographer_service.getTagList()
  }

  setEvents () {
    const tagFilter = this.shadow.querySelector('filter-component')
    tagFilter.addEventListener('selected-tag', ({ detail }) => this.updateFilterValue(detail.tag))
    this.shadow.querySelector('photographer-component').addEventListener('selected-tag', ({ detail }) => this.updateFilterValue(detail.tag))
  }

  updateFilterValue(tag) {
    const photographers = this.shadow.querySelector('photographer-component')
    if (photographers.getAttribute('filter') === tag) this.shadow.querySelector('photographer-component').removeAttribute('filter')
    else this.shadow.querySelector('photographer-component').setAttribute('filter', tag)
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <section>
      <nav aria-label="Photographer Category" tabindex="1">
        <a href="/" role="link" tabindex="2"> 
          <img src="${logo}" alt="Fisheye Home page"/>
        </a>
        <filter-component type="tag" filter_data='${JSON.stringify(this.tags)}' tabindex="2" aria-label="tags list"></filter-component>
        <h1 aria-role="header" class="title" tabindex="3">Nos Photographes</h1>
      </nav>
      <photographer-component photographers='${JSON.stringify(this.photographers_data)}'></photographer-component>
    </section>
    `
  }
}

customElements.define('home-component', HomeComponent)
