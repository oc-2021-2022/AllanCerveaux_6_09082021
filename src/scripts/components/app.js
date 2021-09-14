import logo from 'url:../../resources/images/logo.svg'
import '../lib/router/RouterView'
export class App extends HTMLElement {
  constructor () {
    super()
    this.image_path = './static/images'
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.render()
  }

  render () {
    return /* html */`
      <main>
        <img src="${logo}" alt=""/>
        <router-view></router-view>
      </main>
    `
  }
}

customElements.define('main-app', App)
