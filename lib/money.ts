import {Product} from "../models/general";

const moneyFormatter = new Intl.NumberFormat('tr-TR', {style: 'currency', currency: 'TRY'})

export const money = (amount: number) => moneyFormatter.format(amount)

export const sumTotal = (cart: Product[]) => cart.reduce((a, b) => (
    a + (Math.round(b.sellPrice * 100 + Number.EPSILON) / 100) * b.quantity
), 0)

export default money