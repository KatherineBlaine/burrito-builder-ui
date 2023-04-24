export const fetchOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  const allOrders = await response.json()
  return allOrders
}

export const postOrder = async (newOrder) => {
  if(newOrder.name && newOrder.ingredients) {
    const response = await fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newOrder.name,
        ingredients: newOrder.ingredients
      })
    })
    const order = await response.json()
    return order;
  }
}
