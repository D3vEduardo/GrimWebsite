'use client'

import { RealTimeUserDataContext } from "./context";
import { discordUserId } from "@/app/constants";
import { useLanyardWS, Types } from "use-lanyard";
import Loading from "@components/Loading/Loading";
import { LanyardResponseType } from "@/types/lanyardTypes";

export default function RealTimeUserDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawUserData = useLanyardWS(discordUserId);

  const parsedUserData: LanyardResponseType | undefined = rawUserData ? {
    ...rawUserData,
    kv: {
      ...(rawUserData.kv || {}),
      connected_accounts: typeof rawUserData.kv?.connected_accounts === 'string' 
        ? JSON.parse(rawUserData.kv.connected_accounts) 
        : undefined,
      description: rawUserData.kv?.description || "",
      dynamic_favicon: "disabled",
      activity_state: "Community Manager, Game Dev and Data Analyst"
    },
  } : undefined;

  return (
    <RealTimeUserDataContext.Provider value={parsedUserData}>
      {
        parsedUserData ? children : <Loading />
      }
    </RealTimeUserDataContext.Provider>
  );
}
