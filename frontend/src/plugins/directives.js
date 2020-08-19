module.exports = (Vue) => { Vue.directive('auto-scroll-bottom', { componentUpdated: (el) => { el.scrollTop = el.scrollHeight } }) }
