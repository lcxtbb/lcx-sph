import Mock from "mockjs"
import banner from "./banner.json"
import floor from "./floor.json"
import adress from "./adress.json"

Mock.mock("/mock/banner",{code: 200, data: banner})
Mock.mock("/mock/floor",{code: 200, data: floor})
Mock.mock("/mock/adress",{code: 200, data: adress})


