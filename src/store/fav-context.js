import React, { useReducer } from "react";

export const FavContex = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultFavtState = {
  items: [],
};
const favReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingFavItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingFavItem = state.items[existingFavItemIndex];
    let updatedItems;
    if (!existingFavItem) {
      updatedItems = state.items.concat(action.item);
    } else {
      updatedItems = state.items;
    }
    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      items: updatedItems,
    };
  }
  return defaultFavtState;
};
const FavProvider = (props) => {
  const [favState, dispatchFavAction] = useReducer(
    favReducer,
    defaultFavtState
  );

  const addItemToFav = (item) => {
    dispatchFavAction({ type: "ADD", item: item });
  };
  const removeItemFromFav = (id) => {
    dispatchFavAction({ type: "REMOVE", id: id });
  };

  const favContext = {
    items: favState.items,
    addItem: addItemToFav,
    removeItem: removeItemFromFav,
  };
  return (
    <FavContex.Provider value={favContext}>{props.children}</FavContex.Provider>
  );
};

export default FavProvider;
