import React from 'react';
import { motion } from 'framer-motion';
import './Item.css';

function Item({ icon, name, onClick }) {
  const subheading = {
    true: {
      opacity: 1,
    },
    false: {
      opacity: 0,
      display: 'none',
    },
  };

  return (
    <motion.div
      className='item'
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(3.5px)',
        WebkitBackdropFilter: 'blur(4.5px)',
        border: '1px solid rgb(255,255,255)',
        cursor: 'pointer',
      }}
      transition={{
        type: 'none',
        duration: 0.1,
      }}
      onClick={onClick} // Added onClick prop here
    >
      <motion.div className='icon'>{icon}</motion.div>
      <motion.span variants={subheading}>{name}</motion.span>
    </motion.div>
  );
}

export default Item;