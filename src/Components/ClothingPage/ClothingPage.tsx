import React, { useState, useEffect, useContext } from "react";
import Card, { CardProps } from "../Cards/Cards";
// import "./ClothingPage.css";
import "./ClothingPage.scss";
import Filters from "../Filters/Filters";
import mockClothingItems from "../../MOCK_DATA.json";
import Navbar from "../Navbar/Navbar";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import {
  CartProvider,
  CartContext,
  UseCartContextType,
} from "../../context/CartProvider";
import { ReducerAction } from "../../context/CartProvider";
import { ReducerActionType } from "../../context/CartProvider";
import useCart from "../../hooks/useCart";
import { ToastContainer, toast } from "react-toastify";

const ClothingPage: React.FC = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart();
  // const [viewCart, setViewCart] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(mockClothingItems);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  // const {dispatch}= useContext<UseCartContextType>(CartContext);

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((prevSize) => prevSize !== size)
        : [...prevSizes, size]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((prevColor) => prevColor !== color)
        : [...prevColors, color]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((prevCategory) => prevCategory !== category)
        : [...prevCategories, category]
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const hasHalfStar = rating - floorRating >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<FaStar key={i} className="star-filled" />);
      } else if (hasHalfStar && i === floorRating + 1) {
        stars.push(<FaStarHalfAlt key={i} className="star-half" />);
      } else {
        stars.push(<FaStar key={i} className="star-unfilled" />);
      }
    }

    return stars;
  };
  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setSelectedPrice(`${minPrice}-${maxPrice}`);
  };

  const handleAddToCart = (product: CardProps, selectedSize: string) => {
    const cartItem = cart.find(
      (item) => item.id === product.id && item.sizes === selectedSize
    );

    if (cartItem) {
      toast("This item is already in cart");
    } else {
      dispatch({
        type: REDUCER_ACTIONS.ADD,
        payload: {
          id: product.id,
          product_name: product.product_name,
          sizes: selectedSize,
          image_url: product.image_url,
          price: product.price,
          quantity: 1,
        },
      });

      toast(
        "Item added to cart "
        //  product.product_name +
        //   "\nSize: " +
        //   selectedSize
      );
    }
  };
  useEffect(() => {
    const filteredClothingItems = mockClothingItems.filter((item) => {
      const passesSizeFilter =
        selectedSizes.length > 0
          ? selectedSizes.some((size) => {
              const validSizes: ("small" | "medium" | "large")[] = [
                "small",
                "medium",
                "large",
              ];
              return (
                validSizes.includes(size as "small" | "medium" | "large") &&
                item.quantity[size as "small" | "medium" | "large"] > 0
              );
            })
          : true;

      const passesColorFilter =
        selectedColors.length === 0 ||
        selectedColors.includes(item.color.toLowerCase());
      const passesCategoryFilter =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category.toLowerCase());
      let passesPriceFilter = true;
      const passesGenderFilter =
        !selectedGender ||
        item.gender.toLowerCase() ===
          (selectedGender || item.gender).toLowerCase();

      if (selectedPrice) {
        const [minPrice, maxPrice] = selectedPrice.split("-").map(parseFloat);
        passesPriceFilter = item.price >= minPrice && item.price <= maxPrice;
      }

      return (
        passesSizeFilter &&
        passesColorFilter &&
        passesCategoryFilter &&
        passesPriceFilter &&
        passesGenderFilter
      );
    });

    setFilteredItems(filteredClothingItems);
    sessionStorage.setItem("cart123", JSON.stringify(cart));
  }, [
    selectedSizes,
    selectedColors,
    selectedCategories,
    selectedPrice,
    selectedGender,
    cart,
  ]);

  return (
    <CartProvider>
      <div className="content">
        <div className="clothing-page">
          <div className="filter-class">
            <Filters
              selectedSizes={selectedSizes}
              onSizeChange={handleSizeChange}
              selectedColors={selectedColors}
              onColorChange={handleColorChange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedPrice={selectedPrice}
              onPriceChange={handlePriceChange}
            />
          </div>

          <div className="col-md-9 card-container">
            <div className="main-navbar">
              <Navbar onGenderChange={handleGenderChange} />
            </div>
            <div className="row">
              {filteredItems.map((item) => (
                <div className="col-md-2" key={item.id}>
                  <Card
                    id={item.id}
                    image_url={item.image_url}
                    product_name={item.product_name}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    color={item.color}
                    rating={item.rating}
                    // gender={item.gender}
                    sizes={item.sizes}
                    materials={item.material}
                    quantity={item.quantity}
                    renderStars={renderStars}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </CartProvider>
  );
};

export default ClothingPage;








// import React, { useState, useEffect, useContext } from "react";
// import Card, { CardProps } from "../Cards/Cards";
// // import "./ClothingPage.css";
// import "./ClothingPage.scss";
// import Filters from "../Filters/Filters";
// import mockClothingItems from "../../MOCK_DATA.json";
// import Navbar from "../Navbar/Navbar";
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import  { CartProvider,CartContext, UseCartContextType } from "../../context/CartProvider";
// import {  ReducerAction } from '../../context/CartProvider';
// import { ReducerActionType } from "../../context/CartProvider";
// import useCart from '../../hooks/useCart';
// import { json } from "stream/consumers";
// // import { toast } from "react-toastify";
// import { ToastContainer, toast } from "react-toastify";

// // type PropsType = {
// //   product:
// //   { id: number;
// //   product_name: string;
// //   price: number;
// //   sizes: string[];
// //   color: string;
// //   quantity: { small: number; medium: number; large: number; };
// //   gender: string;
// //   description: string;
// //   image_url: string;
// //   rating?: number;
// //   category?: string;
// //   material?: string;
// //   delivery_date?: any}
// //   dispatch: React.Dispatch<ReducerAction>,
// //   REDUCER_ACTIONS: ReducerActionType,
// //   inCart: boolean
// // }

// const ClothingPage: React.FC = () => {

//   const {dispatch, REDUCER_ACTIONS,cart}= useCart()
//   // const [viewCart, setViewCart] = useState<boolean>(false);
//   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
//   const [selectedColors, setSelectedColors] = useState<string[]>([]);
//   const [filteredItems, setFilteredItems] = useState(mockClothingItems);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
//   const [selectedGender, setSelectedGender] = useState<string | null>(null);
//   // const {dispatch}= useContext<UseCartContextType>(CartContext);

//   const handleGenderChange = (gender: string) => {
//     setSelectedGender(gender);
//   };

//   const handleSizeChange = (size: string) => {
//     setSelectedSizes((prevSizes) =>
//       prevSizes.includes(size)
//         ? prevSizes.filter((prevSize) => prevSize !== size)
//         : [...prevSizes, size]
//     );
//   };

//   const handleColorChange = (color: string) => {
//     setSelectedColors((prevColors) =>
//       prevColors.includes(color)
//         ? prevColors.filter((prevColor) => prevColor !== color)
//         : [...prevColors, color]
//     );
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prevCategories) =>
//       prevCategories.includes(category)
//         ? prevCategories.filter((prevCategory) => prevCategory !== category)
//         : [...prevCategories, category]
//     );
//   };

//   const renderStars = (rating: number) => {
//     const stars = [];
//     const floorRating = Math.floor(rating);
//     const hasHalfStar = rating - floorRating >= 0.5;

//     for (let i = 1; i <= 5; i++) {
//       if (i <= floorRating) {
//         stars.push(<FaStar key={i} className="star-filled" />);
//       } else if (hasHalfStar && i === floorRating + 1) {
//         stars.push(<FaStarHalfAlt key={i} className="star-half" />);
//       } else {
//         stars.push(<FaStar key={i} className="star-unfilled" />);
//       }
//     }

//     return stars;
//   };
//   const handlePriceChange = (minPrice: number, maxPrice: number) => {
//     setSelectedPrice(`${minPrice}-${maxPrice}`);
//   };

//   const handleAddToCart = ( product:CardProps, selectedSize: string  ) => {
//     const cartItem = cart.find((item) => item.id === product.id && item.sizes === selectedSize)

//     if(cartItem){
//       toast("This item is already in cart")
//     }
//     else{
//     dispatch({
//        type: REDUCER_ACTIONS.ADD,
//        payload:{
//         id: product.id,
//         product_name: product.product_name,
//         sizes: selectedSize,
//         image_url:product.image_url,
//         price:product.price,
//         quantity:1

//        }
//     })

//     // alert(
//     //   "Item added to cart:\nProduct Name: " +
//     //    product.product_name +
//     //     "\nSize: " +
//     //     selectedSize
//     // );
//     }
//   };
//   useEffect(() => {
//     const filteredClothingItems = mockClothingItems.filter((item) => {
//       const passesSizeFilter =
//         selectedSizes.length > 0
//           ? selectedSizes.some((size) => {
//               const validSizes: ("small" | "medium" | "large")[] = [
//                 "small",
//                 "medium",
//                 "large",
//               ];
//               return (
//                 validSizes.includes(size as "small" | "medium" | "large") &&
//                 item.quantity[size as "small" | "medium" | "large"] > 0
//               );
//             })
//           : true;

//       const passesColorFilter =
//         selectedColors.length === 0 ||
//         selectedColors.includes(item.color.toLowerCase());
//       const passesCategoryFilter =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(item.category.toLowerCase());
//       let passesPriceFilter = true;
//       const passesGenderFilter =
//         !selectedGender ||
//         item.gender.toLowerCase() ===
//           (selectedGender || item.gender).toLowerCase();

//       if (selectedPrice) {
//         const [minPrice, maxPrice] = selectedPrice.split("-").map(parseFloat);
//         passesPriceFilter = item.price >= minPrice && item.price <= maxPrice;
//       }

//       return (
//         passesSizeFilter &&
//         passesColorFilter &&
//         passesCategoryFilter &&
//         passesPriceFilter &&
//         passesGenderFilter
//       );
//     });

//     setFilteredItems(filteredClothingItems);
//     sessionStorage.setItem("cart123",JSON.stringify(cart))
//   }, [
//     selectedSizes,
//     selectedColors,
//     selectedCategories,
//     selectedPrice,
//     selectedGender,
//     cart,
//   ]);

//   return (
//     <CartProvider>
//     <div className="content">
//       <div className="clothing-page">
//         <div className="filter-class">
//           <Filters
//             selectedSizes={selectedSizes}
//             onSizeChange={handleSizeChange}
//             selectedColors={selectedColors}
//             onColorChange={handleColorChange}
//             selectedCategories={selectedCategories}
//             onCategoryChange={handleCategoryChange}
//             selectedPrice={selectedPrice}
//             onPriceChange={handlePriceChange}
//           />
//         </div>

//         <div className="col-md-9 card-container">
//           <div className="main-navbar">
//             <Navbar
//               onGenderChange={handleGenderChange}
//             />
//           </div>
//           <div className="row">
//             {filteredItems.map((item) => (
//               <div className="col-md-2" key={item.id}>
//                 <Card
//                  id={item.id}
//                   image_url={item.image_url}
//                   product_name={item.product_name}
//                   price={item.price}
//                   description={item.description}
//                   category={item.category}
//                   color={item.color}
//                   rating={item.rating}
//                   // gender={item.gender}
//                   sizes={item.sizes}
//                   materials={item.material}
//                   quantity={item.quantity}
//                   renderStars={renderStars}
//                   onAddToCart={handleAddToCart}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//     </CartProvider>
//   );
// };

// export default ClothingPage;
