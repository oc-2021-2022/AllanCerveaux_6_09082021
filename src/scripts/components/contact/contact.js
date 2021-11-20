import { Component } from '../../lib'

export class Contact extends Component {
  constructor (name) {
    super()
    this.name = name
  }

  onClose = () => {
    this.$('#close').click(this.close)
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
    this.$('.modal-container').hide()
  }

  template = () => /* html */`
  <section class="contact">
    <div class="contact-header">
      <div class="info" tabindex="0">
        <h2 class="title">Contactez-moi</h2>
        <p class="name">${this.name}</p>
      </div>
      <span id="close">&times;</span>
    </div>
    <form class="contact-form">
      <div class="form-control">
        <label>Prénom</label>
        <input type="text" name="first_name" value="Allan"/>
      </div>
      <div class="form-control">
        <label>Nom</label>
        <input type="text" name="last_name" value="Cerveaux"/>
      </div>
      <div class="form-control">
        <label>Email</label>
        <input type="email" name="email" value="cerveauxallanjean@gmail.com"/>
      </div>
      <div class="form-control">
        <label>Message</label>
        <textarea name="message">Duis dolor minim cupidatat in ipsum sint duis ullamco elit aliquip sit officia veniam. Culpa cillum ut sint mollit labore nisi ad duis ex eiusmod velit sit. Sint consectetur Lorem id occaecat. Est sint non duis sit cupidatat dolore incididunt. Excepteur elit est aliquip eiusmod culpa.</textarea>
      </div>
      <div class="form-control">
        <button>Envoyer</button>
      </div>
    </form>
  </section>
  `
}
