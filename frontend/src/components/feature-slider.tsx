"use client"

import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import FeatureCard from "./feature-card"

interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

export default function FeatureSlider({ features }: { features: Feature[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Calculate the indices of features to display based on screen size
  const getVisibleIndices = () => {
    // On small screens, show only 1 feature
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return [currentIndex]
    }
    // On medium screens, show 2 features
    else if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return [
        currentIndex,
        (currentIndex + 1) % features.length,
      ]
    }
    // On large screens, show 3 features
    else {
      return [
        currentIndex,
        (currentIndex + 1) % features.length,
        (currentIndex + 2) % features.length,
      ]
    }
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length)
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleIndices().map((index) => (
            <FeatureCard
              key={index}
              feature={features[index]}
              className="h-full"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={handlePrevClick}
          className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          aria-label="Previous feature"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleNextClick}
          className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          aria-label="Next feature"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

