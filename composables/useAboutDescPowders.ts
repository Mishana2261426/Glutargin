export const useAboutDescPowders = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      aboutDescPowders {
        nodes {
          title
          slug
          aboutDescPowdersFields {
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
            data.value?.data?.aboutDescPowders?.nodes ?? []

        return nodes.map(item => ({
            title: item.title,
            text: item.aboutDescPowdersFields?.text ?? '',
            pic: item.aboutDescPowdersFields?.pic?.node?.sourceUrl ?? '',
        }))
    })
}
