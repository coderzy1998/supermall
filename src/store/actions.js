export default {
  addCart(context,payload)
  {
    // 添加商品到购物车，方法一
    // let oldProduct=null;
    // for (let i of state.cartList)
    // {
    //   if (i.iid===payload.iid)
    //   {
    //     oldProduct=i
    //   }
    // }

    // 方法二
    return new Promise((resolve, reject) =>
    {
      let oldProduct=context.state.cartList.find(item => item.iid==payload.iid);
      // 判断新添加的商品在购物车中是否存在
      if (oldProduct)//商品数量+1
      {
        context.commit('addCounter',oldProduct)
        resolve('商品数量加一')
      }else
      {//添加商品到购物车
        payload.count=1;
        context.commit('addToCart',payload)
        resolve('添加购物车成功')
      }
    })

  },
  subProduct(context,payload)
  {
    if (context.state.cartList[context.state.cartList.indexOf(payload)].count>1)
    {
      context.commit('subProduct',payload)
    }else {
      context.commit('deleteProduct',payload)
    }
  },
  checkClick(context,payload)
  {
    if (payload)
    {
      context.commit('unSelectAll')
    }else{
      context.commit('selectAll')
    }
  }
}
