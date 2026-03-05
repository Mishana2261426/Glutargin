export const useMeds = async () => {
    const config = useRuntimeConfig()

    const query = `
    query {
      meds {
        nodes {
          title
          slug
          medFields {
            type
            add
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
            data.value?.data?.meds?.nodes ??
            data.value?.meds?.nodes ??
            []

        return nodes.map((item: any) => ({
            title: item.title,
            slug: item.slug,
            type: item.medFields?.type?.[0] ?? '',
            add: item.medFields?.add ?? '',
            pic: item.medFields?.pic?.node?.sourceUrl ?? '',
        }))
    })
}
