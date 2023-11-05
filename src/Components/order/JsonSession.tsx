import React, { useEffect, useState } from "react";
import Form from "./form";
// import "./UserCard.scss";
// import { useNavigate ,useLocation} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { toast,ToastContainer } from "react-toastify";

interface User {
  id: number;
  status: boolean;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    // country: string;
  };
  mobile: number;
}

interface Details {
  userId: number;
  // status: boolean;
}

interface Order {
  product_name: string;
  image_url: string;
  sizes:string;
  price: number;
}
interface Total {
  TotalPrice: number;
}

const StoreDataInSessionStorage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [details, setDetails] = useState<undefined>();
  const [total, setTotal] = useState<undefined>();
  
  

  useEffect(() => {
    const storedUsers = sessionStorage.getItem("userId");
    
    const storedOrders = sessionStorage.getItem("Cart");
    
    const storedTotals = sessionStorage.getItem("TotalPrice");
    

    if (storedUsers) {
      setDetails(JSON.parse(storedUsers));
    } 
    
    if (storedTotals) {
      setTotal(JSON.parse(storedTotals));
    } 
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } 
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        const filteredUsers = data.filter((user: User) => {
          return user.id === details;
        });
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [details]);
  function onGenderChange(gender: string): void {
    throw new Error('Function not implemented.')
  }
  function handlePaymentClick(): void {
    // setShowMessage(true); 
    toast("Order Placed Successfully ✅")
  }

  

  return (
    <div className="user-details-container" data-testid="user-detailssss" >
      


    
      {/* <Navbar onGenderChange={onGenderChange}/> */}
      
  
      
      <div className="details"   >

      
        {users.map((user) => (
          <div className="user-card" key={user.id}  >
            
            <h2 className="delivery">Delivery Address</h2>
            <div className="user-details" >
              <div className="radio-group">
                <input
                  type="radio"
                  name="delivery-address"
                  id={`user-${user.id}`}
                />
                <label>Home</label>
                <div className="userDetails" >
                  <p className="order-p">
                    <span style={{ fontWeight: "bold" }} > Name : </span>
                    {user.name}
                  </p>
                  <br></br>
                  <p className="order-p">
                    <span style={{ fontWeight: "bold" }}> Address : </span>{" "}
                    {user.address.street} , {user.address.city} ,{" "}
                    {user.address.state}-{user.address.zipCode}
                  </p><br></br>

                  <p className="order-p">
                    <span style={{ fontWeight: "bold" }}> Mobile : </span>
                    {user.mobile}
                  </p>
                  <br></br>
                </div>
              </div>
            </div>
            <div className="user-details">
              <div className="formCall">
                <Form />
              </div>
            </div>
          </div>
        ))}

        <div className="cart-card">
          
          <div className="cart-details">
          
          <h2 className="order-product">Product Details</h2>
            <div>
              {orders.map((order, index) => (
                <div>
                  <div className="product-line">
                    <img src={order.image_url} alt="Product" className="image" />

                    <p className="order-p"> {order.product_name}</p>
                    <p className="order-p"> <span style={{ fontWeight: "bold" , color:"#ff3f6c" }}>  
                    ({order.sizes})</span></p>
                  </div>
                </div>
              ))}
              <hr className="product-line" />
              <div className="product-prices">
                <h2 className="order-header">Price Details</h2>
                <div>
                  <p className="order-p">
                    <span style={{ fontWeight: "bold" }}> Total MRP : {total} </span>
                  </p>
                  <br></br>
                  
                </div>
              </div>
              <hr className="product-line" />
              
              <button
                type="submit"
                className="placeOrder"
                onClick={handlePaymentClick}
              >
                
                <span style={{ fontWeight: "medium"  }}>
                      
                      Payment
                    </span>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-footer">
        <div className="footer-icon">
        <div className=" pay-images">
        <img className="footer-bank-ssl" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png" width="70" height="37"/>
        <img className="footer-bank-visa" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png" width="60" height="37" />
        <img className="footer-bank-mc" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png" width="60" height="37"></img>
        <img className="footer-bank-ae" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png" width="60" height="37"></img>
        <img className="footer-bank-nb" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png" width="60" height="37"></img>
        <img className="footer-bank-rupay" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png" width="60" height="37"></img>
        <img className="footer-bank-paypal" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png" width="60" height="37"></img>
        <img className="footer-bank-bhim" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png" width="60" height="37"></img>
        </div>
        <div className="help">
        <span style={{ fontWeight: "bold" }}>Need Help ? Contact Us</span>
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StoreDataInSessionStorage;
