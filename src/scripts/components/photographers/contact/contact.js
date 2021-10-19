import stylesheet from 'bundle-text:./_contact.scss'
import { Component } from '../../../lib/Component'

export class Contact extends Component {
  styles = stylesheet
  constructor (name) {
    super()
    this.name = name
  }

  setEvents () {
    this.shadow.querySelector('#close').addEventListener('click', this.close)
    this.shadow.querySelector('form').addEventListener('submit', this.sendMail)
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
      <section class="contact">
        <div class="contact-header">
          <div class="info">
            <h2 class="title">Contactez-moi</h2>
            <p class="name">${this.name}</p>
          </div>
          <span id="close">&times;</span>
        </div>
        <form class="contact-form">
        <div class="form-control">
          <label>Prénom</label>
          <input type="text" name="first_name"/>
        </div>
          <div class="form-control">
            <label>Nom</label>
            <input type="text" name="last_name"/>
          </div>
          <div class="form-control">
            <label>Email</label>
            <input type="email" name="email"/>
          </div>
          <div class="form-control">
            <label>Message</label>
            <textarea name="message"></textarea>
          </div>
          <div class="form-control">
            <button>Envoyer</button>
          </div>
        </form>
      </section>
    `
  }
}

customElements.define('contact-component', Contact)
