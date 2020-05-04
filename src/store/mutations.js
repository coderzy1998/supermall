export default {
  addCounter(state,payload)
  {
    payload.count++
  },
  addToCart(state,payload)
  {
    payload.checked=true;
    state.cartList.push(payload)
  },
  addProduct(state,payload)
  {
    state.cartList[state.cartList.indexOf(payload)].count++
  },
  subProduct(state,payload)
  {
    state.cartList[state.cartList.indexOf(payload)].count--
  },
  deleteProduct(state,payload)
  {
    state.cartList.splice(state.cartList.indexOf(payload),1)
  },
  selectAll(state)
  {
    state.cartList.map(item => item.checked=true)
  },
  unSelectAll(state)
  {
    state.cartList.map(item => item.checked=false)
  },
}
