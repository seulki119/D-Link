module.exports = (Vue) => { Vue.directive('auto-scroll-bottom', { componentUpdated: (el) => { console.log(el.scrollTop); console.log(el.scrollHeight); el.scrollTop = el.scrollHeight } }) }
