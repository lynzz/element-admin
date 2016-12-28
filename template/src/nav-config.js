const nav = [
  {
    name: 'demo',
    text: '演示',
    icon: 'gear',
    path: '/user',
    children: [
      {
        name: 'user',
        path: '/user',
        icon: 'user',
        text: '用户管理'
      }, {
        name: 'editor',
        path: '/editor',
        icon: 'file',
        text: '富文本'
      }
    ]
  }
]
export default nav
