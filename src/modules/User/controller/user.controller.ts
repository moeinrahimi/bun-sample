import { t } from "elysia"
import { App } from "../../.."

const routes = (app:App) => {

  app.post("/", ({body:{phoneNumber}})=>{
    checkUser(phoneNumber)
  },{
    body:t.Object({
      phoneNumber:t.Numeric()
    })
  })
  


}


const checkUser = (phoneNumber) => {
  console.log(phoneNumber, "hi")
}


export { routes }