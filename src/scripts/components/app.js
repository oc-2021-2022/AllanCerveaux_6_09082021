import '../lib/router/RouterView'

export class App extends HTMLElement {
  constructor () {
    super()
    this.appName = 'FishEye'
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.render()
  }

  render () {
    return /* html */`
      <main>
        <h1>Hello ${this.appName}</h1>
        <router-view></router-view>
      </main>
    `
  }
}

customElements.define('main-app', App)
