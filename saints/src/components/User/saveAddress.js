import React, {Fragment, useState } from 'react';
import { Country, State } from "country-state-city";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import './Saveaddress.css';
import { useDispatch } from 'react-redux';
import { SaveNewAddress } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const SaveAddress = () => {
  const [lane, setLane] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleSaveAddress = (e) => {
    e.preventDefault();

    // Create an object with the address data
    const addressData = {
      lane,
      city,
      state,
      country,
      pinCode,
      phoneNo
    };
    // Perform further actions with the address data (e.g., save to the database)
    dispatch(SaveNewAddress(addressData));
    alert.success('saved successfully');
    // Reset the form fields
    setLane('');
    setCity('');
    setState('');
    setCountry('');
    setPinCode('');
    setPhoneNo('');
  };

  return (
    <Fragment className="saveAddressContainer">
      <h4 className='saveAddressHeading'>Save Address</h4>
      <form onSubmit={handleSaveAddress} className='saveAddressForm'>
        <div>
          <HomeWorkIcon />
          <input
            type="text"
            placeholder="Lane"
            value={lane}
            onChange={(e) => setLane(e.target.value)}
            required
          />
        </div>
        <div>
          <HomeWorkIcon />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
       <div>
         <select
            id="selectId"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Country</option>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {country && (
          <div>
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div>
          <HomeWorkIcon />
          <input
            type="text"
            placeholder="Pin Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          />
        </div>
        <div>
          <HomeWorkIcon />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </Fragment>
  );
};

export default SaveAddress;
