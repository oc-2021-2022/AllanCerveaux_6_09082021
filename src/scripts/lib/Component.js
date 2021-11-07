import { Manipulator } from './Manipulator'

export class Component {
  constructor () {
    this.template = ''
  }

  $ = (selector) => {
    this.manipulator = new Manipulator()
    if (typeof selector === 'string') return this.manipulator.selector(selector)
    return this.manipulator.setElement(selector)
  }

  async render () {
    if (this.init) await this.init()
    return this.template()
  }
}
