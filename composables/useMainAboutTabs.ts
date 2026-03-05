export const useMainAboutTabs = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
        mainAboutTabs {
            nodes {
                mainAboutTabsFields {
                    id
                    text
                    pic {
                        node {
                            sourceUrl
                        }
                    }
                }
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
        const nodes =
            data.value?.data?.mainAboutTabs?.nodes ??
            []

        return nodes.map((item: any) => ({
            id: item.mainAboutTabsFields?.id?.[0] ?? '',
            text: item.mainAboutTabsFields?.text ?? '',
            pic: item.mainAboutTabsFields?.pic?.node?.sourceUrl ?? '',
        }))
    })
}
