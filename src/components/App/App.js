import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchOrders } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

const App = () =>  {
  const [allOrders, setAllOrders] = useState([])
  const [newOrder, setNewOrder] = useState([])
  const [error, setError] = useState('')

  const getOrders = async () => {
    try {
      const data = await fetchOrders()
      setAllOrders(data.orders)
    } catch(error) {
      setError('Server Error')
      console.error('Error fetching:', error)
    }
  }

  useEffect(() => {
    getOrders();
  }, [newOrder])

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={setNewOrder}/>
        </header>
        {error === '' ? <Orders orders={allOrders}/> : <h3>Sorry, {error}! Please try again.</h3>}
      </main>
    );
}


export default App;
