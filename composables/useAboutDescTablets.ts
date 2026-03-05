export const useAboutDescTablets = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      aboutDescTablets {
        nodes {
          title
          slug
          aboutDescTabletsFields {
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
            data.value?.data?.aboutDescTablets?.nodes ?? []

        return nodes.map(item => ({
            title: item.title,
            text: item.aboutDescTabletsFields?.text ?? '',
            pic: item.aboutDescTabletsFields?.pic?.node?.sourceUrl ?? '',
        }))
    })
}
