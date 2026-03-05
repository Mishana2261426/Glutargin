<template>
    <QstBanner title="Статьи" text="Полезные советы,информация, <br> новости науки, экспертные мнения"/>
    <ArticlesCont title="статьи" :tabs="tabs" :articles="articles"/>
</template>

<script setup>
    const articles = await useArticles()

    const config = useRuntimeConfig()

    const { data: typesData } = await useFetch(
        `${config.public.wpUrl}/graphql`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                query: `
                    {
                    articleTypes {
                        nodes {
                        name
                        slug
                        count
                        }
                    }
                    }
                `,
            },
        }
    )

    const tabs = computed(() => {
        const taxonomyTabs =
            typesData.value?.data?.articleTypes?.nodes?.map(t => ({
                title: t.name,
                type: t.slug,
                active: false,
            })) ?? []

        return [
            {
                title: 'Все',
                type: 'All',
                active: true,
            },
            ...taxonomyTabs,
        ]
    })
</script>

<style scoped>

</style>