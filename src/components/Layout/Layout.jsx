import ForecastCards from "components/ForecastCards/ForecastCards";
import Header from "components/Header/Header";
import styles from "./Layout.module.scss";
import { ReactComponent as Loader } from "images/loader.svg";
import { useContext } from "react";
import { AppContext } from "context/App.context";

const Layout = () => {
  const { state } = useContext(AppContext);
  return (
    <>
      <Header />
      {state.loading ? (
        <div className={styles.loader}>
          <Loader className={styles.loader__icon} />
        </div>
      ) : (
        <ForecastCards />
      )}
    </>
  );
};

export default Layout;
