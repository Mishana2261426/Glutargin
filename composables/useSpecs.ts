export const useSpecs = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      specs {
        nodes {
          title
          slug
          date
          content
          specTypes {
            nodes {
              name
              slug
            }
          }
          specFields {
            textCard
            banner {
              node {
                sourceUrl
              }
            }
            pic {
              node {
                sourceUrl
              }
            }
            picBg {
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

    const formatDate = (date) => {
        if (!date) return ''

        const d = new Date(date)

        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = String(d.getFullYear()).slice(-2)

        return `${day}.${month}.${year}`
    }

    return computed(() => {
        const nodes =
            data.value?.data?.specs?.nodes ?? []

        return nodes.map(item => ({
          title: item.title,
          slug: item.slug,
          date: formatDate(item.date),

          // типы записи (таксономия)
          types: item.specTypes?.nodes ?? [],

          // ACF
          text: item.specFields?.textCard ?? '',
          pic: item.specFields?.pic?.node?.sourceUrl ?? '',
          picBg: item.specFields?.picBg?.node?.sourceUrl ?? '',
          banner: item.specFields?.banner?.node?.sourceUrl ?? '',
      }))
    })
}
