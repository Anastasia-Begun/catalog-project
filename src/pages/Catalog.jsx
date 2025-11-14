import React from "react";
import { useMemo, useState } from 'react';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

function Catalog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('asc');

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const value = search.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(value)
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    result.sort((a, b) =>
      sort === 'asc' ? a.price - b.price : b.price - a.price
    );

    return result;
  }, [search, category, sort]);

  return (
    <section>
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <p>По вашему запросу ничего не найдено.</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Catalog;
