import { Component } from '../../lib'
import { Contact } from '../contact/contact'
import { Lightbox } from '../lightbox/lightbox'

export class Modal extends Component {
  constructor (type, data) {
    super()
    this.type = type
    this.data = data
    this.open = false
  }

  generateModal () {
    this.modalContainer = this.$('.modal-container')
    this.modalContainer.element.style.display = 'flex'
    if (this.type === 'lightbox') {
      const lightbox = new Lightbox(this.data.id, this.data.name, this.data.media)
      lightbox.render().then(template => {
        this.modalContainer.html(template)
        lightbox.navigationEvent()
        lightbox.close()
        lightbox.setPlayer()
      })
    } else {
      const contact = new Contact(this.data.name)
      contact.render().then(template => {
        this.modalContainer.html(template)
        contact.onSubmit()
        contact.onClose()
      })
    }
    document.body.prepend(this.modalContainer.element)
  }
}
