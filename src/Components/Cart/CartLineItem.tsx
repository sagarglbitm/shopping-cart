import React, { ChangeEvent, ReactElement, useState } from "react";
import { CartItemType } from "../../context/CartProvider";
import { ReducerAction } from "../../context/CartProvider";
import { ReducerActionType } from "../../context/CartProvider";
import data from "../../data/db.json"
import "./cart.css"

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
};
const CartLineItem = ({ item, dispatch, REDUCER_ACTIONS }: PropsType) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const size = item.sizes;
  const inputSize = size ;
 
  function capitalizeFirstLetter(inputSize: string){
    if(inputSize.length>0){
      return inputSize.charAt(0).toUpperCase() + inputSize.slice(1);
    }
    else{
      return inputSize;
    }
  }
 
  const splitArray = inputSize.split(/[^a-zA-z]+/)
 
  const firstletter = splitArray[0][0]
 
  const capitalizedFirstLetter = capitalizeFirstLetter(firstletter)
  

  const productInData = data.products.find((product) => product.id === item.id);

  if (!productInData) {
    throw new Error("Product not found");
  }

  const availableQuantity = productInData.quantity[size as "small" | "medium" | "large"]

 console.log("checking quantity", availableQuantity)

  // const img: string[] = data.products.map((item: {image: string}) => item.image);

  const LineTotal: number = item.quantity * item.price;

  const highestQty: number = 20 > availableQuantity ? availableQuantity : 20;

  const optionValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  );

  const options: ReactElement[] = optionValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQty = Number(e.target.value);

    if (productInData &&  productInData.quantity) {
      setErrorMessage("");

      dispatch({
        type: REDUCER_ACTIONS.QUANTITY,

        payload: { ...item, quantity: Number(e.target.value) },
      });
    } else {
      setErrorMessage("Cannot Add more products");
    }
  };

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    });

  const content = (
    <li className="cart__item">
      <img src={item.image_url} alt={item.product_name} className="cart__img" />
      <div aria-label="Item Name" className="font-styling__cart">{item.product_name}</div>
      <div aria-label="Price Per Item" className="font-styling__cart">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(item.price)}
      </div>

      <div className="font-styling__cart">
        Size:{capitalizedFirstLetter}
      </div>

      <label htmlFor="itemQty" className="offscreen font-styling__cart">
        Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select"
        value={item.quantity}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>
      {errorMessage && <p className="error- message">{errorMessage}</p>}

      <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(LineTotal)}
      </div>

      <button
        className="cart__button"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="delete_button"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        {/* ❌ */}
      </button>
    </li>
  );
  return content;
};

export default CartLineItem;
