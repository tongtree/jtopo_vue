import request from '@/utils/request'

export function deleteStudentReq(id) {
  return request({
    url: '/student/delete',
    method: 'post',
    params: {id: id}
  })
}

export function addReq(student) {
  return request({
    url: '/student/add',
    method: 'post',
    data: student
  })
}

export function editReq(student) {
  return request({
    url: '/student/update',
    method: 'post',
    data: student
  })
}

export function queryReq(queryVo) {
  return request({
    url: '/student/query',
    method: 'post',
    data: queryVo
  })
}
