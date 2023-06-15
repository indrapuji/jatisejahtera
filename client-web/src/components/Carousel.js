import React, {useEffect, useState} from 'react'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {RxDot, RxDotFilled} from 'react-icons/rx'
import axios from 'axios'
import Link from 'next/link'

function Carousel() {
  // const slides = [
  //   {url: 'https://i.ibb.co/p0QFFqs/car-1.jpg'},
  //   {url: 'https://i.ibb.co/89YzPWy/car-2.jpg'},
  //   {url: 'https://i.ibb.co/Wk8fDc9/car-3.jpg'},
  // ];

  useEffect(() => {
    getCarousel()
    console.log(process.env.API_URL)
  }, [])

  const [slides, setSlides] = useState([])

  const [currentIndex, setCurrentIndex] = useState(1)

  const getCarousel = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=carousel&status=true`
      })
      setSlides(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const prevSlide = () => {
    const isFirstIndex = currentIndex === 0
    const newIndex = isFirstIndex ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastIndex = currentIndex === slides.length - 1
    const newIndex = isLastIndex ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSLide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }
  return (
    <div className='h-[780px] w-full m-auto relative group'>
      {/* <Link href={slides.desc}> */}
      <div
        style={{backgroundImage: `url(${slides[currentIndex]?.image_url})`}}
        className='w-full h-full bg-center bg-cover duration-500'
      ></div>
      <div className='hidden group-hover:block absolute top-[45%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[45%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='absolute flex left-0 right-0 justify-center bottom-5 w-full'>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSLide(slideIndex)} className='text-3xl cursor-pointer'>
            {slideIndex === currentIndex ? <RxDotFilled color={'blue'} /> : <RxDot color={'blue'} />}
          </div>
        ))}
      </div>
      {/* </Link> */}
    </div>
  )
}

export default Carousel
