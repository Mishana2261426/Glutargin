export const useStores = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      stores {
        nodes {
          title
          storesFields {
            type
            text
            href
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
            data.value?.data?.stores?.nodes ?? []   // ← ВОТ ТУТ ФИКС

        return nodes.map(item => ({
            title: item.title,

            // ACF
            type: item.storesFields?.type?.[0] ?? '',
            text: item.storesFields?.text ?? '',
            href: item.storesFields?.href ?? '',
            pic: item.storesFields?.pic?.node?.sourceUrl ?? '',
        }))
    })
}
