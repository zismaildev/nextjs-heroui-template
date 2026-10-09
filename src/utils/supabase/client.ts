import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            global: {
                fetch: (...args) => {
                    const [url, config] = args
                    let newUrl = url.toString()
                    // ทำงานเฉพาะฝั่ง Server (SSR) เมื่อรันใน Docker
                    if (typeof window === 'undefined' && process.env.IS_DOCKER === "true") {
                        newUrl = newUrl.replace('127.0.0.1', 'host.docker.internal')
                    }
                    return fetch(newUrl, config)
                },
            },
        }
    )
}
