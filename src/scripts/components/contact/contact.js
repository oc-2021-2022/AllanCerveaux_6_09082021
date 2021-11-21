import { Component } from '../../lib'

export class Contact extends Component {
  constructor (name) {
    super()
    this.name = name
  }

  onClose = () => {
    this.$('#modal').keydown(({ key }) => {
      if (key === 'Escape') this.close()
    })
    this.$('#close')
      .click(this.close)
      .keydown(({ keyCode, key }) => {
        if (keyCode === 32 || key === 'Enter') {
          this.close()
        }
      })
  }

  onSubmit () {
    this.$('.contact-form').submit((event) => {
      event.preventDefault()
      const data = new FormData(event.target)
      data.forEach((value, name) => console.log(name, value))
      this.close()
    })
  }

  close = () => {
    this.$('.contact').remove()
    this.$('.modal-container')
      .hide()
      .setAttribute('data-focus', false)
  }

  template = () => /* html */`
  <section class="contact" id="modal-contact" tabindex="-1">
    <div class="contact-header">
      <div class="info" tabindex="0">
        <h2 class="title">Contactez-moi</h2>
        <p class="name">${this.name}</p>
      </div>
      <span id="close" tabindex="0">&times;</span>
    </div>
    <form class="contact-form">
      <div class="form-control">
        <label for="first_name">Prénom</label>
        <input type="text" id="first_name" name="first_name" value="Allan"/>
      </div>
      <div class="form-control">
        <label for="last_name" >Nom</label>
        <input type="text" id="last_name" name="last_name" value="Cerveaux"/>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" value="cerveauxallanjean@gmail.com"/>
      </div>
      <div class="form-control">
        <label for="message" >Message</label>
        <textarea id="message" name="message">Duis dolor minim cupidatat in ipsum sint duis ullamco elit aliquip sit officia veniam. Culpa cillum ut sint mollit labore nisi ad duis ex eiusmod velit sit. Sint consectetur Lorem id occaecat. Est sint non duis sit cupidatat dolore incididunt. Excepteur elit est aliquip eiusmod culpa.</textarea>
      </div>
      <div class="form-control">
        <button>Envoyer</button>
      </div>
    </form>
  </section>
  `
}
