<template>
    <div v-if="post">
        <ArticlesSolo
            :banner="post.banner"
            :article_texts="articleTexts"
        />
    </div>

    <div v-else>
        Статья не найдена
    </div>
</template>

<script setup lang="ts">
/* === 1. route + slug === */
const route = useRoute()

definePageMeta({
    key: route => route.fullPath,
})

const slug = computed(() => route.params.slug as string)

/* === 2. конфиг === */
const config = useRuntimeConfig()

/* === 3. ключ запроса === */
const fetchKey = computed(() => `qst-${slug.value}`)

/* === 4. запрос QST === */
const { data, error } = await useFetch(
    `${config.public.wpUrl}/graphql`,
    {
        key: fetchKey.value,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            query: `
                query ($slug: ID!) {
                    qst(id: $slug, idType: SLUG) {
                        title
                        content
                        qstFields {
                            banner {
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
            `,
            variables: {
                slug: slug.value,
            },
        },
        watch: [slug],
    }
)

if (error.value) {
    console.error('GraphQL error:', error.value)
}

/* === 5. нормализация данных === */
const post = computed(() => {
    const qst = data.value?.data?.qst
    if (!qst) return null

    return {
        title: qst.title,
        content: qst.content,
        banner: qst.qstFields?.banner?.node?.sourceUrl ?? '',
        picBg: qst.qstFields?.picBg?.node?.sourceUrl ?? '',
    }
})

/* === 6. данные под ArticlesSolo === */
const articleTexts = computed(() => {
    if (!post.value) return []

    return [
        {
            id: 1,
            bg: post.value.picBg,
            content: `
                <h2>${post.value.title}</h2>
                ${post.value.content}
            `,
        },
    ]
})
</script>
