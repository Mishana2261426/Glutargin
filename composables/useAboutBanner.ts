export const useAboutBanner = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
        aboutBanners(first: 1) {
            nodes {
                title
                slug
            }
        }
    }
    `

    const { data, error } = await useFetch(
        `${config.public.wpUrl}/graphql`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { query }
        }
    )

    if (error.value) {
        console.error('GraphQL error:', error.value)
    }

    return computed(() => {
        const node =
            data.value?.data?.aboutBanners?.nodes?.[0] ?? null

        if (!node) {
            return null
        }

        return {
            title: node.title,
            slug: node.slug
        }
    })
}
