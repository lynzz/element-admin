import nav from './nav-config'
import auth from './auth'

const loginSuccess = (to, from, next) => {
  if (auth.loggedIn()) {
    next({
      path: '/'
    })
  } else {
    next()
  }
}
const getComponent = name => require(`./views/${name}.vue`)

const routers = [
  { path: '/', component: require('./views/index') },
  { path: '/login', name: 'login', component: require('./views/login'), beforeEnter: loginSuccess }
]

nav.forEach((mod) => {
  const subMenus = mod.children

  subMenus.forEach((subMenu) => {
    routers.push({
      path: subMenu.path,
      name: subMenu.name,
      component: getComponent(subMenu.name)
    })
  })
})

routers.push({
  path: '*',
  name: 'notfound',
  component: require('./views/notfound')
})

export default routers
