import stylesheet from 'bundle-text:./_navigation.scss'
import logo from 'url:../../../resources/images/logo.svg'
import { Component } from '../../lib/Component'
import '../filters'
import { PhotographerService } from '../photographers'

export class NavigationComponent extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['tags']
  }

  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  setEvents () {
    this.shadow.querySelector('filter-component')
      .addEventListener('selected-tag', (event) => this.dispatchEvent(new CustomEvent('selected-tag', { detail: event.detail })))
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <nav role="navigation" aria-label="Navigation principal">
      <a role="link" href="/"> 
        <img src="${logo}" alt="Logo de Fisheye - Page d'acceuil"/>
      </a>
      <filter-component type="tag" filter_data='${this.tags}'></filter-component>
      <h1 id="maintitle" class="title">Nos Photographes</h1>
    </nav>
    `
  }
}

customElements.define('navigation-component', NavigationComponent)
