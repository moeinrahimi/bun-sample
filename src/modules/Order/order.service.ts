
import { NotFoundError } from "elysia";
import type { OrderRepository } from "./order.repository";
import type { Order, OrderSchema } from "./order.dto";
import { OrderBook } from 'hft-limit-order-book';
enum Side {
  BUY = "buy",
  SELL = "sell"
}
 enum OrderType {
  LIMIT = "limit",
  MARKET = "market"
}


export class OrderService {
  constructor(private readonly repository: OrderRepository) {
    this.init()
  }
    private lob:OrderBook|undefined=undefined
  async init(){
    this.lob = new OrderBook();
    const orders = await this.repository.find()
    // biome-ignore lint/complexity/noForEach: <explanation>
    orders.forEach(order=>this.lob.createOrder(stringToOrderType(order.type),stringToSide(order.side),order.size,order.price,order.id)  )
    console.log("seed done",this.lob.depth())
  }
  async save(body:Order) {
    const order = await this.repository.save(body);
    if(this.lob)
      { 
        let result = this.lob.createOrder(stringToOrderType(order.type),stringToSide(order.side),body.size,body.price,order.id)
        console.log(result,'result')
      return {order ,result}}
    
  }

}


function stringToOrderType(orderTypeStr: string): OrderType {
  switch (orderTypeStr.toLowerCase()) {
    case 'market':
      return OrderType.MARKET;
    case 'limit':
      return OrderType.LIMIT;
    default:
      return OrderType.LIMIT;
  }
}

function stringToSide(sideStr: string): Side {
  switch (sideStr.toLowerCase()) {
    case 'buy':
      return Side.BUY;
    case 'sell':
      return Side.SELL;
    default:
      return Side.BUY;
  }
}
