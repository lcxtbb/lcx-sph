import { v4 as uuidv4 } from 'uuid';

//生词随机字符串，不能变化，持久化
export const getUUID = () => {

    //本地存储是否有uuid，有则返回，没有生成uuid
    let uuid_token = localStorage.getItem('uuid')

    if(!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('uuid', uuid_token)
    }
    // console.log(uuid_token)
    return uuid_token
}