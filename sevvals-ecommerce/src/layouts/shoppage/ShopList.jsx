import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faListCheck,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";

function ShopList({ categoryId }) {
  const dispatch = useDispatch(); // Redux dispatch fonksiyonunu kullanmak için
  const { productList, total, isFetching } = useSelector(
    (state) => state.products
  ); // Ürün bilgilerini almak için
  const [currentPage, setCurrentPage] = useState(1); // Geçerli sayfa durumunu yönetmek için
  const [priceSort, setPriceSort] = useState(""); // Fiyat sıralama durumunu yönetmek için
  const [ratingSort, setRatingSort] = useState(""); // Reyting sıralama durumunu yönetmek için
  const [filter, setFilterState] = useState(""); // Filtreleme durumunu yönetmek için
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown menü durumunu yönetmek için
  const location = useLocation(); // Şu anki URL konumunu almak için
  const history = useHistory(); // URL yönlendirmeleri için
  const { gender, categoryName } = useParams(); // URL parametrelerini almak için

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const priceSortParam = params.get("priceSort") || "";
    const ratingSortParam = params.get("ratingSort") || "";
    const filterParam = params.get("filter") || "";
    const pageParam = parseInt(params.get("page") || "1", 10);
    setPriceSort(priceSortParam);
    setRatingSort(ratingSortParam);
    setFilterState(filterParam);
    setCurrentPage(pageParam);

    const limit = 50;
    const offset = (pageParam - 1) * limit;
    const sortParams = [priceSortParam, ratingSortParam]
      .filter(Boolean)
      .join(",");
    dispatch(fetchProducts(limit, offset, categoryId, filterParam, sortParams)); // Ürünleri fetch et
  }, [dispatch, categoryId, location.search]);

  const handleSortChange = (value, type) => {
    if (type === "price") {
      setPriceSort(value);
      setRatingSort("");
      updateUrlParams({ priceSort: value, ratingSort: "", page: 1 });
    } else if (type === "rating") {
      setRatingSort(value);
      setPriceSort("");
      updateUrlParams({ ratingSort: value, priceSort: "", page: 1 });
    }
  };

  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
    setCurrentPage(1);
    updateUrlParams({ filter: e.target.value, page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrlParams({ page });
  };

  const updateUrlParams = (params) => {
    const query = new URLSearchParams(location.search);
    query.set("category", categoryId); // Category ID'yi her zaman dahil et
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        query.set(key, params[key]);
      } else {
        query.delete(key);
      }
    });
    history.push({ search: query.toString() });
  };

  const handleProductClick = (productId) => {
    history.push(`/product-detail/${productId}`);
  };

  const itemsPerPage = 50;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="w-full flex flex-col py-10 px-10">
      <div className="flex items-center sm:justify-between justify-center flex-wrap sm:flex-nowrap gap-5 sm:gap-0 px-10">
        <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
          Showing all {total} results
        </p>

        <div className="flex items-center gap-5">
          <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
            Views:
          </p>
          <button className="btn btn-outline">
            <FontAwesomeIcon icon={faTableCellsLarge} />
          </button>
          <button className="btn btn-outline">
            <FontAwesomeIcon icon={faListCheck} />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div className="dropdown">
            <label
              tabIndex="0"
              className="btn btn-outline m-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Sort By <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
            </label>
            {dropdownOpen && (
              <ul
                tabIndex="0"
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={() => handleSortChange("price:asc", "price")}>
                    <input
                      type="radio"
                      name="priceSort"
                      checked={priceSort === "price:asc"}
                      readOnly
                    />{" "}
                    Price: Low to High
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSortChange("price:desc", "price")}>
                    <input
                      type="radio"
                      name="priceSort"
                      checked={priceSort === "price:desc"}
                      readOnly
                    />{" "}
                    Price: High to Low
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSortChange("rating:asc", "rating")}>
                    <input
                      type="radio"
                      name="ratingSort"
                      checked={ratingSort === "rating:asc"}
                      readOnly
                    />{" "}
                    Rating: Low to High
                  </a>
                </li>
                <li>
                  <a onClick={() => handleSortChange("rating:desc", "rating")}>
                    <input
                      type="radio"
                      name="ratingSort"
                      checked={ratingSort === "rating:desc"}
                      readOnly
                    />{" "}
                    Rating: High to Low
                  </a>
                </li>
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="Filter"
            className="input input-bordered"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        {isFetching ? (
          <div className="flex items-center justify-center min-h-screen">
            <button className="btn loading">Loading</button>
          </div>
        ) : productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] py-16">
            {productList.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                <ProductCard
                  image={product.images[0]?.url}
                  title={product.name}
                  department={product.description}
                  originalPrice={product.price}
                  discountedPrice={product.price}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
            No products found for this category.
          </p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ShopList;
