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
    this.addEventTag()
    this.onClickLink()
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

  addEventTag () {
    let selectedTag = ''
    this.$('.tag').on('click', ({ target }) => {
      this.resetTagStyle()
      this.toggleCardList(this.$(target), selectedTag)
      selectedTag = this.$(target).getAttribute('data-tag') === selectedTag ? '' : this.$(target).getAttribute('data-tag')
    })
  }

  resetTagStyle = () => this.$('.tag').each(tag => this.$(tag).hasClass('active') ? this.$(tag).removeClass('active') : null)

  onClickLink () {
    this.$('.card-header>a').on('click', ({ target }) => {
      document.dispatchEvent(new CustomEvent('go-to-profile', { detail: this.$(target.parentNode).getAttribute('data-id') }))
    })
  }
}
