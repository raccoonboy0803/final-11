import React from 'react';
import Carousel from './(home)/Carousel';
import Categories from './(home)/Categories';
import NewProduct from './(home)/NewProduct';
import LiveCommerce from './(home)/LiveCommerce';
import Goods from './(home)/Goods';
import Recommend from './(home)/Recommend';
import BestSeller from './(home)/BestSeller';
import Advertising from './(home)/Advertising';

function Home() {
  return (
    <div className="w-full">
      <Carousel />
      <Categories />
      <NewProduct />
      <LiveCommerce />
      <Goods />
      <Recommend />
      <BestSeller />
      <Advertising />
    </div>
  );
}

export default Home;
