export const useArticles = async () => {
    const config = useRuntimeConfig()

    const query = `
    {
      blogs {
        nodes {
          title
          slug
          date
          content
          articleTypes {
            nodes {
              name
              slug
            }
          }
          blogFields {
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
                'Content-Type': 'application/json',
            },
            body: { query },
        }
    )

    if (error.value) {
        console.error('GraphQL error:', error.value)
    }

    const formatDate = (date?: string) => {
        if (!date) return ''

        const d = new Date(date)
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()

        return `${day}.${month}.${year}`
    }

    return computed(() => {
        const nodes = data.value?.data?.blogs?.nodes ?? []

        return nodes.map(item => ({
            title: item.title,
            slug: item.slug,

            // ❗ ДАТЫ (ОБЯЗАТЕЛЬНО ОБА)
            dateRaw: item.date,
            date: formatDate(item.date),

            // контент
            text: item.blogFields?.textCard ?? '',
            content: item.content ?? '',

            // ❗❗❗ ТОЛЬКО ТАК
            types: item.articleTypes?.nodes ?? [],

            // медиа
            pic: item.blogFields?.pic?.node?.sourceUrl ?? '',
            picBg: item.blogFields?.picBg?.node?.sourceUrl ?? '',
            banner: item.blogFields?.banner?.node?.sourceUrl ?? '',
        }))
    })
}
