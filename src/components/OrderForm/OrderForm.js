import React, { useState, useEffect } from 'react';

const OrderForm = ( { newOrder }) => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState('')

  const handleNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
    console.log('name change')
  }

  const handleIngredientChange = (e) => {
    e.preventDefault()
    setIngredients([...ingredients, e.target.name])
    console.log('ingredient change', ingredients)
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(name !== '' && ingredients.length !== 0) {
      const order = {
        name: name,
        ingredients: ingredients
      }
      newOrder(order);
      setError('')
      clearInputs();
    } else {
        setError('Please enter your name and select at least one ingredient to submit your order!')
    }
  }

    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)}>
          {ingredient}
        </button>
      )});

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>
        {error !== '' && <p>{error}</p>}

        <button onClick={e => handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }

export default OrderForm;
