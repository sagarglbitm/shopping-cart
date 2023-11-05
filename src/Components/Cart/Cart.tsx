
import React, { useContext, useEffect, useState } from 'react';
 
import useCart from '../../hooks/useCart';
 
import CartLineItem from './CartLineItem';
 
import Navbar from '../Navbar/Navbar';
 
import { AuthContext } from '../AuthProvider/AuthProvider';
 
import { useNavigate } from 'react-router-dom';
 
const Cart = () => {
 
  const navigate = useNavigate();
 
  const { isLoggedIn } = useContext(AuthContext);
 
  const [confirm, setConfirm] = useState(false);
 
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();
 
  useEffect(() => {
 
    const storedCart = sessionStorage.getItem('Cart');
 
    if (storedCart) {
 
      dispatch({
 
        type: REDUCER_ACTIONS.INITIALIZE_CART,
 
        payload: JSON.parse(storedCart),
 
      });
 
    }
 
  }, [dispatch, REDUCER_ACTIONS]);
 
  const onSubmitOrder = () => {
 
    if (!isLoggedIn) {
 
      navigate('/login');
 
    } else {
 
      navigate('/order');
 
    }
 
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
 
    setConfirm(true);
 
  };
 
  useEffect(() => {
 
    // Store cart data in sessionStorage
 
    sessionStorage.setItem('Cart', JSON.stringify(cart));
    sessionStorage.setItem("TotalPrice",JSON.stringify(totalPrice));
 
  }, [cart]);
 
  const pageContent = confirm ? (
 
    <h2>Thank you for your order</h2>
 
  ) : (
 
    <>
 
      <h2 className="offscreen">Cart</h2>
 
      <ul className="cart">
 
        {cart.map((item) => (
 
          <CartLineItem key={item.id} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
 
        ))}
 
      </ul>
 
      <div className="cart__totals">
 
        <p className='cartTotals_para1'>Total Items: {totalItems}</p>
 
        <p className='cartTotals_para2'>Total Price: {totalPrice}</p>
 
        <button className="cart__submit" disabled={!totalItems} onClick={onSubmitOrder}>
 
          Place Order
 
        </button>
 
      </div>
 
      <div className=" pay-images">
        Our Payment Partners:
        <img className="footer-bank-ssl" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png" width="80" height="37"/>
        <img className="footer-bank-visa" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png" width="70" height="37" />
        <img className="footer-bank-mc" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png" width="70" height="37"></img>
        <img className="footer-bank-ae" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png" width="70" height="37"></img>
        <img className="footer-bank-nb" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png" width="70" height="37"></img>
        <img className="footer-bank-rupay" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png" width="70" height="37"></img>
        <img className="footer-bank-paypal" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png" width="70" height="37"></img>
        <img className="footer-bank-bhim" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png" width="70" height="37"></img>
        </div>
 
    </>
 
  );
 
  const content = (
 
    <main className="main main--cart">
 
      <Navbar onGenderChange={onGenderChange} />
 
      {pageContent}
 
    </main>
 
  );
 
  return content;
 
};
 
export default Cart;
 
 
function onGenderChange(gender: string): void {
  throw new Error('Function not implemented.')
}




// import React, { useContext, useEffect, useState } from "react";

// import useCart from "../../hooks/useCart";

// import CartLineItem from "./CartLineItem";

// import Navbar from "../Navbar/Navbar";

// import { AuthContext } from "../AuthProvider/AuthProvider";

// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const navigate = useNavigate();

//   const { isLoggedIn } = useContext(AuthContext);

//   const [confirm, setConfirm] = useState(false);

//   const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart();

//   useEffect(() => {
//     const storedCart = sessionStorage.getItem("cart");

//     if (storedCart) {
//       dispatch({
//         type: REDUCER_ACTIONS.INITIALIZE_CART,

//         payload: JSON.parse(storedCart),
//       });
//     }
//   }, [dispatch, REDUCER_ACTIONS]);

//   const onSubmitOrder = () => {
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else {
//       navigate("/order");
//     }

//     dispatch({ type: REDUCER_ACTIONS.SUBMIT });

//     setConfirm(true);
//   };

//   useEffect(() => {
//     // Store cart data in sessionStorage

//     sessionStorage.setItem("Cart", JSON.stringify(cart));
//     sessionStorage.setItem("TotalPrice",JSON.stringify(totalPrice));
//   }, [cart]);

//   const pageContent = confirm ? (
//     <h2>Thank you for your order</h2>
//   ) : (
//     <>
//       <h2 className="offscreen">Cart</h2>

//       <ul className="cart">
//         {cart.map((item) => (
//           <CartLineItem
//             key={item.id}
//             item={item}
//             dispatch={dispatch}
//             REDUCER_ACTIONS={REDUCER_ACTIONS}
//           />
//         ))}
//       </ul>

//       <div className="cart__totals">
//         <p>Total Items: {totalItems}</p>

//         <p>Total Price: {totalPrice}</p>

//         <button
//           className="cart__submit"
//           disabled={!totalItems}
//           onClick={onSubmitOrder}
//         >
//           Place Order
//         </button>
//       </div>
//     </>
//   );

//   const content = (
//     <main className="main main--cart">
//       <Navbar onGenderChange={onGenderChange} />

//       {pageContent}
//     </main>
//   );

//   return content;
// };

// export default Cart;

// function onGenderChange(gender: string): void {
//   throw new Error("Function not implemented.");
// }
