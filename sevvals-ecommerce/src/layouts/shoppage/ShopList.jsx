import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
} from "../../store/actions/productActions";
import ProductCard from "../../components/ProductCard";
import ReactPaginate from "react-paginate";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faListCheck,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";

function ShopList({ gender, categoryName, categoryId, handleProductClick }) {
  const dispatch = useDispatch();
  const { productList, total, isFetching } = useSelector(
    (state) => state.products
  );

  const categories = useSelector((state) => state.products.categories);

  console.log("ShopList paramsssss:", { gender, categoryName, categoryId });

  const [currentPage, setCurrentPage] = useState(1);
  const [priceSort, setPriceSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");
  const [filter, setFilterState] = useState("");
  const [selectedPriceSort, setSelectedPriceSort] = useState("");
  const [selectedRatingSort, setSelectedRatingSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const productSectionRef = useRef(null);

  const itemsPerPage = 28;

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

    const limit = itemsPerPage;
    const offset = (pageParam - 1) * limit;
    const sortParams = [priceSortParam, ratingSortParam]
      .filter(Boolean)
      .join(",");
    dispatch(fetchProducts(limit, offset, categoryId, filterParam, sortParams));

    if (productSectionRef.current) {
      window.scrollTo({
        top: productSectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [dispatch, categoryId, location.search]);

  const handleSortChange = (value, type) => {
    if (type === "price") {
      setSelectedPriceSort(value);
      setSelectedRatingSort("");
    } else if (type === "rating") {
      setSelectedRatingSort(value);
      setSelectedPriceSort("");
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

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
      offset: 0,
    });
  };

  const handlePageChange = (data) => {
    const newPage = data.selected + 1;
    const offset = (newPage - 1) * itemsPerPage;
    setCurrentPage(newPage);
    updateUrlParams({ page: newPage, limit: itemsPerPage, offset });
  };

  const updateUrlParams = (params) => {
    const query = new URLSearchParams(location.search);
    if (categoryId) {
      query.set("category", categoryId);
    } else {
      query.delete("category");
    }
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined) {
        query.set(key, params[key]);
      } else {
        query.delete(key);
      }
    });
    history.push({ search: query.toString() });
  };

  const handleCategoryChange = () => {
    setSelectedPriceSort("");
    setSelectedRatingSort("");
    setCurrentPage(1);
  };

  useEffect(() => {
    handleCategoryChange();
  }, [categoryId]);

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
              className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa] m-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                padding: "0.5rem 0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              Sort By{" "}
              <FontAwesomeIcon icon={faAngleDown} className="items-center" />
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
            className="input input-bordered sm:px-2"
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
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] py-20"
            ref={productSectionRef}
          >
            {productList.map((product) => (
              <div
                key={product.id}
                className="transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer pb-10"
              >
                <ProductCard
                  image={product.images[0]?.url}
                  title={product.name}
                  department={product.description}
                  originalPrice={product.price}
                  discountedPrice={product.price}
                  product={product}
                  category={categories.find(
                    (category) => category.id === product.category_id
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-md font-bold leading-normal tracking-widest">
            No products found for this category.
          </p>
        )}
        {productList.length > 0 && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            forcePage={currentPage - 1}
          />
        )}
      </div>
    </div>
  );
}

export default ShopList;
