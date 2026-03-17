import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    // Memastikan selalu menggunakan homeme.my.id
    const baseUrl = "https://www.homeme.my.id";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
