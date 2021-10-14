import { routes } from '../../routes'
import { Router } from './Router'

export class RouterView extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
    this.routes = routes
    this.router = new Router({ mode: 'history', root: '/' })
  }

  connectedCallback () {
    this.router.add(this.routes)
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.render()
  }

  render () {
    const currentRoute = this.router.getCurrentRoute()
    return /* html */`
      ${currentRoute.component.outerHTML}
    `
  }
}

customElements.define('router-view', RouterView)
