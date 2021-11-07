import stylesheet from 'bundle-text:./_media_like.scss'
import { Component } from '../../../lib/Component'

export class MediaLike extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['likes', 'liked']
  }

  setEvents () {
    this.shadow.querySelector('span').addEventListener('click', this.addLike)
  }

  removeEvents () {
    this.shadow.querySelector('span').removeEventListener('click')
  }

  addLike = () => {
    if (!this.liked) {
      this.dispatchEvent(new CustomEvent('on-like', { detail: true }))
    }
  }

  render () {
    this.shadow.innerHTML = /* html */`
    <div class="like">
      ${this.likes}
      <span>&#x2764;</span>
    </div>
    `
  }
}

customElements.define('media-like', MediaLike)
