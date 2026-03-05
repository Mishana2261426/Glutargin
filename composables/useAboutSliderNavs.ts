export const useAboutSliderNavs = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      aboutSliderNavs {
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
            data.value?.data?.aboutSliderNavs?.nodes ?? []

        return nodes.map(item => ({
            label: item.title,
            text: item.content,
        }))
    })
}
