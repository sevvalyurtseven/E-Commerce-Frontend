import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PageContent() {
  const history = useHistory();

  const handleProductClick = (product) => {
    const productNameSlug = product.name.toLowerCase().replace(/\s+/g, "-");

    const urlParts = ["shop"];
    if (product.gender) urlParts.push(product.gender);
    if (product.categoryName) urlParts.push(product.categoryName);
    if (product.categoryId) urlParts.push(product.categoryId);

    urlParts.push(productNameSlug);
    urlParts.push(product.id);

    const url = `/${urlParts.join("/")}`;

    history.push(url);
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
        exact
        path="/shop/:productNameSlug/:productId"
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
