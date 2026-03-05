export const useMainFeaturesTablets = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      mainFeaturesTablets {
        nodes {
          title
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
            data.value?.data?.mainFeaturesTablets?.nodes ??
            []

        return nodes.map((item: any) => ({
            title: item.title,
        }))
    })
}
