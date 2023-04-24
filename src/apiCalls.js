export const fetchOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  const allOrders = await response.json()
  return allOrders
}