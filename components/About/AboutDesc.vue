<template>
    <section class="about-desc">
        <div class="container">

            <div class="main-top">

                <h2>{{ title }}</h2>
                <div
                    class="main-about-nav"
                    :class="{ 'main-about-nav_powder': activeTabIndex === 1 }"
                >
                    <button
                        v-for="(tab, index) in desc_tabs"
                        :key="index"
                        :class="{ active: activeTabIndex === index }"
                        @click="setTab(index)"
                    >
                        {{ tab.label }}
                    </button>
                </div>
                <div class="main-top-text" v-html="currentTab.text">
                </div>

            </div>

            <div class="about-desc-row" :class="{ 'about-desc-row_powder': activeTab === 'powder' }">
                <div
                    class="about-desc-item"
                    v-for="(item, i) in currentItems"
                    :key="i"
                    @click="setActive(i)"
                    :class="{ 'about-desc-item_active': activeIndex === i }"
                >
                    <div class="about-desc-item-title">{{ item.title }}</div>
                    <div class="about-desc-item-text">{{ item.text }}</div>
                    <div class="about-desc-item-pic">
                        <img :src="item.pic" alt="">
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        title: String,
        text: String,
        desc_items: Array,
        desc_items_powder: Array,
        desc_tabs: Array,
    })

    /* ===== АКТИВНАЯ ВКЛАДКА ===== */
    const activeTabIndex = ref(0)

    /* ===== АКТИВНЫЙ ЭЛЕМЕНТ ===== */
    const activeIndex = ref(null)

    const setActive = (index) => {
        activeIndex.value = activeIndex.value === index ? null : index
    }

    /* ===== СМЕНА ТАБА ===== */
    const setTab = (index) => {
        activeTabIndex.value = index
        activeIndex.value = null
    }

    /* ===== ТЕКУЩИЙ ТАБ ===== */
    const currentTab = computed(() => {
        return props.desc_tabs[activeTabIndex.value]
    })

    /* ===== ТЕКУЩИЕ КАРТОЧКИ ===== */
    const currentItems = computed(() => {
        return activeTabIndex.value === 0
            ? props.desc_items
            : props.desc_items_powder
    })
</script>


<style scoped>
    .about-desc {
        margin-bottom: 140px;
        position: relative;
    }

    .main-top {
        display: flex;
        flex-direction: column;
    }

    .main-top-text {
        max-width: 1531px;
        margin-left: auto;
        color: #26347F;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.6px;
        text-indent: 430px;
    }

    .about-desc-row {
        display: flex;
        flex-direction: column;
    }

    .about-desc-item {
        border-bottom: 1px solid rgba(38, 52, 127, 0.15);
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        color: #26347F;
        align-items: center;
        position: relative;
        transition: 0.3s;
    }

    .about-desc-item-title {
        color: inherit;
        font-family: Inter;
        font-size: 48px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -2.4px;
        text-transform: uppercase;
        width: 50%;
    }

    .about-desc-item-text {
        color: inherit;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.6px;
        width: 50%;
        transition: 0.3s;
    }

    .about-desc-item-pic {
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        right: 110px;
        top: 0;
        bottom: 0;
        margin: auto;
        overflow: hidden;
        opacity: 0;
        transition: 0.3s;
    }

    .about-desc-item-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }

    .main-about-nav {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        gap: 10px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 80px;
        background: #26347F;
        color: #26347F;
        transition: 0.3s;
    }

    .main-about-nav_powder {
        background-color: #E51837;
        color: #E51837;
    }

    .main-about-nav button {
        color: #FFF;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px;
        letter-spacing: -0.72px;
        padding: 5px 30px;
        box-sizing: border-box;
        transition: 0.3s;
        border-radius: 100px;
        background-color: transparent;
    }

    .main-about-nav:hover button {
        color: #87A4F4;
    }

    .main-about-nav_powder:hover button {
        color: #F48789;
    }

    .main-about-nav button.active {
        color: inherit;
        background-color: #fff;
    }

    @media (min-width: 1200px) {
        .about-desc-item:hover {
            color: #fff;
            border-radius: 20px;
            background-color: #26347F;
        }

        .about-desc-item:hover .about-desc-item-pic {
            opacity: 1;
        }

        .about-desc-row_powder .about-desc-item:hover {
            background-color: #E51837;
        }
    }

    @media (max-width: 1700px) {
        .about-desc {
            margin-bottom: 120px;
        }

        .main-top-text {
            max-width: 1041px;
            text-indent: 300px;
        }

        .about-desc-item {
            height: 88px;
            align-items: flex-start;
        }

        .about-desc-item-text {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 20px;
            height: fit-content;
            margin: auto;
            width: auto;
        }

        .about-desc-item-pic {
            width: 50%;
            max-width: 500px;
            height: 100%;
            border-radius: 20px;
            margin-right: 0;
            position: unset;
        }

        .main-about-nav {
            padding: 3px;
            gap: 6.336px;
        }

        .main-about-nav button {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            letter-spacing: -0.64px;
            padding: 3px 25px;
        }
    }

    @media (min-width: 1200px) and (max-width: 1700px) {
        .about-desc-item:hover {
            height: 180px;
        }

        .about-desc-item:hover .about-desc-item-text {
            right: auto;
        }
    }

    @media (max-width: 1199px) {
        .about-desc {
            margin-bottom: 100px;
        }

        .main-top-text {
            max-width: 457px;
            color: #26347F;
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1px;
            text-indent: 0;
        }

        .about-desc-row {
            margin: 0 -15px;
        }

        .about-desc-item {
            max-height: 110px;
            min-height: 110px;
            height: auto;
            flex-direction: column;
            padding: 20px 15px;
            overflow: hidden;
        }

        .about-desc-item-title {
            width: 100%;
            font-size: 36px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1.8px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .about-desc-item-text {
            position: unset;
            width: 100%;
            font-size: 32px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1.6px;
        }

        .about-desc-item_active {
            max-height: 340px;
            border-radius: 20px;
            background: #26347F;
            color: #fff;
        }

        .about-desc-row_powder .about-desc-item_active {
            background-color: #E51837;
        }

        .about-desc-item-pic {
            width: 100%;
            opacity: 1;
            max-width: 100%;
            height: 200px;
            margin-top: 10px;
        }

        .main-about-nav {
            position: unset;
            margin-right: auto;
        }
    }

    @media (max-width: 639px) {
        .main-top {
            align-items: flex-start;
            gap: 20px;
        }

        .main-top-text {
            margin-left: 0;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1px;
        }

        .about-desc-item {
            max-height: 137px;
            min-height: 137px;
        }

        .about-desc-item_active {
            max-height: 371px;
        }

        .about-desc-item-title {
            max-width: 220px;
            font-size: 36px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1.8px;
            min-height: 72px;
            max-width: 72px;
            text-transform: uppercase;
        }

        .about-desc-item-text {
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1px;
        }
    }
    
</style>