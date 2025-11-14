import React from "react";
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">
        {product.price.toLocaleString('ru-RU')} ₽
      </p>
      <Link to={`/product/${product.id}`} className="product-link">
        Подробнее
      </Link>
    </article>
  );
}

export default ProductCard;
