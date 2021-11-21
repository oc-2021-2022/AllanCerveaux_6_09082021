import { Component } from '../../lib'
import { PhotographerCard } from '../photographer'
export class Homepage extends Component {
  constructor (photographer) {
    super()
    this.photographer = photographer
    this.container = this.$('#photographers')
    photographer.map(this.generatePhotographerCard)
    this.selectedTag = ''
  }

  generatePhotographerCard = async (photographer) => {
    const card = await new PhotographerCard(photographer).render()
    this.container.append(card)
    this.onClickLink()
    this.$('.tag')
      .on('click', ({ target }) => this.addEventTag(target))
      .on('keydown', (event) => {
        if (event.keyCode === 32 || event.key === 'Enter') {
          this.addEventTag(event.target)
        }
      })
  }

  toggleCardList (tag, selectedTag) {
    this.$('.card').each(card => {
      card = this.$(card)
      if (tag.getAttribute('data-tag') === selectedTag) {
        if (this.$(tag).getAttribute('aria-selected')) this.$(tag).setAttribute('aria-selected', false)
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

  addEventTag = (target) => {
    this.resetTagStyle()
    this.$(target).setAttribute('aria-selected', true)
    this.toggleCardList(this.$(target), this.selectedTag)
    this.selectedTag = this.$(target).getAttribute('data-tag') === this.selectedTag ? '' : this.$(target).getAttribute('data-tag')
  }

  resetTagStyle = () => this.$('.tag').each(tag => {
    if (this.$(tag).hasClass('active')) this.$(tag).removeClass('active')
    if (this.$(tag).getAttribute('aria-selected')) this.$(tag).setAttribute('aria-selected', false)
  })

  onClickLink () {
    this.$('.card-header>a')
      .on('click', ({ target }) => document.dispatchEvent(new CustomEvent('go-to-profile', { detail: this.$(target.parentNode).getAttribute('data-id') })))
      .on('keydown', ({ keyCode, key, target }) => {
        if (keyCode === 32 || key === 'Enter') {
          document.dispatchEvent(new CustomEvent('go-to-profile', { detail: this.$(target).getAttribute('data-id') }))
        }
      })
  }

  destroy () {
    this.container.remove()
  }
}
