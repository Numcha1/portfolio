import { clsx, type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const splitTechStack = (techStackInput: string) =>
  techStackInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
