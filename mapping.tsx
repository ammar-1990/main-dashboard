//bg-blue-500/40
//bg-pink-500/40
//bg-yellow-500/40

import { LiaLaptopCodeSolid } from "react-icons/lia";




import { ReactNode } from "react";
import { ColorsType, IconsType } from "./schemas";
import { Bot, Globe, Rocket } from "lucide-react";

export const colorsMapping:{[key in ColorsType]:string} = {
LIGHT_BLUE:"bg-blue-500/40",
LIGHT_PINK:"bg-pink-500/40",
LIGHT_YELLOW:"bg-yellow-500/40"
} as const

export const iconsMapping:{[key in IconsType]:ReactNode}={
   SOFTWARE:<LiaLaptopCodeSolid  size={25}/>,
   AI:<Bot size={25}/>,
   DESIGN:<Globe size={25}/>,
   MARKETING:<Rocket size={25}/>

}