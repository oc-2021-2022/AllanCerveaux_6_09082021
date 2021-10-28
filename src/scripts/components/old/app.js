import styles from 'bundle-text:./_app.scss'
import '../lib/router/RouterView'
export class App extends HTMLElement {
  constructor () {
    super()
    this.image_path = './static/images'
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.render()
  }

  setStyle () {
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <main>
        <router-view></router-view>
      </main>
    `
    this.setStyle()
  }
}

customElements.define('main-app', App)
