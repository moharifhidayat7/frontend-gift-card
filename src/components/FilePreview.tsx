import React, { useState, useEffect, forwardRef } from "react"
import { CardData } from "@/types/CardData"

interface FilePreviewProps {
  cardData: CardData
}

const FilePreview: React.FC<FilePreviewProps> = forwardRef(({ cardData }, ref) => {
  const [dimensions, setDimensions] = useState({ width: 300, height: 169 }) // 16:9 aspect ratio
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = cardData.file ? URL.createObjectURL(cardData.file) : ''
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setIsImageLoaded(true)
      setDimensions({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = () => {
      console.error('Error loading image')
    }
  }, [cardData.file])

  useEffect(() => {
    if (!isImageLoaded) return

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = cardData.file ? URL.createObjectURL(cardData.file) : ''
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      ctx.font = '20px Arial'
      ctx.fillStyle = 'black'
      ctx.textBaseline = 'bottom'
      ctx.textAlign = 'left'
      ctx.fillText(cardData.dear, canvas.width / 2 - 20, canvas.height / 3 + 8)
      ctx.fillText(cardData.message, canvas.width / 2 - 120, canvas.height / 2 - 48)
      ctx.fillText(cardData.from, canvas.width / 2 - 45, canvas.height / 2 + 58)
    }
  }, [cardData, dimensions, isImageLoaded])

  return (
    cardData.file ? (
      <div className="px-6 py-4">
        <div className="relative w-full" style={{ paddingBottom: `${(dimensions.height / dimensions.width) * 100}%` }}>
          <canvas
            ref={ref}
            width={dimensions.width}
            height={dimensions.height}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
    ) : null
  )
});

export default FilePreview;
