
// Our main class
import Crowdhound  from '../lib/Crowdhound.js'
import { MdProgress } from 'vue-material/dist/components'
import Comments from '../components/crowdhound/comments/Comments'
import CommentList from '../components/crowdhound/comments/Comments-List'
import CommentsSingle from '../components/crowdhound/comments/Comments-Single'

let _Vue = null
let _crowdhound = null


function install (Vue, options) {
  console.log('Contentservice.install()', options)

  if (_crowdhound) {
    console.error("Vue.use(Crowdhound) has already been called.")
    return
  }
  _Vue = Vue

  // Create ourselves a Crowdhound Object
  _crowdhound = new Crowdhound(options)

  // Vue.mixin adds an additional 'beforeCreate' function to it's
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ Crowdhound }). If found, we'll
  // consider this to be the root. If it is not found, then we will
  // assume this is a child of the root, and create pointers back
  // to the root.
  //Vue.mixin({
  Vue.mixin({
    beforeCreate () {
      // console.log('vue-crowdhound: index.js - beforeCreate()')

      if (!this.$parent) {
        // This must be the root, since we found crowdhound in it's options.
        this._crowdhoundRoot = this
        this._crowdhound = _crowdhound
        Vue.util.defineReactive(this, '_crowdhound', this.$crowdhound)
      } else {
        this._crowdhoundRoot = this.$parent._crowdhoundRoot
      }
    },
    destroyed () {
      // registerInstance(this)
    }
  })

  // As described above, the Vue instances form a hierachy. The mixin
  // above ensures that each instance has an '_crowdhoundRoot' field
  // that points to the instance where 'crowdhound' was passed to new Vue({  }).
  // Note that it's _crowdhoundRoot might actually point to itself.
  Object.defineProperty(Vue.prototype, '$crowdhound', {
    get () { return this._crowdhoundRoot._crowdhound }
  })


  // Register the components this component uses
  Vue.use(MdProgress)
  Vue.component('crowdhound-comments', Comments)
  Vue.component('crowdhound-comments-list', CommentList)
  Vue.component('crowdhound-comments-single', CommentsSingle)


  return _crowdhound
} //- install()

const CrowdhoundLib = {
  install: install,
}


export default CrowdhoundLib

// This is used when the npm package is included into an HTML page
if (typeof window !== "undefined" && window.Vue) {
  window.Crowdhound = CrowdhoundLib
}
