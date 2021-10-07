import styles from 'bundle-text:./_contact.scss'

export class Contact extends HTMLElement {
  constructor (name) {
    super()
    this.name = name
  }

  connectedCallback () {
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.render()

    this.shadow.querySelector('#close').addEventListener('click', this.close)
    this.shadow.querySelector('form').addEventListener('submit', this.sendMail)

    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
    this.shadow.prepend(style)
  }

  close = () => {
    this.remove()
  }

  sendMail (event) {
    event.preventDefault()
    const data = new FormData(event.target)
    data.forEach((value, name) => {})
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <section>
        <h2>Contactez-moi</h2>
        <p>${this.name}</p>
        <form>
          <div>
            <label>Nom</label>
            <input type="text" name="last_name"/>
          </div>
          <div>
            <label>Prénom</label>
            <input type="text" name="first_name"/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email"/>
          </div>
          <div>
            <label>Message</label>
            <textarea name="message"></textarea>
          </div>
          <div>
            <button>Envoyer</button>
          </div>
        </form>
        <button id="close">close</button>
      </section>
    `
  }
}

customElements.define('contact-component', Contact)
