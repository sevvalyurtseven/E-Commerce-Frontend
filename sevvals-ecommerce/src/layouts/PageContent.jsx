import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";

function PageContent() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/product-detail">
          <ProductDetailPage />
        </Route>
      </Switch>
    </>
  );
}

export default PageContent;
