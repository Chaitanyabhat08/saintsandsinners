import React, { Fragment, useState } from 'react';
import './Shipping.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveShippingInfo } from '../../actions/cartAction'; 
import MetaData from '../layout/MetaData';
import PinDropIcon from '@mui/icons-material/PinDrop';
import HouseIcon from '@mui/icons-material/House';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State } from "country-state-city";
import CheckoutSteps from './CheckoutSteps.js';
import { Alert } from 'antd';

const Shipping = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [showAlert, setShowAlert] = useState(false);
  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      setShowAlert(true);
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigateTo("/order/confirm");
  };
  return (
    <Fragment>
      <div>
      <MetaData title="Shipping"></MetaData>
      <CheckoutSteps activestep={0} />
      <div className="shippingContainer">
          <div className="shippingBox">
            {showAlert && <Alert
              message="Phone Number"
              description="Phone Number should be 10 digits"
              type="warning"
              showIcon
              closable
            />}
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType='multipart/form-data'
            onSubmit={shippingSubmit}
          >
            <div>
              <HouseIcon />
              <input 
                type="text"
                placeholder='Address Line1'
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <AddLocationIcon />
              <input
                type="text"
                placeholder='city'
                required
                value={city}
                onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder='PinCode'
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)} />
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder='Phone'
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)} />
            </div>
            <div>
              <PublicIcon />
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
                <TransferWithinAStationIcon />
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
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
        </div>
      </div>
      <div>
        Pick From Saved Address
        <select>
        </select>
      </div>
    </Fragment>
  )
}

export default Shipping;