export const useQsts = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      qsts {
        nodes {
          title
          slug
          date
          qstFields {
            textCard
            banner {
              node {
                sourceUrl
              }
            }
            picQst {
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
            data.value?.data?.qsts?.nodes ?? []

        return nodes.map(item => ({
            title: item.title,
            slug: item.slug,
            date: formatDate(item.date),

            // ACF
            text: item.qstFields?.textCard ?? '',
            pic: item.qstFields?.picQst?.node?.sourceUrl ?? '',
            picBg: item.qstFields?.picBg?.node?.sourceUrl ?? '',
            banner: item.qstFields?.banner?.node?.sourceUrl ?? '',
        }))
    })
}
