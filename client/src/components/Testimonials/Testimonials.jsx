import React from "react";
import Heading from "../Heading/Heading";
import Customer1 from "../../assets/customer1.png";
import Customer2 from "../../assets/customer2.png";
import Customer3 from "../../assets/customer3.png";
import Customer4 from "../../assets/customer4.png";
import Customer5 from "../../assets/customer5.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { ArrowBigLeft, ArrowBigRight, Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section>
      <div className="max-w-[1400px] px-10 mx-auto py-20">
        <Heading highlight="Users" heading="Saying" />

        <div
          className="py-5 flex justify-end
             gap-x-3"
        >
          <button className="custom-prev text-2xl text-zinc-800 justify-center items-center flex rounded-lg w-11 h-11 bg-zinc-100 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-500 hover:text-white cursor-pointer">
            <ArrowBigLeft />
          </button>
          <button className="custom-next text-2xl text-zinc-800 justify-center items-center flex rounded-lg w-11 h-11 bg-zinc-100 hover:bg-gradient-to-b hover:from-blue-400 hover:to-blue-500 hover:text-white cursor-pointer">
            <ArrowBigRight />
          </button>
        </div>

        <Swiper
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {review.map((item) => {
            return (
              <SwiperSlide className="rounded-xl shadow-md overflow-hidden">
                {/* Top Section with light bg */}
                <div className="bg-orange-50 p-6 flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-red-500 border-2 border-orange-500 overflow-hidden">
                    <img src={item.image} className="w-full h-full" />
                  </div>

                  {/* Name / Profession / Rating */}
                  <div>
                    <h5 className="text-lg text-black font-semibold">
                      {item.name}
                    </h5>
                    <div className="flex items-center gap-1 text-orange-500 mt-2">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Section with review */}
                <div className="bg-white p-6">
                  <p className="text-zinc-600 leading-relaxed">{item.para}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

const review = [
  {
    id: 1,
    name: "Sujato Hui",
    rating: 5,
    para: "AgriShare made it so easy to find a tractor when I needed one. The equipment was nearby, affordable, and the whole process was simple. I will recommend to others also",
    image: Customer1,
  },
  {
    id: 2,
    name: "Animesh Kundu",
    rating: 4,
    para: "As a farmer, getting agricultural machinery on time is very important. AgriShare helps me find the equipment I need without having to buy expensive machines.",
    image: Customer2,
  },
  {
    id: 3,
    name: "Sayan Ghosh",
    rating: 5,
    para: "I listed my tractor on AgriShare and started connecting with farmers in my area. It is a great way to make better use of machinery when it is not being used.",
    image: Customer3,
  },
  {
    id: 4,
    name: "Rahul Mahato",
    rating: 4,
    para: "Finding a rotavator used to be difficult during the farming season. With AgriShare, I can quickly discover available equipment near my location. Very easy use ",
    image: Customer4,
  },
  {
    id: 5,
    name: "Surajit Mandal",
    rating: 5,
    para: "AgriShare is making modern farming equipment more accessible. The platform is easy to use, and renting machinery is much more affordable than purchasing it.",
    image: Customer5,
  },
];
