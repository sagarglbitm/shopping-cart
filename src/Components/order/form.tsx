
import React, { useState } from 'react';
import InputField from "../Register/InputField";

interface Address {
  name: string;
  // address: string;
  mobile: string; 
  zipCode:string;
  street:string;
  city:string;
  state:string;
}

const Form: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZip] = useState(''); 
  const [city, setCity] = useState(''); 
  const [state, setState] = useState(''); 
  const [mobile, setMobile] = useState(''); 
  const [street, setStreet] = useState(''); 
  const [submittedAddresses, setSubmittedAddresses] = useState<Address[]>([]);

  const handleButtonClick = () => {
    setIsOpen(true);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };
  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };
 
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
  };

    const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   
    const newAddress: Address = {
      name: name,
      mobile: mobile, 
      zipCode:zipCode,
      city:city,
      state:state,
      street:street
    };

    
    setSubmittedAddresses([...submittedAddresses, newAddress]);

  
    setName('');
    // setAddress('');
    setMobile(''); 
    setZip('')
    setCity('')
    setState('')
    setStreet('')
    setIsOpen(false);
  };

  return (
    <div className="detai">
      {submittedAddresses.map((address, index) => (
        <div key={index} className="submitted-address">
          <div className="radio-group">
                <input
                  type="radio"
                  name="delivery-address"
                  
                />
                 <label>Alternate Address</label>
                </div>
                <div className="userDetails">
          <p className="order-p"><span style={{ fontWeight: "bold" }}> Name : </span> {address.name}</p>
          <br></br>
          
          <p className="order-p"><span style={{ fontWeight: "bold" }}> Address : </span>{address.street} , {address.city} , {address.state}-{address.zipCode}</p> 
         <br></br>
          <p className="order-p"><span style={{ fontWeight: "bold" }}> Mobile : </span>{address.mobile}</p>
        </div>
        </div>
      ))}

      {isOpen ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Contact Details</label>
            {/* <label htmlFor="name">Name:</label> */}
            <InputField
          // label="Name"
          type="text"
          name="name"
          placeHolder="Enter Your Name"
          value={name}
          onChange={handleNameChange}
          mandatory={false}
        />
            
          </div>
          
         
          
          <div className="form-group">
            {/* <label htmlFor="mobile">Mobile:</label> */}
            <InputField
          // label="Mobile No."
          type="text"
          name="mobile"
          placeHolder="Mobile "
          value={mobile}
          onChange={handleMobileChange}
          mandatory={false}
        />
          </div>
          <div className="form-group">
          <label htmlFor="adress">Adress Details</label>
          <InputField
          // label="Street Address"
          type="text"
          name="street"
          placeHolder="Street"
          value={street}
          onChange={handleStreetChange}
          mandatory={false}
          // error={error}
        />
          </div>
          
            <div className="form-group">
            <InputField
          // label="City"
          type="text"
          name="city"
          placeHolder="City"
          value={city}
          onChange={handleCityChange}
          mandatory={false}
          // error={error}
        />
            </div>
            <div className="form-group">
            <InputField
          // label="Zip Code"
          type="text"
          name="state"
          placeHolder="State"
          value={state}
          onChange={handleStateChange}
          mandatory={false}
        />
          </div>
            <div className="form-group">
            <InputField
          // label="Zip Code"
          type="text"
          name="zipCode"
         
          placeHolder="Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
          mandatory={false}
        />
          </div>
          
          
          <button className="add-address-btn" type="submit">Submit</button>
        </form>
      ) : (
        submittedAddresses.length === 0 && (
          <button className="add-address-btn" onClick={handleButtonClick}>+ Add Address</button>
        )
      )}
    </div>
  );
};

export default Form;

