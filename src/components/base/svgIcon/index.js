import Vue from 'vue'
import SvgIcon from './index.vue'
Vue.component('SvgIcon', SvgIcon)

const req = require.context('./svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
