import React, { useEffect, useState, useRef } from "react";
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
  // Redux dispatch fonksiyonunu kullanmak için
  const dispatch = useDispatch();

  // Redux store'dan ürün bilgilerini almak için
  const { productList, total, isFetching } = useSelector(
    (state) => state.products
  );

  // Geçerli sayfa durumunu yönetmek için
  const [currentPage, setCurrentPage] = useState(1);
  // Fiyat sıralama durumunu yönetmek için
  const [priceSort, setPriceSort] = useState("");
  // Reyting sıralama durumunu yönetmek için
  const [ratingSort, setRatingSort] = useState("");
  // Filtreleme durumunu yönetmek için
  const [filter, setFilterState] = useState("");
  // Seçili fiyat sıralama durumunu yönetmek için
  const [selectedPriceSort, setSelectedPriceSort] = useState("");
  // Seçili reyting sıralama durumunu yönetmek için
  const [selectedRatingSort, setSelectedRatingSort] = useState("");
  // Seçili filtreleme durumunu yönetmek için
  const [selectedFilter, setSelectedFilter] = useState("");
  // Dropdown menü durumunu yönetmek için
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Şu anki URL konumunu almak için
  const location = useLocation();
  // URL yönlendirmeleri için
  const history = useHistory();
  // URL parametrelerini almak için
  const { gender, categoryName } = useParams();

  // Ürünlerin olduğu bölüme kaydırma referansı
  const productSectionRef = useRef(null);

  useEffect(() => {
    // URL parametrelerini almak için
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
    dispatch(fetchProducts(limit, offset, categoryId, filterParam, sortParams));

    // Sayfayı ürünlerin olduğu bölüme kaydırma
    if (productSectionRef.current) {
      window.scrollTo({
        top: productSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [dispatch, categoryId, location.search]);

  // Sıralama değişikliğini yönetmek için
  const handleSortChange = (value, type) => {
    if (type === "price") {
      setSelectedPriceSort(value);
      setSelectedRatingSort("");
    } else if (type === "rating") {
      setSelectedRatingSort(value);
      setSelectedPriceSort("");
    }
  };

  // Filtreleme değişikliğini yönetmek için
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  // Filtreleme butonuna tıklama olayını yönetmek için
  const handleFilterButtonClick = () => {
    setPriceSort(selectedPriceSort);
    setRatingSort(selectedRatingSort);
    setFilterState(selectedFilter);
    setCurrentPage(1);
    updateUrlParams({
      priceSort: selectedPriceSort,
      ratingSort: selectedRatingSort,
      filter: selectedFilter,
      page: 1,
    });
  };

  // Sayfa değişikliğini yönetmek için
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrlParams({ page });
  };

  // URL parametrelerini güncellemek için
  const updateUrlParams = (params) => {
    const query = new URLSearchParams(location.search);
    query.set("category", categoryId);
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        query.set(key, params[key]);
      } else {
        query.delete(key);
      }
    });
    history.push({ search: query.toString() });
  };

  // Ürün tıklama olayını yönetmek için
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
                      checked={selectedPriceSort === "price:asc"}
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
                      checked={selectedPriceSort === "price:desc"}
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
                      checked={selectedRatingSort === "rating:asc"}
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
                      checked={selectedRatingSort === "rating:desc"}
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
            value={selectedFilter}
            onChange={handleFilterChange}
          />
          <button
            className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa]"
            onClick={handleFilterButtonClick}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        {isFetching ? (
          <div className="flex items-center justify-center min-h-screen">
            <button className="btn loading">Loading</button>
          </div>
        ) : productList.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] py-16"
            ref={productSectionRef}
          >
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
