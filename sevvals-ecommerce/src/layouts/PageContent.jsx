import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";

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
      </Switch>
    </>
  );
}

export default PageContent;
