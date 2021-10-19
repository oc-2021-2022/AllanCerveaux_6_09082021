import stylesheet from 'bundle-text:./_media_like.scss'
import { Component } from '../../../lib/Component'

export class MediaLike extends Component {
  styles = stylesheet
  static get observedAttributes () {
    return ['likes', 'liked']
  }

  setEvents () {
    this.shadow.querySelector('i').addEventListener('click', this.addLike)
  }

  removeEvents () {
    this.shadow.querySelector('i').removeEventListener('click')
  }

  addLike = () => {
    console.log('like')
    if (!this.liked) {
      this.dispatchEvent(new CustomEvent('on-like', { detail: true }))
    }
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <div class="like">${this.likes} <i class="fas fa-heart"></i></div>
    `
  }
}

customElements.define('media-like', MediaLike)
