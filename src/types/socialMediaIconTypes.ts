import { IconProps } from "@iconify/react"

export type socialIconKeyType = "discord" | "steam" | "notion" | "spotify"

export type socialIconType = {
    [key in socialIconKeyType]: IconProps
}