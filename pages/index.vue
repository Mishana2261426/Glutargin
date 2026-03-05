<template>
    <MainBanner />
    <MainMed :meds="meds" title="Препараты"/>
    <MainAbout :tabs="tabs" title="О препаратах"/>
    <MainAdv :advs="advs" title="Аргинина глутамат" text="Не вызывает следующих эффектов или реакций"/>
    <MainFeatures :features-tablet="featuresTablet" :features-powder="featuresPowder" title="особенности препаратов"/>
    <MainArticle :articles="articles" title="Статьи" :more="true"/>
    <MainQst />
</template>

<script setup>
    const meds = await useMeds();

    const tabs = await useMainAboutTabs();

    const advs = await useMainAdvs();

    // const articles = ref([
    //     {
    //         date: '05.09.25',
    //         pic: '/images/main-article/pic.png',
    //         title: 'самая важная Профилактика  заболеваний печени',
    //         text: 'Накануне осени выбрали для вас витамины, которые помогут укрепить иммунитет и сохранить ваше здоровье в сезон прохладной погоды.',
    //         link: {
    //             href: '',
    //             text: 'Читать дальше'
    //         }
    //     },
    //     {
    //         date: '29.08.25',
    //         pic: '/images/main-article/pic.png',
    //         title: 'Какие витамины  полезно пить осенью',
    //         text: 'Накануне осени выбрали для вас витамины, которые помогут укрепить иммунитет и сохранить ваше здоровье в сезон прохладной погоды.',
    //         link: {
    //             href: '',
    //             text: 'Читать дальше'
    //         }
    //     },
    //     {
    //         date: '10.08.25',
    //         pic: '/images/main-article/pic.png',
    //         title: 'какие Фрукты и овощи полезны для печени',
    //         text: 'Накануне осени выбрали для вас витамины, которые помогут укрепить иммунитет и сохранить ваше здоровье в сезон прохладной погоды.',
    //         link: {
    //             href: '',
    //             text: 'Читать дальше'
    //         }
    //     },
    // ]);

    const articles = await useArticles()
</script>

<style scoped>
</style>