import React, { useState, useEffect } from 'react';

const OrderForm = () => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])


  handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  clearInputs = () => {
    setName('');
    setIngredients([]);
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
          value={this.state.name}
          onChange={e => handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }

export default OrderForm;
