import React, { useState , useEffect} from 'react'
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProducts';
// import { UseProductsContextType } from '../context/ProductsProvider';
import { ReactElement } from 'react';
import Product from './Product';
// import {ClothingPage} from '../components/ClothingPage/ClothingPage';
import data from "../../src/data/db.json"

import ClothingPage from './ClothingPage/ClothingPage';

// interface ProductType {
//   id:number;
//   image_url: string;
//   product_name: string;
//   price: number;
//   description: string;
//   category?: string;
//   rating?: number;
//   color: string;
//   gender: string;
//   sizes: string[];
//   materials?: string;
//   quantity: {
//     small: number;
//     medium: number;
//     large: number;
//   };
//   delivery_date?: any;
// }
 interface CardProps {
  id: number;
  image_url: string;
  product_name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  color: string;
  gender: string;
  sizes: string[];
  materials: string;
  // quantity: Record<string, number>;
  delivery_date?: string
  quantity: {
    small: number;
    medium: number;
    large: number;
  };
  renderStars: (rating: number) => React.ReactNode;
  onAddToCart: ( product:CardProps,selectedSize: string) => void;
}

const ProductList = () => {
  const {dispatch, REDUCER_ACTIONS, cart}= useCart()
  // const {products} = useProducts()
  const [products, setProducts] = useState<CardProps[]>([]);
  const[loading, setLoading]= useState(true);
  // let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  useEffect(()=> {
   fetch("http://localhost:3001/products")
   .then((response)=>response.json())
   .then((data)=> 
   {setProducts(data);
    setLoading(false)})
   .catch((error)=>console.error('error fetching data', error))

   console.log("data fetching",data)
  },[])

  if(loading){
    return<p>loading...</p>
  }
  console.log("product checking", products);

  return(

    
    <main className='main main--products'>
      {products.map((product) => {
        const inCart =cart.some((item)=> item.id === product.id)

        return(
          <Product key={product.id}
           product={product}
           dispatch={dispatch}
           REDUCER_ACTIONS={REDUCER_ACTIONS}
           inCart={inCart}
         />
        )
      }
      )}
    </main>
  )
  // if(data.products?.length){
  //     pageContent= data.products.map(product => {
  //       console.log("product",product)
  //       console.log("id",product.id);
        
  //       const inCart: boolean = cart.some(item => item.id === product.id)

  //       return (
  //         <ClothingPage key={product.id}
  //         product={product}
  //         dispatch={dispatch}
  //         REDUCER_ACTIONS={REDUCER_ACTIONS}
  //         inCart={inCart}
  //         />
  //       )
  //     })
  // }
  
  // const content = (
  //   <main className="main main--products">
  //     {pageContent}
  //   </main>
  // )
  // return content
}

export default ProductList
