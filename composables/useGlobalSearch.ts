
interface SearchItem {
    title: string
    slug: string
    type: 'article' | 'spec' | 'qst'
    _score: number
}

/* ===== ОБЯЗАТЕЛЬНО ЗДЕСЬ ===== */
function getScore(title: string, term: string): number {
    const t = title.toLowerCase()
    const q = term.toLowerCase()

    if (t.startsWith(q)) return 100
    if (t.split(/\s+/).includes(q)) return 80
    if (t.includes(q)) return 60

    return 0
}

/* ===== GLOBAL SEARCH ===== */
export const useGlobalSearch = (term: Ref<string>) => {
    const config = useRuntimeConfig()

    const query = `
        query SearchAll($term: String!) {
          blogs(where: { search: $term }, first: 5) {
            nodes {
              title
              slug
            }
          }
          specs(where: { search: $term }, first: 5) {
            nodes {
              title
              slug
            }
          }
          qsts(where: { search: $term }, first: 5) {
            nodes {
              title
              slug
            }
          }
        }
    `

    const { data } = useFetch(
        `${config.public.wpUrl}/graphql`,
        {
            method: 'POST',
            body: computed(() => ({
                query,
                variables: { term: term.value },
            })),
            watch: [term],
            immediate: false,
        }
    )

    return computed<SearchItem[]>(() => {
        if (!term.value || term.value.length < 2) {
            return []
        }

        const blogs = data.value?.data?.blogs?.nodes ?? []
        const specs = data.value?.data?.specs?.nodes ?? []
        const qsts  = data.value?.data?.qsts?.nodes ?? []

        const results: SearchItem[] = [
            ...blogs.map(item => ({
                title: item.title,
                slug: item.slug,
                type: 'article',
                _score: getScore(item.title, term.value),
            })),
            ...specs.map(item => ({
                title: item.title,
                slug: item.slug,
                type: 'spec',
                _score: getScore(item.title, term.value),
            })),
            ...qsts.map(item => ({
                title: item.title,
                slug: item.slug,
                type: 'qst',
                _score: getScore(item.title, term.value),
            })),
        ]

        return results
            .filter(item => item._score > 0)
            .sort((a, b) => b._score - a._score)
    })
}
