<template>
    <AboutBanner />
    <AboutDesc :desc_tabs="desc_tabs" :desc_items="desc_items_tablets" :desc_items_powder="desc_items_powders" title="Описание" text="Аргинина глутамат является соединением аргинина и глутаминовой кислоты, которые играют важную роль в нейтраизации и выведения из организма аммиака. Защищает печень обладает антиоксидантной, антигипоксической активностью"/>
    <AboutSlider :slider_tabs="slider_tabs" :slides="slides" title="о препарате" text="Обычные средства борются с последствиями, глутаргин алкоклин устраняет причины плохого самочувствия"/>
    <MainQst />
</template>

<script setup>
    const desc_tabs = await useAboutDescNavs();

    const desc_items_tablets = await useAboutDescTablets()

    const desc_items_powders = await useAboutDescPowders()

    const slider_tabs = await useAboutSliderNavs()

    const slides = await useAboutSliders()
</script>

<style scoped>
    
</style>
