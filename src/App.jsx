import React, { useState } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const products = [
  {
    id: "1",
    title: "Ноутбук рабочий",
    category: "Электроника",
    price: 75000,
    description: "Универсальный ноутбук для работы и учёбы."
  },
  {
    id: "2",
    title: "Смартфон",
    category: "Электроника",
    price: 45000,
    description: "Смартфон с хорошей камерой и автономностью."
  },
  {
    id: "3",
    title: "Кроссовки",
    category: "Одежда",
    price: 6000,
    description: "Удобные кроссовки для города и спорта."
  },
  {
    id: "4",
    title: "Рюкзак городской",
    category: "Аксессуары",
    price: 3500,
    description: "Рюкзак с отделением для ноутбука и удобными лямками."
  },
  {
    id: "5",
    title: "Наушники беспроводные",
    category: "Электроника",
    price: 9000,
    description: "Наушники с шумоподавлением и отличным звуком."
  },
  {
    id: "6",
    title: "Фитнес-браслет",
    category: "Электроника",
    price: 3500,
    description: "Отслеживайте пульс, шаги и качество сна."
  },
  {
    id: "7",
    title: "Футболка базовая",
    category: "Одежда",
    price: 1200,
    description: "Хлопковая футболка классического кроя."
  },
  {
    id: "8",
    title: "Худи oversize",
    category: "Одежда",
    price: 3200,
    description: "Удобное худи свободного кроя на каждый день."
  },
  {
    id: "9",
    title: "Кепка чёрная",
    category: "Аксессуары",
    price: 800,
    description: "Стильная кепка из плотного хлопка."
  },
  {
    id: "10",
    title: "Кроссовки спортивные",
    category: "Одежда",
    price: 8900,
    description: "Кроссовки для тренировок и активного отдыха."
  },
  {
    id: "11",
    title: "Пауэрбанк 20000 mAh",
    category: "Электроника",
    price: 2600,
    description: "Заряжает смартфон до 5 раз."
  },
  {
    id: "12",
    title: "Беспроводная мышь",
    category: "Электроника",
    price: 900,
    description: "Компактная беспроводная мышь с тихими кликами."
  },
  {
    id: "13",
    title: "Клавиатура мембранная",
    category: "Электроника",
    price: 1500,
    description: "Тихая клавиатура для офиса и дома."
  },
  {
    id: "14",
    title: "Платье летнее",
    category: "Одежда",
    price: 2800,
    description: "Лёгкое платье A-силуэта из нежной ткани."
  },
  {
    id: "15",
    title: "Сумка шоппер",
    category: "Аксессуары",
    price: 950,
    description: "Хлопковый шоппер для покупок и прогулок."
  },
  {
    id: "16",
    title: "Солнцезащитные очки",
    category: "Аксессуары",
    price: 2100,
    description: "Очки с UV-защитой и стильной оправой."
  },
  {
    id: "17",
    title: "Пылесос ручной",
    category: "Электроника",
    price: 4200,
    description: "Компактный пылесос для дома и автомобиля."
  },
  {
    id: "18",
    title: "Спортивные леггинсы",
    category: "Одежда",
    price: 1900,
    description: "Эластичные леггинсы для тренировок."
  },
  {
    id: "19",
    title: "Чехол для телефона",
    category: "Аксессуары",
    price: 600,
    description: "Прочный силиконовый чехол."
  },
  {
    id: "20",
    title: "Игровая мышь RGB",
    category: "Электроника",
    price: 3200,
    description: "Геймерская мышь с подсветкой и точным сенсором."
  }
];


const categories = ["Все", ...new Set(products.map((p) => p.category))];

function Layout({ children, cartCount }) {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">
         Каталог товаров
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Каталог
          </Link>
          <Link to="/cart" className="nav-link header-cart-link">
            Корзина
            {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
          </Link>
        </nav>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}

function ProductList({ addToCart, cartCount }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "Все" ? true : p.category === category;

    const matchesMin =
      minPrice === "" ? true : p.price >= Number(minPrice || 0);

    const matchesMax =
      maxPrice === "" ? true : p.price <= Number(maxPrice || Infinity);

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <Layout cartCount={cartCount}>
      <h1 className="page-title">Каталог товаров</h1>

      <div className="filters">
        <input
          className="search-input"
          type="text"
          placeholder="Поиск по названию или категории..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          className="price-input"
          type="number"
          min="0"
          placeholder="Цена от"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          className="price-input"
          type="number"
          min="0"
          placeholder="Цена до"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filtered.length === 0 && (
          <p>По вашему запросу ничего не найдено.</p>
        )}

        {filtered.map((item) => (
          <article key={item.id} className="product-card">
            <div className="product-card__body">
              <h2 className="product-card__title">{item.title}</h2>
              <p className="product-card__short">{item.category}</p>
              <p className="product-card__short">{item.description}</p>
              <div className="product-card__footer">
                <span className="product-card__price">
                  {item.price.toLocaleString("ru-RU")} ₽
                </span>
                <div className="product-card__actions">
                  <Link to={`/product/${item.id}`} className="btn btn-outline">
                    Подробнее
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(item)}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
}

function ProductDetails({ addToCart, cartCount }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout cartCount={cartCount}>
        <p>Товар не найден.</p>
        <button className="btn" onClick={() => navigate(-1)}>
          Назад
        </button>
      </Layout>
    );
  }

  return (
    <Layout cartCount={cartCount}>
      <div className="product-details">
        <div className="product-details__info">
          <h1 className="product-details__title">{product.title}</h1>
          <div className="product-details__price">
            {product.price.toLocaleString("ru-RU")} ₽
          </div>

          <p className="product-details__description">
            {product.description}
          </p>

          <div className="product-details__actions">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product)}
            >
              Добавить в корзину
            </button>
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
              Назад в каталог
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Cart({ cart, cartCount, incrementQty, decrementQty, removeFromCart }) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Layout cartCount={cartCount}>
      <h1 className="page-title">Корзина</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>В корзине пока пусто.</p>
          <button className="btn" onClick={() => navigate("/")}>
            Перейти в каталог
          </button>
        </div>
      ) : (
        <>
          <div className="cart">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__info">
                  <div className="cart-item__title">{item.title}</div>
                  <div className="cart-item__category">{item.category}</div>
                </div>

                <div className="cart-item__controls">
                  <div className="cart-item__price">
                    {item.price.toLocaleString("ru-RU")} ₽
                  </div>
                  <div className="cart-item__qty">
                    <button
                      className="qty-btn"
                      onClick={() => decrementQty(item.id)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => incrementQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item__sum">
                    {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-summary__row">
              <span>Товаров:</span>
              <span>{cartCount}</span>
            </div>
            <div className="cart-summary__row cart-summary__total">
              <span>Итого:</span>
              <span>{total.toLocaleString("ru-RU")} ₽</span>
            </div>
            <button className="btn btn-primary cart-summary__button" disabled>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}


function App() {
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductList
            addToCart={addToCart}
            cartCount={cartCount}
          />
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProductDetails
            addToCart={addToCart}
            cartCount={cartCount}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            cartCount={cartCount}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
            removeFromCart={removeFromCart}
          />
        }
      />
    </Routes>
  );
}

export default App;
