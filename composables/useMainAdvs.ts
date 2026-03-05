export const useMainAdvs = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      mainAdvs {
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
            data.value?.data?.mainAdvs?.nodes ??
            []

        return nodes.map((item: any) => ({
            title: item.title,
        }))
    })
}
