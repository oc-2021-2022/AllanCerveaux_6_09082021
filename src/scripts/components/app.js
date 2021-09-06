import '../lib/router/RouterView'

export class App extends HTMLElement {
  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.render()
  }

  render () {
    return /* html */`
      <main>
        <img src="./images/logo.svg" alt=""/>
        <router-view></router-view>
      </main>
    `
  }
}

customElements.define('main-app', App)
