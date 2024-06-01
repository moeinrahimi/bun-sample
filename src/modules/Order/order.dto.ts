import { t } from "elysia"
import { Type, Static } from '@sinclair/typebox';


const OrderType = Type.Union([Type.Literal('LIMIT'), Type.Literal('MARKET')])
const Side = Type.Union([Type.Literal('BUY'), Type.Literal('SELL')])

export const OrderSchema = Type.Object({
  type: OrderType,
  side: Side,
  size: Type.Number(),
  price: Type.Optional(Type.Number()),
  orderID: Type.Optional(Type.String()),
})

export type Order = Static<typeof OrderSchema>;
