import { App } from './components/App'

// eslint-disable-next-line no-new
(async function () {
  const app = new App()
  await app.render()
})()
