import { Component } from '../lib/Component'
import { Filter } from './shared/filter/filter-component'
export class App extends Component {
  render () {
    const nav = this.$('nav')
    const filter = new Filter()
    nav.append(filter.container)
  }
}
