import { Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Main from "../pages/Main";
import InCategory from "../pages/InCategory";
import EditBase from "../pages/editTrack/EditBase";
import EditRecord from "../pages/editTrack/EditRecord";
import Login from "../pages/Login";
import CategoryModal from "../components/CategoryModal";
import PortfolioPage from "../pages/PortfolioPage";
import MyPage from "../pages/MyPage";

function App() {
  return (
    <>
      <GlobalStyles />

      <Route path="/" component={InCategory} exact />
      <Route path="/" component={Main} exact />
      <Route path="/edit/base" component={EditBase} exact />
      <Route path="/edit/record" component={EditRecord} exact />
      <Route exact path="/portfolio" component={PortfolioPage} />
      <Route exact path="/mypage" component={MyPage} />
    </>
  );
}

export default App;
