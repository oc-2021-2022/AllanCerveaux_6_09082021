import { Component } from '../../lib'
import { Filter } from '../filter'
import { MediaCard, MediaService } from '../medias'
import { Modal } from '../modal/modal'
import { PhotographerProfile } from '../photographer'

export class Profile extends Component {
  constructor (photographer, media) {
    super()
    this.media_service = new MediaService()
    this.photographer = photographer
    this.media = media

    this.totalLike = this.media.map(media => media.likes).reduce((acc, cur) => acc + cur)
    this.container = this.$('#profile-container')
    this.generateProfile()
  }

  async generateProfile () {
    this.profile = new PhotographerProfile(this.photographer)
    this.profile.render().then((template) => {
      this.container.html(template)
      this.profile.onClick()
    })

    this.generateMediaList(this.media)

    const filter = new Filter('select', ['popularity', 'date', 'title'], false)
    const filterContainer = this.$(document.createElement('div'))

    filter.render().then((template) => {
      filterContainer
        .addClass('filter')
        .html('<span>Trier Par</span>')
        .append(template)

      document.querySelectorAll('.tag-option').item(0).style.display = 'none'

      filter.toggleSelectList()
      filter.selectTagOption()
      this.$('.tag-option').on('click', this.sortMedia)
    })

    this.container
      .after(this.mediaList.element)
      .after(filterContainer.element)

    const totalLikeContainer = this.$(document.createElement('div'))
    totalLikeContainer
      .addClass('information')
      .html(/*html*/`
        <div class="likes" tabindex="0" aria-label="total de like ${this.totalLike}">
          <span class="like-total">${this.totalLike}</span>
          <span class="heart-icon">&#x2764;</span>
        </div>
        <span class="price">
            ${this.photographer.price} &euro; / jour
        </span>
      `)
    this.container.after(totalLikeContainer.element)

    document.addEventListener('open-modal', this.openModal)
  }

  generateMediaList (media) {
    this.mediaList = this.$(document.createElement('section'))
    this.mediaList.addClass('cards')

    media.forEach(async m => {
      const mediaCard = new MediaCard(this.photographer.name, m)
      mediaCard.render().then((template) => {
        this.mediaList.append(template)
        mediaCard.onLiked()
        mediaCard.openModal()
      })
    })
  }

  sortMedia = ({ target }) => {
    this.$('.cards').remove()
    const sortedMedia = this.media_service.filterOption(this.$(target).getAttribute('data-tag'), this.media)
    this.generateMediaList(sortedMedia)
    this.$('.filter').after(this.mediaList.element)
  }

  openModal = ({ detail }) => {
    const modal = new Modal(detail.type, { ...detail.data, media: this.media })
    modal.generateModal()
  }
}
