import { Component } from '../lib/Component'
import { MediaService } from './medias'
import { PhotographerService } from './old/photographers'
import { Filter } from './shared/filter/filter-component'
import { Homepage } from './views/Homepage'
export class App extends Component {
  async onCreate () {
    this.photographer_service = new PhotographerService()
    this.media_service = new MediaService()
    this.photographers = await this.photographer_service.getAll()
    this.tags = await this.photographer_service.getTagList()
  }

  async render () {
    await this.onCreate()

    const tagList = this.$('.tag-list')
    const filter = new Filter('tag', await this.tags)
    tagList.html(await filter.render())
    this.addEventTag()

    this.homepage = new Homepage(this.photographers)
    document.addEventListener('go-to-profile', ({detail}) => console.log(detail))
  }

  addEventTag () {
    let selectedTag = ''
    this.$('.tag').on('click', ({ target }) => {
      this.resetTagStyle()
      this.homepage.toggleCardList(this.$(target), selectedTag)
      selectedTag = this.$(target).getAttribute('data-tag') === selectedTag ? '' : this.$(target).getAttribute('data-tag')
    })
  }

  resetTagStyle = () => this.$('.tag').each(tag => this.$(tag).hasClass('active') ? this.$(tag).removeClass('active') : null)

  goToPhotographerProfile (arg) {
    console.log('click', arg)
  }
}
