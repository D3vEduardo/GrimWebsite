import { Types } from "use-lanyard";

export type LanyardResponseType = Types.Presence & {
    kv: {
        connected_accounts: ConnectedAccountType[] | undefined,
        description: string;
        dynamic_favicon: "enabled" | "disabled",
        activity_state: string;
    } | undefined;
}

export type ConnectedAccountType = {
    name: string;
    url: string;
    icon: string;
}