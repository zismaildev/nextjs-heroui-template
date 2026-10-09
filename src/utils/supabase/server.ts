import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
            global: {
                fetch: (...args) => {
                    const [url, config] = args
                    let newUrl = url.toString()
                    // ทำงานเฉพาะฝั่ง Server (SSR) เมื่อรันใน Docker
                    if (process.env.IS_DOCKER === "true") {
                        newUrl = newUrl.replace('127.0.0.1', 'host.docker.internal')
                    }
                    return fetch(newUrl, config)
                },
            },
        }
    )
}
