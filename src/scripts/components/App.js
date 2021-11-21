import { Component } from '../lib'
import { Filter } from './filter'
import { MediaService } from './medias'
import { PhotographerService } from './photographer'
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
    document.addEventListener('selected-tag', ({ detail }) => this.homepage.addEventTag(detail))
  }

  goToPhotographerProfile = async ({ detail }) => {
    this.homepage.destroy()
    const photographer = await this.photographer_service.getById(detail)
    const media = await this.media_service.getPhotographerMedia(detail)

    this.$('.navbar').addClass('hide-items')

    const profile = new Profile(photographer, media)
  }
}
