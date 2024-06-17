//bg-[#D4F0FF]
//bg-[#FFDED4]
//bg-[#FFEED4]

import { LiaLaptopCodeSolid } from "react-icons/lia";

import { ReactNode } from "react";
import { ColorsType, IconsType } from "./schemas";
import { Bot, Globe, Rocket } from "lucide-react";

export const colorsMapping: { [key in ColorsType]: string } = {
  LIGHT_BLUE: "bg-[#D4F0FF]",
  LIGHT_PINK: "bg-[#FFDED4]",
  LIGHT_YELLOW: "bg-[#FFEED4]",
} as const;

export const iconsMapping: { [key in IconsType]: ReactNode } = {
  SOFTWARE: <LiaLaptopCodeSolid strokeWidth={0.01} size={30} />,
  AI: <Bot strokeWidth={1.5} size={25} />,
  DESIGN: <Globe strokeWidth={1.5} size={25} />,
  MARKETING: <Rocket strokeWidth={1.5} size={25} />,
};
