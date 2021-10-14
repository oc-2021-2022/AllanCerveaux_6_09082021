import { HomeComponent } from './components/home'
import { PhotographerProfile } from './components/photographers'

export const routes = [
  {
    path: /photographer\/(.*)/,
    component: new PhotographerProfile()
  },
  {
    path: '',
    component: new HomeComponent()
  }
]
