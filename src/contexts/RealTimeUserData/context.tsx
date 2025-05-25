'use client'

import { LanyardResponseType } from "@type/lanyardTypes";
import { createContext } from "react";

export const RealTimeUserDataContext = createContext<LanyardResponseType | undefined>(undefined);