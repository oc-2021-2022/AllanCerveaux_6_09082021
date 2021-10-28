import stylesheet from 'bundle-text:./_home.scss'
import { Component } from '../../lib/Component'
import '../navigation/navigation'
import { PhotographerService } from '../photographers'
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
    this.shadow.querySelector('photographer-component, navigation-component').addEventListener('selected-tag', ({ detail }) => this.updateFilterValue(detail.tag))
  }

  updateFilterValue (tag) {
    const photographers = this.shadow.querySelector('photographer-component')
    if (photographers.getAttribute('filter') === tag) this.shadow.querySelector('photographer-component').removeAttribute('filter')
    else this.shadow.querySelector('photographer-component').setAttribute('filter', tag)
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <navigation-component tags='${JSON.stringify(this.tags)}'></navigation-component>
    <photographer-component photographers='${JSON.stringify(this.photographers_data)}'></photographer-component>
    `
  }
}

customElements.define('home-component', HomeComponent)
