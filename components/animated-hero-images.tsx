"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function AnimatedHeroImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroImages = [
    "/hero jalan 1.jpg",
    "/hero jalan 2.jpg", 
    "/hero jalan 3.jpg",
    "/hero jalan 4.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev: number) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  const handlePrev = () => {
    setCurrentImageIndex((prev: number) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const handleNext = () => {
    setCurrentImageIndex((prev: number) => (prev + 1) % heroImages.length)
  }

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="relative w-full h-full">
      {/* Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Hero Image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 