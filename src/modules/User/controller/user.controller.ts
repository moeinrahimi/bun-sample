import { t } from "elysia"
import { App } from "../../.."
import { model } from "../model/user.model"

const routes = (app:App) => {

  app.post("/", ({body:{phoneNumber}})=>{
    return checkUser(phoneNumber)
  },{
    body:t.Object({
      phoneNumber:t.Numeric()
    })
  })
  


}


const checkUser = async (phoneNumber:number) => {
  console.log(phoneNumber, "hi")
  const exists = await model.findOne({phoneNumber:phoneNumber})
  console.log(exists)
  if(!exists){
    await model.create({
      phoneNumber:phoneNumber
    })
  }
  return exists
}


export { routes }