import { Component } from '../../lib'
import { PhotographerCard } from '../photographer'
export class Homepage extends Component {
  constructor (photographer) {
    super()
    this.photographer = photographer
    this.container = this.$('#photographers')
    photographer.map(this.generatePhotographerCard)
  }

  generatePhotographerCard = async (photographer) => {
    const card = await new PhotographerCard(photographer).render()
    this.container.append(card)
  }

  toggleCardList (tag, selectedTag) {
    this.$('.card').each(card => {
      card = this.$(card)
      if (tag.getAttribute('data-tag') === selectedTag) {
        tag.removeClass('active')
        card.show()
        return
      }
      if (!card.getAttribute('data-tags').includes(tag.getAttribute('data-tag'))) {
        card.hide()
      } else {
        tag.addClass('active')
        card.show()
      }
    })
  }
}
