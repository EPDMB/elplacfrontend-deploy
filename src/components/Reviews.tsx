/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import StarRating from "../components/StarRating";
import { PlaceReview, formTypeEnum } from "@/types";
import profilephoto from "@/assets/profile.svg";
import Image from "next/image";
import Input from "./Input";
import { FaStar } from "react-icons/fa";
import { useProfile } from "@/context/ProfileProvider";
import { useAuth } from "@/context/AuthProvider";

export const Reviews = () => {
  const [reviews, setReviews] = useState<PlaceReview[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [disabled, setDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const { userDtos } = useProfile();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setReviews([
          {
            author_name: "Lucia Martínez",
            profile_photo_url: profilephoto,
            rating: 5,
            text: "Increíble selección de ropa para niños. Calidad excepcional y diseños únicos. ¡Muy recomendado!",
          },
          {
            author_name: "Carlos Hernández",
            profile_photo_url: profilephoto,
            rating: 5,
            text: "El personal fue muy amable y paciente al ayudarme a elegir los mejores atuendos para mi sobrino. Excelente servicio.",
          },
          {
            author_name: "Sofía Giraldo",
            profile_photo_url: profilephoto,
            rating: 4,
            text: "Buena calidad de ropa y precios razonables. La tienda es un poco pequeña, pero la selección es variada.",
          },
          {
            author_name: "Eduardo López",
            profile_photo_url: profilephoto,
            rating: 4,
            text: "Encontré el regalo perfecto para la fiesta de cumpleaños de mi hijo. Gran variedad de opciones para niños de todas las edades.",
          },
        ]);

        setIsLoading(false);
      }, 2000);
    }
  }, [userDtos]);

  useEffect(() => {
    setDisabled(
      authorName.trim() === "" || reviewText.trim() === "" || rating === 0
    );
  }, [authorName, rating, reviewText, userDtos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview: PlaceReview = {
      author_name: authorName,
      text: reviewText,
      rating: rating,
      profile_photo_url: userDtos?.profile_picture || profilephoto,
    };
    setReviews([...reviews, newReview]);

    setAuthorName("");
    setReviewText("");
    setRating(1);
    onCloseModal();
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const responsive = {
    0: { items: 1 },
    560: { items: 2 },
    900: { items: 3 },
    1400: { items: 4 },
  };

  const items = reviews.map((review, index) => (
    <div
      key={index}
      className="bg-[#f2e8dad7] mx-5 rounded-xl h-56 flex flex-col items-start justify-center text-center"
    >
      <div className="w-full h-12 flex items-center justify-start pl-3 mb-5">
        <div className=" lg:h-20 lg:w-20 flex items-center">
          <Image
            src={review.profile_photo_url}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full h-14 w-14 object-cover"
          />
        </div>
        <div className="pl-4">
          <p className="text-[#091616] font-semibold text-lg">
            {review.author_name}
          </p>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="w-full h-1/2 text-[#091616] font-semibold text-xs p-5 text-left truncate text-wrap flex justify-center items-center">
        "{review.text}"
      </p>
    </div>
  ));

  return (
    <div className="flex flex-col">
      <div className="flex justify-center m-auto"></div>
      <div className="bg-secondary-lighter flex flex-col items-center">
        <div className="flex justify-center items-center mt-5 mb-10 gap-5">
          <h1 className="innerShadowTitleBlue text-2xl sm:text-4xl xl:text-5xl">
            Nuestros Clientes
          </h1>
        </div>
        <div className="w-full sm:w-[70%] h-1/2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
                <svg
                  version="1.1"
                  id="loader-1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="120px"
                  height="120px"
                  viewBox="0 0 50 50"
                  xmlSpace="preserve"
                  className="animate-spin"
                >
                  <path
                    fill="#FFD47B"
                    d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
                  />
                </svg>
            </div>
          ) : (
            <AliceCarousel
              mouseTracking
              items={items}
              responsive={responsive}
              controlsStrategy="alternate"
              autoPlay
              autoPlayInterval={3000}
              infinite
              disableDotsControls
              renderPrevButton={() => (
                <button
                  className={`hidden md:inline-block md:-left-16 absolute top-28 transform -translate-y-1/2 bg-gray-500 text-white w-8 h-8 rounded-full z-10 shadow-xl`}
                >
                  &lt;
                </button>
              )}
              renderNextButton={() => (
                <button className="hidden md:inline-block md:-right-16 absolute top-28 transform -translate-y-1/2 bg-gray-500 text-white w-8 h-8 rounded-full z-10 shadow-xl">
                  &gt;
                </button>
              )}
              paddingLeft={50}
              paddingRight={50}
            />
          )}
        </div>
        {token && (
          <button
            className="bg-primary-default w-fit m-auto my-5 rounded-md p-2 text-secondary-light shadow"
            onClick={() => setOpenModal(true)}
          >
            Dejar reseña
          </button>
        )}
      </div>

      {openModal && (
        <div
          className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onCloseModal}
        >
          <div
            className="bg-secondary-default p-8 m-3 md:m-0 rounded-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-primary-darker rounded-full"
              onClick={onCloseModal}
            >
              ✖
            </button>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <Input
                type="text"
                label="Nombre"
                placeholder="Nombre"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                formType={formTypeEnum.login}
              ></Input>
              <div className="flex flex-col">
                <label className="mt-2 text-base font-medium text-secondary-darker sm:text-base">
                  Texto de la reseña
                </label>
                <textarea
                  placeholder="Texto de la reseña"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="border-secondary-default rounded-md pl-4 pr-12 py-2 focus:outline-none bg-secondary-lighter"
                  required
                />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <label className="m-2 mt-2 text-base font-medium text-secondary-darker sm:text-base">
                    Rating
                    <div className="flex m-auto">
                      {[...Array(5)].map((_, index) => {
                        const currentRating = index + 1;
                        return (
                          <label key={index} className="rating-label">
                            <input
                              required
                              type="radio"
                              name="rating"
                              value={currentRating}
                              onClick={() => handleRatingChange(currentRating)}
                              className="hidden"
                            />
                            <FaStar
                              className="star"
                              size={25}
                              color={
                                currentRating <= (hover || rating)
                                  ? "#eab308"
                                  : "#FFF7E6"
                              }
                              onMouseEnter={() => setHover(currentRating)}
                              onMouseLeave={() => setHover(null)}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={disabled}
                className={` $ bg-primary-default w-fit m-auto my-5 rounded-md p-2 text-secondary-light shadow ${
                  disabled ? " opacity-30 cursor-not-allowed" : " "
                } `}
              >
                Agregar Reseña
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
