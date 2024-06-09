import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";

function PageContent() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  const handleProductClick = (product) => {
    console.log("producttttttt", product);
    const productNameSlug = product.name.toLowerCase().replace(/\s+/g, "-");
    const url = `/shop/${product.gender}/${product.categoryName}/${product.categoryId}/${productNameSlug}/${product.id}`;

    history.push(url);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <HomePage {...props} handleProductClick={handleProductClick} />
        )}
      />
      <Route
        exact
        path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
        render={(props) => (
          <ProductDetailPage
            {...props}
            handleProductClick={handleProductClick}
          />
        )}
      />
      <Route
        path="/shop/:gender/:categoryName/:categoryId"
        render={(props) => (
          <ShopPage {...props} handleProductClick={handleProductClick} />
        )}
      />
      <Route
        exact
        path="/shop"
        render={(props) => (
          <ShopPage {...props} handleProductClick={handleProductClick} />
        )}
      />
      <Route path="/contact" component={ContactPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

export default PageContent;
