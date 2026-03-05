<template>
    <QstBanner title="Где купить?" text="Сервисы онлайн заказа"/>
    <ArticlesCont :tabs="tabs" :stores="stores" title="аптеки"/>
</template>

<script setup>
    const tabs = ref([
        {
            title: 'Все',
            type: 'All',
            active: true
        },
        {
            title: 'Аптеки',
            type: 'pharmacy'
        },
        {
            title: 'Порталы',
            type: 'portal'
        },
        {
            title: 'Маркетплейсы',
            type: 'marketplace'
        },
    ])

    const stores = await useStores()

    // const stores = ref([
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'pharmacy',
    //         pic: '/images/stores/pic1.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'portals',
    //         pic: '/images/stores/pic2.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'marketplaces',
    //         pic: '/images/stores/pic3.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic4.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic5.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic6.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic7.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic8.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'pharmacy',
    //         pic: '/images/stores/pic1.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'portals',
    //         pic: '/images/stores/pic2.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'marketplaces',
    //         pic: '/images/stores/pic3.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic4.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic5.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic6.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic7.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic8.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'pharmacy',
    //         pic: '/images/stores/pic1.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'portals',
    //         pic: '/images/stores/pic2.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: 'marketplaces',
    //         pic: '/images/stores/pic3.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic4.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic5.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic6.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic7.png'
    //     },
    //     {
    //         href: '',
    //         text: 'Открыть сайт',
    //         type: '',
    //         pic: '/images/stores/pic8.png'
    //     },
    // ])
</script>

<style scoped>

</style>