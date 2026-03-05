export const useAboutDescNavs = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      aboutDescNavs {
        nodes {
          title
          content
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
            data.value?.data?.aboutDescNavs?.nodes ??
            []

        return nodes.map((item: any) => ({
            label: item.title,
            text: item.content,
        }))
    })
}
