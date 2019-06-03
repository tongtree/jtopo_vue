/** 练习路由地址 **/

import Layout from '@/layout'

const practiceRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Practice',
  meta: {
    title: '练习',
    icon: 'component'
  },
  children: [
    {
      path: 'jtopo',
      component: () => import('@/views/jtopo/jtopo'),
      name: 'jtopo',
      meta: { title: 'jtopo' }
    },
    {
      path: 'student',
      component: () => import('@/views/practice/student'),
      name: 'student',
      meta: { title: '学生管理练习' }
    }
  ]
}

export default practiceRouter
