import { useState } from 'react';

export default function Dashboard() {
  const [product_name, setProductName] = useState('');
  const [products, setProduct] = useState([]);

  const [items, setItems] = useState([]);

  const addItem = () => {
    // Create a new item
    const newItem = product_name;
    console.log(newItem)

    // Update state with a NEW array (spread operator)
    setItems([...items, newItem]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProduct(...products, product_name)

    console.log(products);
    setProductName('');
  }

  return (
    <div>


      <form onSubmit={handleSubmit}>
      <div>
        <input
          type="product_name"
          placeholder="Product Name"
          value={product_name}
          onChange={e => setProductName(e.target.value)}
          required
        />
      </div>

    </form>
      <div>
        <h1>Items</h1>
        <button onClick={addItem}>Add Item</button>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {products.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}