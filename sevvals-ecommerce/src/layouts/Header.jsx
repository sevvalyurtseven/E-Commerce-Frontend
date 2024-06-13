import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faBars,
  faCartShopping,
  faPhone,
  faSearch,
  faUser,
  faPlus,
  faMinus,
  faTrash,
  faSignOutAlt,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHeart } from "@fortawesome/free-regular-svg-icons";
import "./Header.css"; // CSS dosyasını import et
import { NavLink, useHistory } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/actions/clientActions";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../store/actions/shoppingCartActions";

function Header() {
  const dispatch = useDispatch(); // Redux dispatch fonksiyonunu kullanmak için
  const client = useSelector((state) => state.client); // Client durumunu almak için
  const user = client?.user || {}; // Kullanıcı bilgilerini almak için
  const categories = useSelector((state) => state.products.categories); // Kategori bilgilerini almak için
  const cart = useSelector((state) => state.shoppingCart.cart); // Alışveriş sepetini almak için
  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice); // Toplam fiyatı almak için
  const totalCount = useSelector((state) => state.shoppingCart.totalCount); // Toplam ürün sayısını almak için
  const history = useHistory(); // URL yönlendirmeleri için

  const [isMobile, setIsMobile] = useState(false); // Mobil cihaz durumunu yönetmek için
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown menü durumunu yönetmek için
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false); // Sepet dropdown menüyü aç/kapat

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900); // Pencere boyutuna göre mobil durumunu ayarla
    };

    handleResize(); // İlk durumu ayarla

    window.addEventListener("resize", handleResize); // Pencere yeniden boyutlandırıldığında handleResize fonksiyonunu çalıştır
    return () => window.removeEventListener("resize", handleResize); // Bileşen kaldırıldığında event listener'ı kaldır
  }, []);

  const handleLogout = () => {
    dispatch(userLogout()); // Kullanıcıyı çıkış yaptır
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Dropdown menüyü aç/kapat
  };

  const handleCategoryClick = (category) => {
    const gender = category.gender === "k" ? "kadin" : "erkek";
    history.push(
      `/shop/${gender}/${category.code.replace("k:", "").replace("e:", "")}/${
        category.id
      }`
    ); // Kategoriye göre yönlendirme yap
  };

  const handleIncreaseQuantity = (productId, e) => {
    e.stopPropagation();
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId, e) => {
    e.stopPropagation();
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveItem = (productId, e) => {
    e.stopPropagation();
    dispatch(removeItem(productId));
  };

  return (
    <div className="header-container z-50">
      {!isMobile ? (
        <div className="flex flex-col gap-3">
          <div className="header-top">
            <div className="header-top-info">
              <span className="header-top-follow-us">
                <FontAwesomeIcon icon={faPhone} /> (225) 555-0118
              </span>
              <span className="header-top-follow-us">
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                michelle.rivera@example.com
              </span>
            </div>
            <span className="header-top-follow-us">
              Follow Us and get a chance to win 80% off
            </span>
            <div className="flex items-center gap-3 text-white">
              <span className="header-top-follow-us">Follow Us :</span>
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
              <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
            </div>
          </div>
          <div className="header-main">
            <span className="text-slate-800 text-2xl font-bold">Bandage</span>
            <div className="header-main-links">
              <NavLink to="/" className="text-neutral-500 text-base font-bold">
                Home
              </NavLink>
              <div className="relative">
                <NavLink
                  to="/shop"
                  className="text-neutral-500 text-base font-bold"
                >
                  Shop
                </NavLink>
                <button className="btn-ghost p-1" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faAngleDown} />
                </button>
                {isDropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-white rounded-box w-96 grid grid-cols-2 gap-4 absolute"
                  >
                    <li className="menu-title">
                      <span className="text-slate-800 font-bold">Kadın</span>
                      <ul>
                        {categories
                          .filter((cat) => cat.gender === "k")
                          .map((category) => (
                            <li
                              key={category.id}
                              onClick={() => handleCategoryClick(category)}
                              className="dropdown-item"
                            >
                              <span>{category.title}</span>
                            </li>
                          ))}
                      </ul>
                    </li>
                    <li className="menu-title">
                      <span className="text-slate-800 font-bold">Erkek</span>
                      <ul>
                        {categories
                          .filter((cat) => cat.gender === "e")
                          .map((category) => (
                            <li
                              key={category.id}
                              onClick={() => handleCategoryClick(category)}
                              className="dropdown-item"
                            >
                              <span>{category.title}</span>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                )}
              </div>
              <NavLink
                to="/about"
                className="text-neutral-500 text-base font-bold"
              >
                About
              </NavLink>
              <NavLink
                to="/team"
                className="text-neutral-500 text-base font-bold"
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                className="text-neutral-500 text-base font-bold"
              >
                Contact
              </NavLink>
              <NavLink
                to="/pages"
                className="text-neutral-500 text-base font-bold"
              >
                Pages
              </NavLink>
            </div>
            <div className="header-main-auth flex items-center gap-10 mr-10">
              {user.email ? (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost rounded-btn flex items-center mr-20  gap-2 text-lg tracking-wider"
                  >
                    <img
                      src={gravatarUrl(user.email, { size: 40 })}
                      alt="User avatar"
                      className="rounded-full"
                    />
                    <span>{user.name || user.email}</span>
                    <FontAwesomeIcon icon={faAngleDown} />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-4 text-neutral-500  tracking-wider mr-20"
                  >
                    <li className="hover:bg-sky-100 flex items-center gap-2">
                      <NavLink
                        to="/previous-orders"
                        className="flex items-center w-full text-left"
                      >
                        <FontAwesomeIcon icon={faHistory} />
                        <span>Previous Orders</span>
                      </NavLink>
                    </li>
                    <li className="hover:bg-sky-100 flex items-center gap-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <NavLink to="/login">
                    <button className="btn">
                      <FontAwesomeIcon icon={faUser} className="text-sky-500" />
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/signup">
                    <button className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa]">
                      Become a Member
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </NavLink>
                </div>
              )}
              <span>
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <div className="relative">
                <div className="dropdown dropdown-end">
                  <span
                    tabIndex={0}
                    className="relative cursor-pointer"
                    onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {totalCount > 0 && (
                      <span className="ml-2">{totalCount}</span>
                    )}
                  </span>
                  {isCartDropdownOpen && (
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-white rounded-box w-80 max-h-80 overflow-y-auto mt-6"
                    >
                      {cart.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {cart.map((cartItem) => (
                            <li
                              key={cartItem.product.id}
                              className="flex items-start gap-4 mb-2"
                            >
                              <div>
                                <div>
                                  <img
                                    src={cartItem.product.images?.[0]?.url}
                                    alt={cartItem.product.name}
                                    className="w-16 object-contain rounded"
                                  />
                                </div>
                                <div className="flex-grow px-2">
                                  <h5 className="font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis text-slate-950">
                                    {cartItem.product.name}
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    Adet: {cartItem.count}
                                  </p>
                                  <p className="font-bold text-red-500">
                                    {(
                                      cartItem.product.price * cartItem.count
                                    ).toFixed(2)}{" "}
                                    TL
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 text-black">
                                  <button
                                    onClick={(e) =>
                                      handleIncreaseQuantity(
                                        cartItem.product.id,
                                        e
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon icon={faPlus} />
                                  </button>
                                  <button
                                    onClick={(e) =>
                                      handleDecreaseQuantity(
                                        cartItem.product.id,
                                        e
                                      )
                                    }
                                  >
                                    <FontAwesomeIcon icon={faMinus} />
                                  </button>
                                  <button
                                    onClick={(e) =>
                                      handleRemoveItem(cartItem.product.id, e)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                          <div className="mt-4 flex justify-between">
                            <NavLink
                              to="/cart"
                              className="btn bg-gray-200 text-gray-700"
                            >
                              Go To Cart
                            </NavLink>
                            <button className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa]">
                              Complete Order
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">There is no product</p>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <span>
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mobile-header-container">
            <a href="#" className="text-2xl font-bold">
              Bandage
            </a>
            {user.email ? (
              <div className="flex items-center gap-10">
                <img
                  src={gravatarUrl(user.email, { size: 30 })}
                  alt="User avatar"
                  className="rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login">
                  <button className="btn text-sm">Login</button>
                </NavLink>
                <NavLink to="/signup">
                  <button className="btn bg-sky-500 text-white hover:bg-[#e7a0da] hover:text-[#fafafa]">
                    Become a Member
                  </button>
                </NavLink>
              </div>
            )}
            <div className="flex space-x-5 text-xl pl-2">
              <a href="#">
                <FontAwesomeIcon icon={faSearch} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faCartShopping} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faBars} />
              </a>
            </div>
          </div>
          <div className="mobile-header-nav">
            <nav className="mobile-header-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/team">Blog</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/pages">Pages</NavLink>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
