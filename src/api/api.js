/**
 * 
 * @param {*} data 
 * 1. 定义请求名称
 * 2. 传递请求参数
 * 3. 定义请求方式
 */

import { post, get } from '@/api/index'

export function sendLogin(data){
  return get('/posts', data)
} 