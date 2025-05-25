"use client"

import { useRealTimeUserData } from "@contexts/RealTimeUserData/hook";
import { useEffect } from "react";
import defaultFavicon from "@/app/favicon.ico";

export default function DynamicFavIcon() {
    const apiData = useRealTimeUserData();
    const userData = apiData?.discord_user;

    useEffect(() => {
        if (!userData) return;

        const dynamicFavIconURL = localStorage.getItem("dynamicFaviconURL");

        if (!dynamicFavIconURL && apiData.kv.dynamic_favicon === "disabled") return;

        if (apiData.kv.dynamic_favicon === "disabled" && dynamicFavIconURL) {
            const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
            if (!link) return;
            link.href = defaultFavicon.src;
+           localStorage.removeItem("dynamicFaviconURL");
        }
        if (apiData.kv.dynamic_favicon !== "disabled") {
            const avatarUrl = `https://cdn.discordapp.com/avatars/${userData?.id}/${userData?.avatar}.png?size=32`
            updateFavicon(avatarUrl);
        }

        return () => {
            if (dynamicFavIconURL) localStorage.removeItem("dynamicFaviconURL");
        } 
    }, [userData?.avatar, apiData?.kv.dynamic_favicon, userData]);

    return null;
}


async function createRoundedFavicon(imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        
        image.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const size = 32;
                canvas.width = size;
                canvas.height = size;
                const context = canvas.getContext("2d");

                if (!context) {
                    reject(new Error("Não foi possível obter o contexto do canvas."));
                    return;
                }

                context.clearRect(0, 0, size, size);
                context.beginPath();
                context.arc(size/2, size/2, size/2, 0, Math.PI * 2, true);
                context.closePath();

                context.clip();
                context.drawImage(image, 0, 0, size, size);

                const dataUrl = canvas.toDataURL("image/png");
                resolve(dataUrl);
            } catch (error) {
                reject(error);
            }
        };

        image.onerror = (error) => {
            console.error("Erro ao carregar a imagem do favicon:", error);
            reject(new Error("Falha ao carregar a imagem do favicon"));
        };

        image.src = imageUrl;
    });
}

async function updateFavicon(avatarUrl: string) {
    try {
        const roundedFaviconUrl = await createRoundedFavicon(avatarUrl);

        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }

        link.href = roundedFaviconUrl;
        localStorage.setItem("dynamicFaviconURL", roundedFaviconUrl);
    } catch (error) {
        console.error("Erro ao atualizar o favicon:", error);
    }
}