import stylesheet from 'bundle-text:./_photographer.scss'
import { Component } from '../../lib/Component'
import { FilterService } from '../filters'
export class Photographers extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['photographers', 'filter']
  }

  constructor () {
    super()
    this.filter_service = new FilterService()
  }

  setListener () {
    const cards = this.shadow.querySelectorAll('photographer-card')
    cards.forEach(element => {
      element.addEventListener('selected-tag', (event) => this.dispatchEvent(new CustomEvent('selected-tag', { detail: event.detail })))
    })
  }

  async updateCardList (filter = null) {
    const filteredPhotographers = await this.filter_service.sortByTagsName(JSON.parse(this.photographers), filter)
    return await filteredPhotographers.map(photographer => /* html */`<photographer-card photographer='${JSON.stringify(photographer)}'></photographer-card>`).join(' ')
  }

  async render () {
    this.shadow.innerHTML = /* html */`${await this.updateCardList(this.filter)}`
  }
}

customElements.define('photographer-component', Photographers)
