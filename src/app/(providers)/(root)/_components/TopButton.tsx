'use client';

import Image from 'next/image';

const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

function TopButton() {
  return (
    <div className="fixed right-10 bottom-10 z-10">
      <button onClick={moveToTop}>
        <Image src="/icons/button-top.svg" alt="top button" width={64} height={64} />
      </button>
    </div>
  );
}

export default TopButton;
