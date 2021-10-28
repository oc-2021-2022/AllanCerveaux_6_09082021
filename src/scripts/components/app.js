import stylesheet from 'bundle-text:./_app.scss'
import { Component } from '../lib/Component'
import '../lib/router/RouterView'
export class App extends Component {
  styles = stylesheet
  render () {
    this.shadow.innerHTML = /* html */`
      <main role="main" tabindex="0" aria-label="Contenue principal" >
        <router-view></router-view>
      </main>
    `
  }
}

customElements.define('main-app', App)
