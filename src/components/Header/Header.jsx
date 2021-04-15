import { useRef, useContext, useState, useEffect } from "react";
import { AppContext } from "context/App.context";
import { AUTOCOMPLETE_DATA, CHANGE_CITY } from "utils/constants";
import styles from "./Header.module.scss";
import pinIcon from "images/pin.svg";
import searchIcon from "images/search.svg";
import { getSearchResults } from "utils/api";
import Autocomplete from "components/Autocomplete/Autocomplete";
import useDebounce from "hooks/useDebounce";

const Header = () => {
  const inputRef = useRef("");

  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm.length < 3) {
        return;
      }
      const searchApi = async (term) => {
        const res = await getSearchResults(term);
        dispatch({
          type: AUTOCOMPLETE_DATA,
          payload: {
            citiesSearches: res,
          },
        });
      };
      if (debouncedSearchTerm) {
        searchApi(debouncedSearchTerm);
      } else {
        dispatch({
          type: AUTOCOMPLETE_DATA,
          payload: {
            citiesSearches: [],
          },
        });
      }
    },
    [debouncedSearchTerm, dispatch] // Only call effect if debounced search term changes
  );

  const updateCity = () => {
    if (!inputRef.current.value) {
      return;
    }
    if (state.location !== inputRef.current.value) {
      // clear searches data
      dispatch({
        type: AUTOCOMPLETE_DATA,
        payload: {
          citiesSearches: [],
        },
      });
      // trigger city change
      dispatch({
        type: CHANGE_CITY,
        payload: {
          location: inputRef.current.value,
        },
      });
    }
  };

  return (
    <div className={styles.header}>
      <header>
        <h1>Weather Forecast</h1>
      </header>
      <section className={styles.header__section}>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className={styles.header__input}
          ref={inputRef}
          placeholder={state.location}
        />
        <img src={pinIcon} alt="" className={styles.header__pin} />
        <img
          src={searchIcon}
          alt=""
          className={styles.header__search}
          onClick={updateCity}
        />
      </section>
      {state.citiesSearches?.length ? <Autocomplete /> : null}
      {state.status === "failed" && (
        <span className={styles.header__error}>
          Oops! Please enter correct city name
        </span>
      )}
    </div>
  );
};

export default Header;
