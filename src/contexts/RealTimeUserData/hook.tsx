'use client'
import { useContext } from "react";
import { RealTimeUserDataContext } from "./context";

export const useRealTimeUserData = () => useContext(RealTimeUserDataContext);