<template>
    <div class="articles-cont">
        <div class="container">
            <!-- TITLE -->
            <div class="main-top" v-if="title">
                <h2>{{ title }}</h2>
            </div>

            <!-- TABS -->
            <div class="articles-tabs-s" v-if="localTabs.length">
                <div class="articles-tabs">
                    <button
                        v-for="tab in localTabs"
                        :key="tab.type"
                        :class="{ active: tab.active }"
                        @click="setActive(tab)"
                    >
                        {{ tab.title }}
                    </button>
                </div>
            </div>

            <!-- ARTICLES -->
            <div
                class="articles-row"
                v-if="visibleArticles.length"
            >
                <div
                    class="articles-item"
                    v-for="article in visibleArticles"
                    :key="article.slug"
                >
                    <div class="articles-item-pic">
                        <img :src="article.pic" alt="">
                    </div>

                    <div class="articles-item-cont">
                        <div class="articles-item-title">
                            {{ article.title }}
                        </div>

                        <div class="articles-item-date">
                            {{ article.date }}
                        </div>

                        <div class="articles-item-text">
                            {{ article.text }}
                        </div>

                        <NuxtLink
                            :to="`/${route}/${article.slug}`"
                            class="articles-item-btn"
                        >
                            Читать дальше
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- STORES -->
            <div
                class="stores-row"
                v-if="visibleStores.length"
            >
                <div
                    class="stores-item"
                    v-for="(store, i) in visibleStores"
                    :key="i"
                >
                    <div class="stores-item-pic">
                        <img :src="store.pic" alt="">
                    </div>
                    <a :href="store.href">{{ store.text }}</a>
                </div>
            </div>

            <!-- SHOW MORE -->
            <button
                v-if="hasMore"
                class="articles-more"
                @click="showMore"
            >
                Показать ещё
            </button>
        </div>
    </div>
</template>

<script setup>
/* ===== PROPS ===== */
const props = defineProps({
    tabs: {
        type: Array,
        default: () => [],
    },
    title: String,
    articles: {
        type: Array,
        default: () => [],
    },
    stores: {
        type: Array,
        default: () => [],
    },
    route: {
        type: String,
        default: 'articles',
    },
})

/* ===== LOCAL TABS ===== */
const localTabs = ref([])

watch(
    () => props.tabs,
    (newTabs) => {
        if (Array.isArray(newTabs)) {
            localTabs.value = newTabs.map(t => ({ ...t }))
        }
    },
    { immediate: true }
)

/* ===== SET ACTIVE TAB ===== */
const setActive = (selected) => {
    localTabs.value.forEach(t => (t.active = false))
    selected.active = true

    visibleCount.value = 12
    visibleStoresCount.value = 15
}

/* ===== ACTIVE TYPE ===== */
const activeType = computed(() => {
    return localTabs.value.find(t => t.active)?.type || 'All'
})

/* ======================================================
   =================== ARTICLES =========================
   ====================================================== */

/*
ЛОГИКА:
- All → показываем ВСЁ (даже без types)
- НЕ All →
    - показываем ТОЛЬКО те,
      у которых ЕСТЬ types
      и есть совпадение по slug
*/

const filteredArticles = computed(() => {
    if (activeType.value === 'All') {
        return props.articles
    }

    return props.articles.filter(article => {
        if (!Array.isArray(article.types)) return false
        return article.types.some(t => t.slug === activeType.value)
    })
})

/* ===== SORT (SAFE) ===== */
const sortedArticles = computed(() => {
    return [...filteredArticles.value].sort((a, b) => {
        if (!a.dateRaw || !b.dateRaw) return 0
        return new Date(b.dateRaw) - new Date(a.dateRaw)
    })
})

/* ===== PAGINATION ARTICLES ===== */
const visibleCount = ref(12)

const visibleArticles = computed(() => {
    return sortedArticles.value.slice(0, visibleCount.value)
})

const hasMoreArticles = computed(() => {
    return visibleCount.value < sortedArticles.value.length
})

/* ======================================================
   ==================== STORES ==========================
   ====================================================== */
/* СТАРАЯ ПРОСТАЯ СХЕМА */

const filteredStores = computed(() => {
    if (activeType.value === 'All') return props.stores
    return props.stores.filter(store => store.type === activeType.value)
})

const visibleStoresCount = ref(15)

const visibleStores = computed(() => {
    return filteredStores.value.slice(0, visibleStoresCount.value)
})

const hasMoreStores = computed(() => {
    return visibleStoresCount.value < filteredStores.value.length
})

