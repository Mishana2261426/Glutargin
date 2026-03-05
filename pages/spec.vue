<template>
    <QstBanner title="Специалистам" text="Информация, статистика"/>
    <ArticlesCont :tabs="tabs" :articles="articles" route="specs"/>
    <MedGate />
</template>

<script setup lang="ts">
    const articles = await useSpecs()


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
                    specTypes {
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
            typesData.value?.data?.specTypes?.nodes?.map(t => ({
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
    .asd {
        background-color: red;
    }
</style>