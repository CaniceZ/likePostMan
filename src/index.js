import {test} from "./utils"
document.getElementById("btn").addEventListener('click',function () {
  let url = document.getElementById("url").value
  let num = document.getElementById("num").value
  let methods = document.getElementById("methods").value
  let data = document.getElementById("data").value
  test(url,num,methods,data)
})

