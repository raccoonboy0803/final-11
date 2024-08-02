'use client';

import { useEffect, useState } from 'react';

interface BottomTabProps {
  productState: {
    count: number;
    setCount: (value: number) => void;
    handleAddToCart: () => void;
    handleBuyNow: () => void;
    product: {
      product_id: string;
      price: string | number;
      title: string;
    };
  };
}

function BottomTab({ productState }: BottomTabProps) {
  const { count, setCount, handleAddToCart, handleBuyNow, product } = productState;
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition > 100 && scrollPosition + viewportHeight < documentHeight) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-1000 max-w-screen-xl mx-auto p-4 bg-green-600 shadow-lg rounded-lg transition-transform transform ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <strong className="font-bold text-white text-3xl mr-4">{product.title}</strong>
        <section className="flex items-center gap-4">
          <div className="flex items-center">
            <button className="border px-4 py-2 rounded" onClick={() => setCount(count - 1)}>
              -
            </button>
            <div className="border p-2 text-center w-12 mx-2 rounded">{count}</div>
            <button className="border px-4 py-2 rounded" onClick={() => setCount(count + 1)}>
              +
            </button>
          </div>
          <p className="text-xl font-bold  text-white mx-4">
            총 상품금액: {+product.price * count} 원
          </p>
          <button onClick={handleAddToCart} className="bg-white px-4 py-2 rounded">
            장바구니
          </button>
          <button onClick={handleBuyNow} className="bg-white px-4 py-2 rounded">
            바로구매
          </button>
        </section>
      </div>
    </div>
  );
}

export default BottomTab;
