import React, { Fragment } from 'react';
import './Home.css';
import CategoryCard from './CategoryCard.js';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import Banner from './Banner';
// import { BsFillSaveFill } from '@material-ui/icons'

const Home = () => {
  const { loading } = useSelector(state => state.products);
  const categoriesForHer = [
    {
      name: "Tshirts", code: "WTshirts", images: [{ url: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSr_I2tfnXHGIhtnzi3Zr8hwjX7b8jR7fnTNPirZrq-f3vnCgyWIOjGvl4vgSPMkN1yc_iLMhKeiUfmCeJfbny_P7reL9yFW0kpL4ctYsA&usqp=CAE' }], gender: 'F'
    },
    { name: "Sweatshirts", code: "WSweatshirts", images: [{ url: 'https://cdn.shopify.com/s/files/1/0076/6040/4818/products/0-modelinfo-tamika-us2_eb86e6ac-da08-48eb-a415-c27396c051a1_450x610_crop_center.jpg?v=1674516904' }], gender: 'F' },
    { name: "Shirts", code: "Shirt", images: [{ url: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1683208757_2097830.jpg?format=webp&w=480&dpr=2.0' }], gender: 'F' },
    {
      name: "Kurtis", code: "WKurtis", images: [{ url: 'https://cdn.shopify.com/s/files/1/0561/7926/1589/products/houseofchikankari-zainabmulprintedkurta-grey1_1800x1800.png?v=1678948318' }], gender: 'F' },
  ];
  const categoriesForHim = [{
    name: "Sweatshirts", code: "MSweatshirts", images: [{ url: 'https://divinebonds.in/wp-content/uploads/2022/09/oversized-hoodie-mockup-of-a-serious-couple-sitting-in-cubes-at-a-studio-m26223.jpg' }], gender: 'M'},
    { name: "Shirts", code: "MShirts", images: [{ url: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/products/Amin4179_1800x1800.jpg?v=1672146549' }], gender: 'M' },
    { name: "Tshirts", code: "MTshirts", images: [{ url: 'https://cdn.shopify.com/s/files/1/0533/9578/3843/products/20220206_152500_900x.jpg?v=1673016320' }], gender: 'M' },
    { name: "Pants", code: "MPants", images: [{ url: 'https://cdn.shopify.com/s/files/1/0752/6435/products/Layer8_6bb8e88c-6836-42bc-af3b-994b9a733be7_1452x1799.jpg?v=1661151328' }], gender: 'M' },
  ];
    return (
      <Fragment>
        {loading ?
          <Fragment>
            <Loader />
          </Fragment> :<> <Fragment>
          <MetaData title="Saints&Sinners"/>
            <div><Banner /></div>
          </Fragment>
            <div className="Banner">
              <p><b>Welcome To Saints&Sinners</b></p>
              <h1> Find Our Products Categories Below</h1>
              <a href="#categorySection">
                <button>
                  {/* <BsFillSaveFill /> */}
                  click
                </button>
              </a>
            </div>
          <div className="categorySection" id = "categorySection">
              <h2 className="homeHeading">Featured Categories</h2>
            <div className="container1" id="container1">
              <h3>For Him</h3>
              {categoriesForHim.map(category => (
                <CategoryCard category={category} />
              ))}
              </div>
              <div className="container1" id="container1">
                <h3>For Her </h3>
                {categoriesForHer.map(category => (
                  <CategoryCard category={category}/>
                ))}
              </div>
            </div>
            </>
      }
      </Fragment>
  )
}

export default Home