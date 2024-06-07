import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";

function PageContent() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/shop/:gender/:categoryName/:categoryId"
        component={ShopPage}
      />
      <Route exact path="/shop" component={ShopPage} />
      <Route path="/product-detail/:productId" component={ProductDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

export default PageContent;
