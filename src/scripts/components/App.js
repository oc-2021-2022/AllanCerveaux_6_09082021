import { Component } from '../lib/Component'
import { MediaService } from './medias'
import { PhotographerService } from './photographer'
import { Filter } from './shared/filter/filter-component'
import { Homepage } from './views/Homepage'
import { Profile } from './views/Profile'

export class App extends Component {
  async onCreate () {
    this.photographer_service = new PhotographerService()
    this.media_service = new MediaService()
    this.photographers = await this.photographer_service.getAll()
    this.tags = await this.photographer_service.getTagList()
    this.selectedTag = ''
  }

  async render () {
    await this.onCreate()

    const tagList = this.$('.tag-list')
    this.filter = new Filter('tag', await this.tags)
    tagList.html(await this.filter.render())
    this.filter.onClick()

    this.homepage = new Homepage(this.photographers)
    document.addEventListener('go-to-profile', this.goToPhotographerProfile)
    document.addEventListener('selected-tag', this.addEventTag)
  }

  addEventTag (target) {
    this.resetTagStyle()
    this.homepage.toggleCardList(this.$(target), this.selectedTag)
    this.selectedTag = this.$(target).getAttribute('data-tag') === this.selectedTag ? '' : this.$(target).getAttribute('data-tag')
  }

  goToPhotographerProfile = async ({ detail }) => {
    this.homepage.destroy()
    const photographer = await this.photographer_service.getById(detail)
    const media = await this.media_service.getPhotographerMedia(detail)

    this.$('.navbar').addClass('hide-items')

    const profile = new Profile(photographer, media)
  }
}
