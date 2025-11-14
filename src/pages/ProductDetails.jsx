import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products.js';

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div>
        <p>Товар не найден.</p>
        <Link to="/" className="back-link">← Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <article className="product-details">
      <Link to="/" className="back-link">← Назад к каталогу</Link>
      <h2>{product.title}</h2>
      <p className="product-category">{product.category}</p>
      <p className="product-price">
        {product.price.toLocaleString('ru-RU')} ₽
      </p>
      <p>{product.description}</p>
    </article>
  );
}

export default ProductDetails;
