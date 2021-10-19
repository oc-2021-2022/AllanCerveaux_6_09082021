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

  async updateCardList (filter = null) {
    const filteredPhotographers = await this.filter_service.sortByTagsName(JSON.parse(this.photographers), filter)
    let cardList = ``
    filteredPhotographers.forEach(photographer => {
      cardList += /* html */`<photographer-card photographer='${JSON.stringify(photographer)}'></photographer-card>`
    })
    return await cardList
  }

  async render () {
    this.shadow.innerHTML = /* html */`${await this.updateCardList(this.filter)}`
  }
}

customElements.define('photographer-component', Photographers)
