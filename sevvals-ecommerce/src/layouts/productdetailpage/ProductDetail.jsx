import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductById } from "../../store/actions/productActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faStar,
  faHeart,
  faEye,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/featured-posts/product-colors.png";

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { product, isFetchingProduct } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleBackClick = () => {
    history.goBack();
  };

  if (isFetchingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button className="btn loading">Loading</button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] sm:px-20 px-0">
      <button onClick={handleBackClick} className="btn btn-outline">
        <FontAwesomeIcon icon={faAngleLeft} /> Back
      </button>
      {product && (
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/2">
              <img
                src={product.images[0]?.url}
                className="w-full h-full object-cover rounded-md"
                alt={product.name}
              />
            </div>
            <div className="flex flex-col md:w-1/2 mt-10 md:mt-0 md:ml-10 px-10 gap-1">
              <h2 className="md:text-2xl text-3xl font-base leading-normal tracking-wider text-slate-800">
                {product.name}
              </h2>
              <div className="flex items-center mt-3">
                <span className="text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="mr-2 md:text-lg text-3xl"
                    />
                  ))}
                </span>
                <span className="ml-2 md:text-lg text-xl text-neutral-500 font-bold leading-normal">
                  {product.rating} Reviews
                </span>
              </div>
              <div className="mt-3">
                <span className="text-4xl md:text-2xl font-bold tracking-wider leading-normal abril-fatface">
                  ${product.price}
                </span>
                <div className="mt-2">
                  <span className="text-neutral-500 text-xl md:text-sm tracking-wider font-bold">
                    Availability :{" "}
                  </span>
                  <span className="text-sky-500 text-xl md:text-sm tracking-wider font-bold">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="mt-10 mb-5">
                  <p className="text-gray-500 text-2xl md:text-base tracking-wider leading-normal font-base">
                    {product.description}
                  </p>
                </div>
                <hr />
                <img
                  className="mt-5 md:mt-3 w-[40%] md:w-[20%]"
                  src={colors}
                  alt="product colors"
                />
                <div className="md:mt-5 mt-10 flex items-center space-x-2">
                  <button className="px-7 md:px-5 py-4 md:py-2 bg-sky-500 text-white rounded-md font-bold">
                    Select Options
                  </button>
                  <button className="md:px-4 px-5 md:py-3 py-4 border rounded-full">
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className="md:px-4 px-5 md:py-3 py-4 border rounded-full">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                  <button className="md:px-4 px-5 md:py-3 py-4 border rounded-full">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
