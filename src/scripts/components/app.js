import styles from 'bundle-text:./_app.scss'
import '../lib/router/RouterView'
export class App extends HTMLElement {
  constructor () {
    super()
    this.image_path = './static/images'
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = this.render()
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  render () {
    return /* html */`
      <main>
        <router-view></router-view>
      </main>
    `
  }
}

customElements.define('main-app', App)
