/**
 * Global class to render custom component
 *
 * @export
 * @class Component
 * @extends {HTMLElement}
 */
export class Component extends HTMLElement {
  styles = ''
  shadow = this.attachShadow({ mode: 'closed' })

  /**
   * connectedCallback as running first component as created
   *
   * @memberof Component
   */
  async connectedCallback () {
    await this.data()
    await this.render()
    await this.setStyle()
    await this.setEvents()
  }

  /**
   * attributeChangedCallback as launch
   * if one attribute of component as change
   * 
   * @param {string} name
   * @param {any} oldValue
   * @param {any} newValue
   * @memberof Component
   */
  async attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      await this.data()
      await this.render()
      await this.setStyle()
      await this.setListener()
    }
  }

  /**
   * disconnectCallback as launch at component as destroy
   *
   * @memberof Component
   */
  disconnectCallback () {
    this.removeEvents()
  }

  /**
   * Set style for component
   *
   * @memberof Component
   */
  setStyle () {
    const style = this.shadow.querySelector('style') !== null ? this.shadow.querySelector('style') : document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(this.styles))
    this.shadow.prepend(style)
  }

  /**
   * Call data method in component to set all constant or variable needed.
   *
   * @memberof Component
   */
  data () { }
  /**
   * Call setEvents method in component to set events needed.
   *
   * @memberof Component
   */
  setEvents () { }
  /**
   * Call setListener method in component
   * to set listener event of custom-event.
   *
   * @memberof Component
   */
  setListener () { }
  /**
   * Call removeEvents method in component to remove event.
   *
   * @memberof Component
   */
  removeEvents () { }
}
