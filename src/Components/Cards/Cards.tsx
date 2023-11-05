
import React, { useState } from "react";
import "./Cards.scss";
import Button from "../Button/Button";
import {  ReducerAction } from '../../context/CartProvider';
import { ReducerActionType } from "../../context/CartProvider";
import { toast,ToastContainer } from "react-toastify";
 
 
type PropsType = {
  id: number;
  product_name: string;
  price: number;
  sizes: string[];
  color: string;
  quantity: { small: number; medium: number; large: number; };
  gender: string;
  description: string;
  image_url: string;
  rating?: number;
  category?: string;
  material?: string;
  delivery_date?: string
 
}
 
export interface CardProps {
  id: number;
  image_url: string;
  product_name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  color: string;
  gender?: string;
  sizes: string[];
  materials: string;
  quantity: Record<string, number>;
  delivery_date?: string
 
  renderStars: (rating: number) => React.ReactNode;
  onAddToCart: ( product:CardProps,selectedSize: string) => void;
}
 
const Card: React.FC<CardProps> = ({
  id,
  image_url,
  product_name,
  price,
  description,
  category,
  rating,
  color,
  sizes,
  materials,
  quantity,
  gender,
  delivery_date,
  renderStars,
  onAddToCart,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
 
  const handleAddToCartClick = () => {
    if (selectedSize) {
      onAddToCart( {id, image_url,product_name,
        price,
        description,
        category,
        rating,
        color,
        sizes,
        materials,
        quantity,
        gender,
        delivery_date,
        renderStars,
        onAddToCart, },selectedSize);
      // alert("Item added");
    } else {
      toast("Please select a size.");
      
    }
  };
  const displayDescription = () => {
    setIsDescriptionVisible(true);
  };
 
  const hideDescription = () => {
    setIsDescriptionVisible(false);
    setIsPopupVisible(false);  // Close the size selection popup
    setSelectedSize(null);
  };
  // Reset the selected size when popup is closed
  const handlePopupClose = () => {
    setIsPopupVisible(false);
    setSelectedSize(null);
  };
 
  return (
    <div className="card-deck">
      <div className="card">
        <img className="card-img-top custom-img" src={image_url} alt="Product" />
        <div className="card-body">
          <h5 className="card-title">{product_name}</h5>
          <div className="price-rating">
            <span className="card-price">Price: {price}</span>
            <span className="rating-stars">{renderStars(rating)}</span>
            <span className="rating-value">{rating}</span>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              label="Add to Cart"
              className="btn-1"
              onClick={() => setIsPopupVisible(true)}
            />
            <Button
              label="Description"
              className="btn-2"
              onClick={displayDescription}
            />
          </div>
        </div>
        {/* Pop-up for displaying Description */}
        {isDescriptionVisible && (
          <div className="description-popup">
            <div className="description-popup-content">
              <span className="close1" onClick={hideDescription}>
                &times;
              </span>
              <h2>{product_name}</h2>
              <img className="description-img" src={image_url} alt="product" />
              <div className="des-content">
                <p>
                  <b>Sizes:</b>{" "}
                  {sizes
                    .filter((size) => quantity[size] > 0) // Filter sizes with quantity > 0
                    .join(", ")}
                </p>
                <br></br>
 
                <p>
                  <b>Category: </b>
                  {category}
                </p>
                <br></br>
                <p>
                  <b>Color: </b>
                  {color}
                </p>
                <br></br>
                <p>
                  <b>Material used: </b>
                  {materials}
                </p>
                <br></br>
                <p>
                  <b>Description: </b>
                  {description}
                </p>
                <br></br>
                <p>
                  <b>
                    <i>Product will be delivered within 7 days</i>
                  </b>
                </p>
                <br></br>
                <br></br>
                <br></br>
                <p className="returns">
                  <i>14 days easy exchange/returns </i>🩷{" "}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* New popup for selecting a size */}
        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handlePopupClose}>
                &times;
              </span>
              <h2>Select Size</h2>
              <div className="size-selection">
                {sizes
                  .filter((size) => quantity[size] > 0)
                  .map((size) => (
                    <Button
                      key={size}
                      label={size}
                      className={`size-button ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                    />
                  ))}
              </div>
              <Button
                label="Add"
                className="add-btn"
                onClick={handleAddToCartClick}
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
 
export default Card;












// import React, { useState,useEffect } from "react";
// import "./Cards.scss";
// import Button from "../Button/Button";
// import {  ReducerAction } from '../../context/CartProvider';
// import { ReducerActionType } from "../../context/CartProvider";
// import { toast,ToastContainer } from "react-toastify";


// type PropsType = {
//   id: number; 
//   product_name: string; 
//   price: number; 
//   sizes: string[]; 
//   color: string; 
//   quantity: { small: number; medium: number; large: number; }; 
//   gender: string; 
//   description: string;
//   image_url: string;
//   rating?: number;
//   category?: string;
//   material?: string;
//   delivery_date?: string
  
// }

// export interface CardProps {
//   id: number;
//   image_url: string;
//   product_name: string;
//   price: number;
//   description: string;
//   category: string;
//   rating: number;
//   color: string;
//   gender?: string;
//   sizes: string[];
//   materials: string;
//   quantity: Record<string, number>;
//   delivery_date?: string

//   renderStars: (rating: number) => React.ReactNode;
//   onAddToCart: ( product:CardProps,selectedSize: string) => void;
// }

// const Card: React.FC<CardProps> = ({
//   id,
//   image_url,
//   product_name,
//   price,
//   description,
//   category,
//   rating,
//   color,
//   sizes,
//   materials,
//   quantity,
//   gender,
//   delivery_date,
//   renderStars,
//   onAddToCart,
// }) => {
//   const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   // const [sizeMessage, setSizeMessage] = useState("");
//   // const [isAddClicked, setIsAddClicked] = useState(false);
//   // useEffect(() => {
//   //   if (sizeMessage) {
//   //     const timer = setTimeout(() => {
//   //       setSizeMessage("");
//   //     }, 2000);
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [sizeMessage]);
//   const handleAddToCartClick = () => {
//     if (selectedSize) {
//       // toast("Item added to cart successfully! ✅");
//       onAddToCart(
//         {
//           id,
//           image_url,
//           product_name,
//           price,
//           description,
//           category,
//           rating,
//           color,
//           sizes,
//           materials,
//           quantity,
//           gender,
//           delivery_date,
//           renderStars,
//           onAddToCart,
//         },
//         selectedSize
//       );
//       handlePopupClose();
//       // setTimeout(() => {
//       //   setSizeMessage("");
//       //   handlePopupClose();
//       // }, 1000);
//     } else {
//       if (isPopupVisible) {
//         // Show an error message only if the pop-up is visible
//         setSizeMessage("Please select a size.");
//       } 
//     }
//   };

  
 
//   const displayDescription = () => {
//     setIsDescriptionVisible(true);
//   };

//   const hideDescription = () => {
//     setIsDescriptionVisible(false);
//     setIsPopupVisible(false);  // Close the size selection popup
//     setSelectedSize(null);
//   };
//   // Reset the selected size when popup is closed
//   const handlePopupClose = () => {
//     setIsPopupVisible(false);
//     setSelectedSize(null);
//     setIsAddClicked(false);
//   };

//   return (
//     <div className="card-deck">
//       <div className="card">
//         <img className="card-img-top custom-img" src={image_url} alt="Product" />
//         <div className="card-body">
//           <h5 className="card-title">{product_name}</h5>
//           <div className="price-rating">
//             <span className="card-price">Price: {price}</span>
//             <span className="rating-stars">{renderStars(rating)}</span>
//             <span className="rating-value">{rating}</span>
//           </div>
//           <div className="d-flex justify-content-between">
//             <Button
//               label="Add to Cart"
//               className="btn-1"
//               onClick={() => setIsPopupVisible(true)}
//             />
//             <Button
//               label="Description"
//               className="btn-2"
//               onClick={displayDescription}
//             />
//           </div>
//         </div>
//         {/* Pop-up for displaying Description */}
//         {isDescriptionVisible && (
//           <div className="description-popup">
//             <div className="description-popup-content">
//               <span className="close1" onClick={hideDescription}>
//                 &times;
//               </span>
//               <h2>{product_name}</h2>
//               <img className="description-img" src={image_url} alt="product" />
//               <div className="des-content">
//                 <p>
//                   <b>Sizes:</b>{" "}
//                   {sizes
//                     .filter((size) => quantity[size] > 0) // Filter sizes with quantity > 0
//                     .join(", ")}
//                 </p>
//                 <br></br>

//                 <p>
//                   <b>Category: </b>
//                   {category}
//                 </p>
//                 <br></br>
//                 <p>
//                   <b>Color: </b>
//                   {color}
//                 </p>
//                 <br></br>
//                 <p>
//                   <b>Material used: </b>
//                   {materials}
//                 </p>
//                 <br></br>
//                 <p>
//                   <b>Description: </b>
//                   {description}
//                 </p>
//                 <br></br>
//                 <p>
//                   <b>
//                     <i>Product will be delivered within 7 days</i>
//                   </b>
//                 </p>
//                 <br></br>
//                 <br></br>
//                 <br></br>
//                 <p className="returns">
//                   <i>14 days easy exchange/returns </i>🩷{" "}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//         {/* New popup for selecting a size */}
//         {isPopupVisible && (
//           <div className="popup">
//             <div className="popup-content">
//               <span className="close" onClick={handlePopupClose}>
//                 &times;
//               </span>
//               <h2>Select Size</h2>
//               <div className="size-selection">
//                 {sizes
//                   .filter((size) => quantity[size] > 0)
//                   .map((size) => (
//                     <Button
//                       key={size}
//                       label={size}
//                       className={`size-button ${
//                         selectedSize === size ? "selected" : ""
//                       }`}
//                       onClick={() => setSelectedSize(size)}
//                     />
//                   ))}
//               </div>

//               {selectedSize === null && sizeMessage === "" && isAddClicked && (
//                 <div className="size-message error">Please select a size.</div>
//               )}
//               <Button
//                 label="Add"
//                 className="add-btn"
//                 onClick={() => {
//                   setIsAddClicked(true);
//                   handleAddToCartClick();
//                 }}
//               />
//               {/* Error message inside the size selection pop-up */}
//               {/* {!selectedSize && (
//                 <div className="size-message error">Please select a size.</div>
//               )} */}
//             </div>
//           </div>
//         )}
//         {/* Message container inside the size selection pop-up */}
//         {sizeMessage && (
//           <div
//             className={`size-message ${
//               sizeMessage.startsWith("Please") ? "error" : "success"
//             }`}
//           >
//             {sizeMessage}
//           </div>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };
 
// export default Card;
 
