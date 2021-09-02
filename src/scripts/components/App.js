import { PhotographerService } from './photographers/photographer-service'

export class App extends HTMLElement {
  constructor () {
    super()
    this.photographer_service = new PhotographerService()
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.render()
  }

  render () {
    return /* html */`
      <main>Hello App</main>
    `
  }
}

customElements.define('main-app', App)
