import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTruck } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import {
  format,
  addDays,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  toggleItemSelection,
} from "../../store/actions/shoppingCartActions";
import OrderSummary from "../../components/OrderSummary";

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);
  const freeShippingThreshold = 400;
  // Ürün miktarını artırma fonksiyonu
  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Ürün miktarını azaltma fonksiyonu
  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };
  // Sepetten ürün kaldırma fonksiyonu
  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  // Ürün seçimini açma/kapama fonksiyonu
  const handleToggleSelection = (productId) => {
    dispatch(toggleItemSelection(productId));
  };

  // Tahmini kargo tarihini hesaplama fonksiyonu
  const calculateShippingDate = () => {
    const currentDate = new Date();
    let shippingDate;

    if (isThursday(currentDate)) {
      shippingDate = addDays(currentDate, 4); // Perşembe günü verilen siparişler pazartesi kargoya verilir
    } else if (
      isFriday(currentDate) ||
      isSaturday(currentDate) ||
      isSunday(currentDate)
    ) {
      shippingDate = addDays(currentDate, 3); // Cuma, cumartesi veya pazar günü verilen siparişler pazartesi kargoya verilir
    } else {
      shippingDate = addDays(currentDate, 2); // Diğer günlerde 2 gün sonra kargoya verilir
    }

    return format(shippingDate, "EEEE, MMMM d");
  };

  // Tahmini kargo süresini al
  const estimatedShippingTime = calculateShippingDate();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
        {/* Sepetteki Ürün Listesi */}
        <div className="w-full lg:w-2/3 space-y-4 overflow-y-auto">
          <div className="bg-white shadow-md rounded-lg p-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className={`flex flex-col md:flex-row items-center justify-between border-b py-2 ${
                  item.checked ? "" : "opacity-50"
                }`}
              >
                <div className="flex items-center w-full md:w-1/2 mb-4 md:mb-0">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleSelection(item.product.id)}
                    className="checkbox checkbox-success mr-2"
                  />
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-20 object-contain rounded-md"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-bold truncate">
                      {item.product.name}
                    </h4>
                    <p className="line-clamp-2 w-full">
                      {item.product.description}
                    </p>
                    <div className="flex items-center mt-2 text-gray-500 text-xs">
                      <FontAwesomeIcon icon={faTruck} className="mr-2" />
                      <span>Shipping Time: {estimatedShippingTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full md:w-1/3 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <button
                      className="btn btn-outline text-sky-500 btn-sm"
                      onClick={() => handleDecrease(item.product.id)}
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      className="btn btn-outline text-sky-500 btn-sm"
                      onClick={() => handleIncrease(item.product.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end w-full md:w-1/6 mb-4 md:mb-0">
                  <p className="font-bold whitespace-nowrap">
                    {(item.product.price * item.count).toFixed(2)} TL
                  </p>
                  <button
                    className="btn btn-sm ml-2"
                    onClick={() => handleRemove(item.product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Sipariş Özeti */}
        <div className="w-full lg:w-1/3 max-w-md lg:ml-10">
          <OrderSummary />
        </div>
      </div>
      {/* Ücretsiz Kargo Bilgilendirmesi */}
      <div className="sticky bottom-0 bg-yellow-100 bg-opacity-75 p-2 rounded-lg shadow-md text-center mt-4 mx-4 w-[25%]">
        <p className="text-sm font-bold text-yellow-700 flex items-center justify-center tracking-tight">
          🚚 Free shipping for orders over {freeShippingThreshold} TL! 🚚
        </p>
      </div>
    </div>
  );
}

export default ShoppingCart;
