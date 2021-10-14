export class Router {
  routes = []
  mode = null
  root = '/'

  constructor ({ mode, root }) {
    this.mode = window.history.pushState ? 'history' : 'push'
    if (mode) this.mode = mode
    if (root) this.root = root
    this.listen()
  }

  add = (arr) => {
    this.routes = arr
    return this
  }

  remove = path => {
    this.routes = this.routes.filter(route => route.path !== path)
    return this
  }

  flush = () => {
    this.routes = []
    return this
  }

  clearSlashes = path =>
    path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');

  getFragement = () => {
    let fragment = ''
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search))
      fragment = fragment.replace(/\?(.*)$/, '')
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment
    } else {
      const match = window.location.href.match(/#(.*)$/)
      fragment = match ? match[1] : ''
    }
    return this.clearSlashes(fragment)
  }

  navigate = (path = '') => {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + this.clearSlashes(path))
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`
    }
    return this
  }

  listen = () => {
    clearInterval(this.listen)
    this.interval = setInterval(this.interval, 50)
  }

  interval = () => {
    if (this.current === this.getFragement()) return
    this.current = this.getFragement()
    // eslint-disable-next-line array-callback-return
    this.routes.some(route => {
      const match = this.current.match(route.path)
      if (match) {
        match.shift()
        if (route.cb) route.cb.apply({}, match)
        return match
      }
    })
    return false
  }

  getCurrentRoute () {
    // eslint-disable-next-line array-callback-return
    return this.routes.find(route => this.getFragement().match(route.path))
  }
}

export default Router