/* ======================================================
   ================= SHOW MORE ==========================
   ====================================================== */

const hasMore = computed(() => {
    return hasMoreArticles.value || hasMoreStores.value
})

const showMore = () => {
    if (hasMoreArticles.value) {
        visibleCount.value += 12
    } else if (hasMoreStores.value) {
        visibleStoresCount.value += 15
    }
}
</script>



<style scoped>
    .articles-cont {
        margin-bottom: 140px;
    }

    .articles-tabs {
        border-radius: 50px;
        background: #FFF;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
    }

    .articles-tabs button {
        color: #26347F;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -0.48px;
        text-align: center;
        padding: 16px 25px;
        box-sizing: border-box;
        border-radius: 50px;
        background: #E2E4EE;
        width: -webkit-fill-available;
    }

    .articles-tabs button:first-child {
        width: fit-content;
    }

    .articles-tabs button:hover {
        background: #87A4F4;
        color: #fff;
    }

    .articles-tabs button.active {
        background: #26347F;
        color: #fff;
    }

    .articles-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 324px;
        gap: 20px;
        grid-auto-flow: dense;
    }

    .articles-row > div:nth-of-type(6n + 1) {
        grid-column: 1 / 2;
        grid-row: span 2;
        background-color: #26347F;
        flex-direction: column;
        color: #fff;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-pic {
        max-width: 100%;
        height: 414px;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-cont {
        max-width: 100%;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-title {
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 110%;
        text-transform: uppercase;
        max-width: 640px;
        margin-bottom: 10px;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-date {
        position: absolute;
        top: 0;
        right: 0;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-text {
        max-width: 640px;
        -webkit-line-clamp: 3;
        margin-bottom: 25px;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-btn {
        color: #26347F;
        background-color: #fff;
    }

    .articles-row > div:nth-of-type(6n + 1) .articles-item-btn:hover {
        background-color: #87A4F4;
        color: #fff;
    }

    .articles-row > div:nth-of-type(6n + 2) {
        grid-column: 2;
    }

    .articles-row > div:nth-of-type(6n + 3) {
        grid-column: 2;
    }

    .articles-row > div:nth-of-type(6n + 4) {
        grid-column: 2;
        grid-row: span 2;
        background-color: #26347F;
        flex-direction: column;
        color: #fff;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-pic {
        max-width: 100%;
        height: 414px;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-cont {
        max-width: 100%;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-title {
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 110%;
        text-transform: uppercase;
        max-width: 640px;
        margin-bottom: 10px;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-date {
        position: absolute;
        top: 0;
        right: 0;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-text {
        max-width: 640px;
        -webkit-line-clamp: 3;
        margin-bottom: 25px;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-btn {
        color: #26347F;
        background-color: #fff;
    }

    .articles-row > div:nth-of-type(6n + 4) .articles-item-btn:hover {
        background-color: #87A4F4;
        color: #fff;
    }

    .articles-row > div:nth-of-type(6n + 5) {
        grid-column: 1;
    }

    .articles-row > div:nth-of-type(6n + 6) {
        grid-column: 1;
    }

    .articles-item {
        padding: 30px;
        min-height: 324px;
        border-radius: 30px;
        background: #FFF;
        display: flex;
        gap: 20px;
        color: #26347F;
        box-sizing: border-box;
    }

    .articles-item-pic {
        max-width: 382px;
        width: 100%;
        height: 100%;
        border-radius: 30px;
        overflow: hidden;
    }

    .articles-item-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }

    .articles-item-cont {
        display: flex;
        flex-direction: column;
        max-width: 366px;
        width: 100%;
        position: relative;
    }

    .articles-item-title {
        font-family: "PT Sans";
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 110%;
        text-transform: uppercase;
        margin-bottom: 5px;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .articles-item-date {
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: -0.2px;
        margin-bottom: 20px;
    }

    .articles-item-text {
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
        margin-bottom: 30px;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .articles-item-btn {
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        width: 250px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 30px;
        background: #26347F;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
    }

    .articles-item-btn:hover {
        background: rgba(38, 52, 127, 0.70);
    }

    .articles-more {
        margin-top: 80px;
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        padding: 15px 85px;
        box-sizing: border-box;
        border-radius: 50px;
        background: #26347F;
        max-width: 508px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .articles-more:hover {
        background-color: rgba(38, 52, 127, 0.70);
    }

    .stores-row {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .stores-item {
        width: calc(33.33% - 20px);
        padding: 13px;
        box-sizing: border-box;
        border-radius: 19.796px;
        background: #FFF;
        overflow: hidden;
        position: relative;
    }

    .stores-item-pic {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 20px;
    }

    .stores-item-pic img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center center;
    }

    .stores-item a {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        color: #FFF;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1.6px;
        background: linear-gradient(0deg, rgba(38, 52, 127, 0.80) 0%, rgba(38, 52, 127, 0.80) 100%);
        opacity: 0;
        transition: 0.3s;
        margin: 13px;
        border-radius: 20px;
    }

    .stores-item:hover a {
        opacity: 1;
    }

    @media (max-width: 1700px) {
        .articles-cont {
            margin-bottom: 120px;
        }

        .articles-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            grid-auto-rows: auto;
        }

        .articles-row > .articles-item {
            grid-column: auto !important;
            grid-row: auto !important;
        }

        .articles-item {
            background-color: #fff !important;
            color: #26347F !important;
            flex-direction: column;
        }

        .articles-item-pic {
            height: 300px !important;
            max-width: 100%;
        }

        .articles-item-cont {
            max-width: 100%;
        }

        .articles-item-title {
            font-size: 30px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%;
            text-transform: uppercase;
            margin-bottom: 5px !important;
        }

        .articles-item-date {
            position: unset !important;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.2px;
            margin-bottom: 20px;
        }

        .articles-item-text {
            margin-bottom: 30px !important;
        }

        .articles-item-btn {
            background-color: #26347F !important;
            color: #fff !important;
        }

        .articles-item-btn:hover {
            background-color: rgba(38, 52, 127, 0.70) !important;
            color: #fff !important;
        }

        .stores-row {
            gap: 12px;
            row-gap: 28.5px;
        }

        .stores-item {
            width: calc(33.33% - 8px);
            padding: 8px;
            border-radius: 15px;
        }

        .stores-item-pic {
            border-radius: 12px;
        }

        .stores-item a {
            border-radius: 12px;
        }
    }

    @media (max-width: 1199px) {
        .articles-cont {
            margin-bottom: 100px;
        }

        .articles-tabs {
            /* overflow-y: scroll; */
            /* margin-left: -15px; */
            /* margin-right: -15px; */
            width: fit-content;
            box-sizing: border-box;
        }

        .articles-tabs-s {
            overflow-x: scroll;
            margin: 0 -15px;
            padding: 0 15px;
        }

        .articles-tabs-s::-webkit-scrollbar {
            display: none;
        }

        .articles-tabs button {
            white-space: nowrap;
            width: fit-content;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -0.48px;
            text-align: center;
            padding: 16px 25px;
            min-width: 245px;
            max-width: 245px;
        }

        .articles-tabs button:first-child {
            min-width: 80px;
            max-width: 100%;
        }

        .articles-row {
            grid-template-columns: repeat(1, 1fr);
        }

        .articles-item-btn {
            width: 100%;
        }

        .articles-more {
            margin-top: 50px;
        }

        .stores-row {
            row-gap: 30px;
        }
        
        .stores-item {
            width: 100%;
            padding: 12px 10px;
        }

        .stores-item:hover a {
            opacity: 0 !important;
        }
    }

    @media (max-width: 639px) {
        .articles-cont {
            margin-bottom: 80px;
        }

        .main-top {
            justify-content: center;
            margin-bottom: 20px;
        }

        .articles-tabs {
            margin-bottom: 20px;
        }

        .articles-tabs button {
            min-width: fit-content;
            max-width: 100%;
            padding: 10px 25px;
        }

        .articles-item {
            padding: 20px;
            gap: 0;
        }

        .articles-item-cont {
            display: contents;
        }

        .articles-item-title {
            order: 0;
            font-size: 16px !important;
            font-style: normal;
            font-weight: 700;
            line-height: 110% !important;
            text-transform: uppercase;
            margin-bottom: 5px !important;
            -webkit-line-clamp: 2;
        }

        .articles-item-date {
            order: 1;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.14px;
            margin-bottom: 20px;
        }

        .articles-item-pic {
            order: 2;
            height: 120px !important;
            border-radius: 20px;
            margin-bottom: 20px;
        }

        .articles-item-text {
            order: 3;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%;
            letter-spacing: -0.8px;
            margin-bottom: 30px !important;
            -webkit-line-clamp: 2 !important;
        }

        .articles-item-btn {
            order: 4;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            padding: 7px;
        }

        .articles-more {
            margin-top: 50px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            padding: 12px;
            max-width: 310px;
        }

        .stores-row {
            row-gap: 20px;
        }
        
        .stores-item {
            width: 100%;
            padding: 8px;
        }
    }
</style>