import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

function OrderSummary() {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const shippingCost = 29.99;
  const freeShippingThreshold = 400;
  const discountThreshold = 1000;
  const discountCode = "SEVVAL10"; // Örnek indirim kodu
  const discountPercentage = 0.1; // %10 indirim
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  // İndirim kodunu uygulama fonksiyonu
  const handleApplyDiscountCode = () => {
    if (
      appliedDiscountCode === discountCode &&
      totalPrice >= discountThreshold
    ) {
      setDiscountAmount(totalPrice * discountPercentage);
      setIsDiscountApplied(true);
      toast.success("Discount code applied successfully!");
    } else {
      setDiscountAmount(0);
      setIsDiscountApplied(false);
      toast.error("Invalid discount code or minimum purchase not met.");
    }
  };

  // Sepetteki ürünlerin toplam fiyatını hesaplama fonksiyonu
  const calculateTotalPrice = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.product.price * item.count, 0)
      .toFixed(2);
  };

  // Sepetteki ürünlerin toplam miktarını hesaplama fonksiyonu
  const calculateTotalQuantity = () => {
    return cart
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.count, 0);
  };
  // Toplam fiyat ve toplam miktar için state
  const [totalPrice, setTotalPrice] = useState(
    parseFloat(calculateTotalPrice())
  );
  const [totalQuantity, setTotalQuantity] = useState(calculateTotalQuantity());

  // Sepet değiştiğinde toplam fiyat ve toplam miktarı güncellemek için effect
  useEffect(() => {
    setTotalPrice(parseFloat(calculateTotalPrice()));
    setTotalQuantity(calculateTotalQuantity());

    // Toplam fiyat indirim eşiğinin altına düştüğünde indirimi kaldır
    if (isDiscountApplied && totalPrice < discountThreshold) {
      setDiscountAmount(0);
      setIsDiscountApplied(false);
      toast.info(
        "Toplam tutar eşik değerinin altına düştüğü için indirim kodu kaldırıldı."
      );
    } else if (isDiscountApplied) {
      setDiscountAmount(totalPrice * discountPercentage);
    }
  }, [cart, totalPrice, isDiscountApplied]);

  // Siparişin ücretsiz kargo için uygun olup olmadığını kontrol et
  const isFreeShipping = totalPrice >= freeShippingThreshold;
  // İndirimler ve kargo maliyetleri uygulandıktan sonra nihai toplam fiyatı hesapla
  const finalTotalPrice = isFreeShipping
    ? totalPrice - discountAmount
    : totalPrice + shippingCost - discountAmount;

  return (
    <div className="bg-blue-100 shadow-md rounded-lg p-4 text-center sticky top-4">
      <h3 className="text-xl font-bold mb-4 text-blue-700 tracking-widest">
        Order Summary
      </h3>
      <div className="mb-4 space-y-2 text-left tracking-wider">
        <p className="flex justify-between text-blue-600 font-medium">
          <span>Total Quantity:</span>
          <span>{totalQuantity}</span>
        </p>
        <p className="flex justify-between text-blue-600 font-medium">
          <span>Total Price:</span>
          <span>{totalPrice.toFixed(2)} TL</span>
        </p>
        <p className="flex justify-between text-blue-600 font-medium">
          <span>Shipping Cost:</span>
          <span className={isFreeShipping ? "line-through" : ""}>
            {isFreeShipping ? "FREE" : `${shippingCost} TL`}
          </span>
        </p>
        <p className="flex justify-between text-blue-600 font-medium">
          <span>Discount:</span>
          <span>
            {discountAmount > 0 ? `-${discountAmount.toFixed(2)} TL` : "0 TL"}
          </span>
        </p>
        <p className="flex justify-between font-bold text-blue-700">
          <span>Total:</span>
          <span>{finalTotalPrice.toFixed(2)} TL</span>
        </p>
        {/* İndirim Kodu Girişi */}
        <div className="mt-4 space-y-2 tracking-widest">
          <input
            type="text"
            className="input input-bordered w-full mb-2"
            placeholder="Enter discount code"
            value={appliedDiscountCode}
            onChange={(e) => setAppliedDiscountCode(e.target.value)}
          />
          <button
            className="btn btn-outline w-full tracking-widest"
            onClick={handleApplyDiscountCode}
          >
            Apply Discount
          </button>
        </div>
        <p className="text-green-500 font-bold mt-2 text-xs tracking-tight">
          Use code "SEVVAL10" for 10% off orders over 1000 TL! 🎉
        </p>
      </div>
      <Link
        to="/order"
        className="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-sm tracking-widest"
      >
        Create Order
      </Link>
    </div>
  );
}

export default OrderSummary;
