import React, { useState } from 'react';
import "./sidebar.css";
import { motion } from "framer-motion";
import DashBoard from "./DashBoard";
import ProductsPage from './ProductsPage';
import CustomerPage from './CustomerPage';
import Transaction from "./Transaction";
import Orders from "./Orders";
import {
  AccountCircleRounded,
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  ColorLensRounded,
  DashboardRounded,
  TocRounded,
} from "@material-ui/icons";
import PaidIcon from '@mui/icons-material/Paid';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import Item from "./component/Item";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(<DashBoard />);

  // for collapsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "6.5rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "7rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "5rem",
    },
  };

  const PageHandler = (param) => {
    switch (param) {
      case 'dashboard':
        setSelectedComponent(<DashBoard />);
        break;
      case 'products':
        setSelectedComponent(<ProductsPage />);
        break;
      case 'customers':
        setSelectedComponent(<CustomerPage />);
        break;
      case 'transaction':
        setSelectedComponent(<Transaction />);
        break;
      case 'orders':
        setSelectedComponent(<Orders />);
        break;
      default:
        setSelectedComponent(null);
        break;
    }
  };

  return (
    <div className="App">
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgb(255,255,255)",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <TocRounded />
          </motion.div>
          {/* profile */}
          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="profile"
            transition={{ duration: 0.4 }}
            whileHover={{
              backgroundColor: "rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter: "blur(5.5px)",
              border: "1px solid rgb(255,255,255)",
              cursor: "pointer",
            }}
          >
            <img src="https://img.freepik.com/premium-vector/boy-is-working-web-page_118167-1706.jpg?w=2000" alt="profile_img" />
          </motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <motion.h3
                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0, width: open ? "auto" : 0 }}
              >
                Components
              </motion.h3>
              <Item icon={<DashboardRounded />} name="Dashboard" onClick={()=>PageHandler('dashboard')} />
              <Item icon={<CategoryRoundedIcon />} name="Products" onClick={() => PageHandler('products')} />
              <Item icon={<AccountCircleRounded />} onClick={() => PageHandler('customers')} name="Customers" />
              <Item icon={<AssignmentTurnedInRounded />} onClick={() => PageHandler('orders')} name="Orders" />
              <Item icon={<PaidIcon />} onClick={() => PageHandler('transaction')} name="Transaction" />
              <Item icon={<ColorLensRounded />} name="Settings" />
            </div>
          </div>
        </motion.div>
      </motion.div>
      <div className="body_container">
        {selectedComponent}
      </div>
    </div>
  );
}

export default Sidebar;
