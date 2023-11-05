

import React, { createContext, useReducer, useMemo, ReactElement } from "react";
import {useEffect} from 'react';
 
import data from "../../src/data/db.json";
 
export type CartItemType = {
  id: number;
 
  product_name: string;
 
  sizes: string;
 
  image_url: string;
 
  price: number;
 
  quantity: number;
};
 
type CartStateType = { cart: CartItemType[] };
 
const initCartState: CartStateType = { cart: [] };
 
const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
 
  REMOVE: "REMOVE",
 
  QUANTITY: "QUANTITY",
 
  SUBMIT: "SUBMIT",
 
  INITIALIZE_CART: "INITIALIZE_CART",
 
  // LOAD_FROM_STORAGE: "LOAD_FROM_STORAGE",
};
 
export type ReducerActionType = typeof REDUCER_ACTION_TYPE;
 
export type ReducerAction = {
  type: string;
 
  payload?: CartItemType;
};
 
const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
 
    case REDUCER_ACTION_TYPE.INITIALIZE_CART:{
      if(action.payload && Array.isArray(action.payload)){
        return {...state, cart: action.payload};
      }
      return state;
    }
 
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in ADD action");
      }
 
      const { id, product_name, image_url, price, sizes, quantity } =
        action.payload;
 
      const product = data.products.find((product) => product.id === id);
 
      if (!product) {
        throw new Error("Product not found");
      }
 
      const availableQuantity =
        product.quantity[sizes as "small" | "medium" | "large"];
 
      const itemInCart = state.cart.find(
        (item) => item.id === id && item.sizes === sizes
      );
     
      if (itemInCart) {
        const newTotalQuantity = itemInCart.quantity + quantity;
 
        if (newTotalQuantity <= availableQuantity) {
          const updatedCart = state.cart.map((item) =>
            item.id === id && item.sizes === sizes
              ? { ...item, quantity: newTotalQuantity }
              : item
          );
 
          return {
            ...state,
 
            cart: updatedCart,
          };
        }
      } else {
        if (quantity <= availableQuantity) {
          return {
            ...state,
 
            cart: [
              ...state.cart,
 
              { id, product_name, image_url, sizes, price, quantity },
             
            ],
          };
        }
      }
     
      return state;
    }
 
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw Error("action.payload missing in REMOVE action");
      }
 
      const { id, sizes } = action.payload;
 
      const updatedCart = state.cart.filter(
        (item) => item.id !== id || item.sizes !== sizes
      );
     
      return { ...state, cart: updatedCart };
    }
 
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in QUANTITY action");
      }
 
      const { id, sizes, quantity } = action.payload;
 
      const itemInCart = state.cart.find(
        (item) => item.id === id && item.sizes === sizes
      );
 
      if (!itemInCart) {
        throw new Error("Item must exist in order to update quantity");
      }
 
      const updatedItem: CartItemType = { ...itemInCart, quantity };
 
      const updatedCart = state.cart.map((item) =>
        item.id === id && item.sizes === sizes ? updatedItem : item
      );
 
      return { ...state, cart: updatedCart };
    }
 
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
 
    // case REDUCER_ACTION_TYPE.LOAD_FROM_STORAGE: {
    //   if(action.payload && Array.isArray(action.payload)){
    //     return {...state, cart: action.payload}
    //   }
    //   return state;
    // }
 
    default:
      throw new Error("Unidentified reducer action type");
  }
 
 
};
 
const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);
 
  useEffect(()=> {
    const storedCart = sessionStorage.getItem("cart123");
    if (storedCart){
      dispatch({type: REDUCER_ACTION_TYPE.INITIALIZE_CART, payload: JSON.parse(storedCart)})
    }
  },[])
 
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);
 
 
  const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.quantity;
  }, 0);
 
  const totalPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
 
    currency: "INR",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.quantity * cartItem.price;
    }, 0)
  );
 
 
  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.id);
 
    const itemB = Number(b.id);
 
    return itemA - itemB;
  });
 
 
 
  console.log("cart consoling",cart)
  return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};
 
export type UseCartContextType = ReturnType<typeof useCartContext>;
 
const initCartContextState: UseCartContextType = {
  dispatch: () => {},
 
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
 
  totalItems: 0,
 
  totalPrice: "",
 
  cart: [],
};
 
export const CartContext =
  createContext<UseCartContextType>(initCartContextState);
 
type ChildrenType = { children?: ReactElement | ReactElement[] };
 
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};
 