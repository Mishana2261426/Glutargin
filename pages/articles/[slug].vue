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

/* === 3. вычисляем key СТРОКОЙ === */
const fetchKey = computed(() => `blog-${slug.value}`)

/* === 4. запрос статьи === */
const { data, error } = await useFetch(
    `${config.public.wpUrl}/graphql`,
    {
        key: fetchKey.value, // ✅ СТРОКА
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            query: `
                query ($slug: ID!) {
                    blog(id: $slug, idType: SLUG) {
                        title
                        content
                        blogFields {
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
        watch: [slug], // ✅ обязательно
    }
)

if (error.value) {
    console.error('GraphQL error:', error.value)
}

/* === 5. нормализация данных === */
const post = computed(() => {
    const blog = data.value?.data?.blog
    if (!blog) return null

    return {
        title: blog.title,
        content: blog.content,
        banner: blog.blogFields?.banner?.node?.sourceUrl ?? '',
        picBg: blog.blogFields?.picBg?.node?.sourceUrl ?? '',
    }
})

/* === 6. под ArticlesSolo === */
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
