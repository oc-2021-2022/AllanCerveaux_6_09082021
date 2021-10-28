import { Creator } from './Creator'

export class Component {
  constructor () {
    this.$ = (selector) => new Creator(selector)
  }
}
