import React, { useState, useRef, forwardRef } from "react";
import { CardData } from "@/types/CardData";
import DropZone from "@/components/DropZone";
import FormInput from "@/components/FormInput";

interface GiftCardFormProps {
  cardData: CardData
  setCardData: React.Dispatch<React.SetStateAction<CardData>>
}

const GiftCardForm: React.FC<GiftCardFormProps> = ({ cardData, setCardData }) => {
  const handleFileChange = (file: File | null) => {
    if (file) {
      setCardData((prev: CardData) => ({ ...prev, file }));
    }
  };

  return (
    <div className="space-y-4 px-6 py-4">
      <DropZone
        id="file"
        label="File Upload"
        onFileDrop={handleFileChange}
      />
      <FormInput
        label="Dear"
        id="dear"
        value={cardData.dear}
        onChange={(value: string) => setCardData((prev: CardData) => ({ ...prev, dear: value }))}
        required
      />
      <FormInput
        label="Message"
        id="message"
        value={cardData.message}
        onChange={(value: string) => setCardData((prev: CardData) => ({ ...prev, message: value }))}
        required
      />
      <FormInput
        label="From"
        id="from"
        value={cardData.from}
        onChange={(value: string) => setCardData((prev: CardData) => ({ ...prev, from: value }))}
        required
      />
    </div>
  );
};

export default GiftCardForm;
