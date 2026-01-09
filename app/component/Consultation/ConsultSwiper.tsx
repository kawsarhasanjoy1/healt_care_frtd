'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import "./consultaion.css"

// import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

const ConsultSwiper = () => {
 const images = [
    'https://dt-core-prod-ap-south-1.s3.ap-south-1.amazonaws.com/images/banners/852/IqqZZZYpiAelenQxVZCPxHHNzE1Ky1Y8IaU7YRql.webp',
    "https://dt-core-prod-ap-south-1.s3.ap-south-1.amazonaws.com/images/banners/867/1dKvPnWdUTnK2yQ1ei0wMA5zxIuNeUxgGM4B6v6h.webp",
    "https://dt-core-prod-ap-south-1.s3.ap-south-1.amazonaws.com/images/banners/888/VeXccE4sHyERZFI2MOgNd1KnF2RybdsFXT1zNGHj.webp"
 ]
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
       {
        images?.map((item) => {
            return (
                <SwiperSlide><Image src={item} width={600} height={600} alt=''/></SwiperSlide>
            )
        })
       }

      </Swiper>
    </>
  );
}


export default ConsultSwiper