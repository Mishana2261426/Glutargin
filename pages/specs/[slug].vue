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
    <MedGate />
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
const fetchKey = computed(() => `spec-${slug.value}`)

/* === 4. запрос SPEC === */
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
                    spec(id: $slug, idType: SLUG) {
                        title
                        content
                        specFields {
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
    const spec = data.value?.data?.spec
    if (!spec) return null

    return {
        title: spec.title,
        content: spec.content,
        banner: spec.specFields?.banner?.node?.sourceUrl ?? '',
        picBg: spec.specFields?.picBg?.node?.sourceUrl ?? '',
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
