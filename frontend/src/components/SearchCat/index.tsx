import { useState } from 'react';
import './styles.css';

type Props = {
  onSearch: Function
}

export default function SearchCat({onSearch} : Props) {

  const [categories, setCategories] = useState('');
  const [store, setStore] = useState('');

    function handleSubmit(event: any) {
      event.preventDefault();
      onSearch(categories);
    }
    function handleChange(event: any) {
      setCategories(event.target.value)
    }
    function handleResetClick(event: any) {
      setCategories('');
      onSearch(categories);
    }

    return (
      
        <form className="dsc-search-bar" onSubmit={handleSubmit}>
          <button type="submit">🔎︎</button>
          <input 
            type="text"
            placeholder="Filtrar Categoria"
            name="categories"
            value={categories}
            onChange={handleChange}
          />
          <button onClick={handleResetClick}>🗙</button>
        </form>
        
    );
}