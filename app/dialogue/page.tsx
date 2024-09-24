'use client';

import React, { useState } from "react";
import { AudioDialogue } from "@/components/dialogue/AudioDialogue";
import { TextDialogue } from "@/components/dialogue/TextDialogue";

// for button
import { cn } from "@/lib/utils";
import { TbAbc } from "react-icons/tb";
import { AiFillAudio } from "react-icons/ai";

export default function ExternalizedDialoguePage() {
  const [isText, setIsText] = useState<boolean>(true);

  const handleClick = (clicked: boolean) => {
    setIsText(clicked);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-300 text-center">Externalized Dialogue</div>
      <div className="flex flex-row m-auto gap-4 items-center justify-center">
        {/* Text button */}
        <ButtonForDialogue
          isActive={isText}
          handleClick={() => handleClick(true)}
          label="text dialogue"
          Icon={TbAbc}
        />

        {/* Audio button */}
        <ButtonForDialogue
          isActive={!isText}
          handleClick={() => handleClick(false)}
          label="audio dialogue"
          Icon={AiFillAudio}
        />
      </div>
      <div className="flex justify-center items-center">
        {isText &&
          <TextDialogue />
        }
        {!isText &&
          <AudioDialogue />
        }
      </div>
    </div>
  );
}

interface ButtonForDialogueType {
  isActive: boolean;
  handleClick: () => void;
  label: string;
  Icon: React.ElementType;
}

const ButtonForDialogue = (props: ButtonForDialogueType) => {
  const { isActive, handleClick, label, Icon } = props;

  return (
    <button
      className={cn(
        "flex flex-row gap-2 px-4 py-2 rounded-md items-center justify-center border shadow-xl",
        isActive ? "border-[#16c1fb]" : ""
      )}
      onClick={handleClick}
    >
      <Icon className={isActive ? "text-[#16c1fb] text-2xl" : "text-slate-600 text-2xl"} />
      <p className="text-base font-medium capitalize">
        {label}
      </p>
    </button>
  );
};
