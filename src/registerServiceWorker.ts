/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { pwaState } from './pwaState'

if('serviceWorker' in navigator) {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      ready (reg) {
        console.log(
          'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
        )
      },
      registered () {
        console.log('Service worker has been registered.')
      },
      cached () {
        setTimeout(() => {
          pwaState.updatefound = false;
        }, 1000)
        setTimeout(() => {
          pwaState.cached = true;
        }, 1000)
        setTimeout(() => {
          pwaState.cached = false;
        }, 3000)
        console.log('Content has been cached for offline use.')
        console.log('some chcanges on cached');
      },
      updatefound () {
        pwaState.updatefound = true;
        console.log('New content is downloading.')
      },
      updated () {     
        pwaState.updated = true;  
        console.log('New content is available; please refresh.')
      },
      offline () {
        console.log('No internet connection found. App is running in offline mode.')
      },
      error (error) {
        console.error('Error during service worker registration:', error)
      }
    })
  }
}
else {
  console.log('serviceWorker is not supported');
}


