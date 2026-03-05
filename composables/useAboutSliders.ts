export const useAboutSliders = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      aboutSliders {
        nodes {
          title
          aboutSliderFields {
            type
            pic {
              node {
                sourceUrl
              }
            }
            picActive {
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
            data.value?.data?.aboutSliders?.nodes ?? []

        return nodes.map(item => ({
            text: item.title,
            type: item.aboutSliderFields?.type[0] ?? [],
            pic: item.aboutSliderFields?.pic?.node?.sourceUrl ?? '',
            pic_active: item.aboutSliderFields?.picActive?.node?.sourceUrl ?? '',
        }))
    })
}
