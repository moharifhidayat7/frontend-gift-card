import React, { useState, useRef } from "react";
import GiftCardForm from "@/components/GiftCardForm";
import { CardData } from "@/types/CardData";
import FilePreview from "@/components/FilePreview";

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    file: null,
    dear: "",
    message: "",
    from: "",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    downloadImage()
  }

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'giftcard.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-gray-700">Gift Card</h2>
          </div>
          <FilePreview ref={canvasRef} cardData={cardData} />
          <GiftCardForm cardData={cardData} setCardData={setCardData} />
          <div className="text-center px-6 py-4 border-t border-gray-300">
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >
              Download
            </button>
          </div>
        </form>
      </div>
    </div >
  );
};

export default App;
