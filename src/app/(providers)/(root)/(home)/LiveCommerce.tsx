'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useRouter } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useState } from 'react';

function LiveCommerce() {
  // 페이지 네비게이션
  const router = useRouter();
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  // const customSwiper = () => {
  //   const [nowImg, setNowImg] = useState(1);
  //   const slideShow = setInterval(function () {
  //     if (nowImg === 1) {
  //       // $('.slide-container').css('transform', `translateX(-100vw)`);

  //       setNowImg += 1;
  //     } else if (nowImg === 2) {
  //       // $('.slide-container').css('transform', `translateX(-200vw)`);

  //       setNowImg += 1;
  //     } else if (nowImg === 3) {
  //       // $('.slide-container').css('transform', `translateX(-0vw)`);

  //       setNowImg = 1;
  //     }
  //   }, 7000);
  // };

  return (
    <section className="w-full h-[800px] bg-[#F7FDFA] mx-auto lg:mt-[145px] lg:pb-[145px] mt-[48px] pb-[48px]">
      <div className="flex justify-around items-end text-center">
        <div></div>
        <h2 className="text-center text-[32px] lg:mb-[38px] lg:pt-[85px] pt-[16px]">
          라이브커머스
        </h2>
        <button
          className=" border-2 px-3 py-2 text-[13px]"
          onClick={() => {
            redirect('/livestreaming');
          }}
        >
          더보기 &gt;
        </button>
      </div>
      <div>
        {/* <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev'
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 1</SwiperSlide>
        </Swiper> */}
      </div>
    </section>
  );
}

export default LiveCommerce;
