import React from "react";

function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories
}) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select"
      >
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="select"
      >
        <option value="asc">Сначала дешевле</option>
        <option value="desc">Сначала дороже</option>
      </select>
    </div>
  );
}

export default SearchBar;
