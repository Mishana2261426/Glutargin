<template>
    <header class="header">
        <div class="container">
            <NuxtLink to="/" class="header-logo">
                <img src="/images/header/logo_full.svg" alt="" class="header-logo_full">
                <img src="/images/header/logo_md.svg" alt="" class="header-logo_md">
            </NuxtLink>
            <div class="header-nav" :class="{ active: isActive }">
                <NuxtLink :to="link.to" v-for="link in links" :class="{ 'header-nav_mob': link.mob }" exact-active-class="header-nav_active">{{ link.title }}</NuxtLink>
                <div class="header-nav-top">
                    <div class="header-nav-search">
                        <button class="header-nav-search-btn" :class="{ active: searchStatus }"  @click="toggleSearch">
                            Поиск
                        </button>
                    </div>
                    <button class="header-nav-close" @click="toggleMenu"></button>
                </div>
                <NuxtLink to="/stores" class="header-link">
                    Где купить
                </NuxtLink>
            </div>
            <NuxtLink to="/stores" class="header-link" :class="{ active: searchStatus }">
                Где купить
            </NuxtLink>
            <button class="header-menu-btn" @click="toggleMenu"></button>
        </div>
    </header>
    <div class="search" :class="{ active: searchStatus }">
        <button class="search-close" @click="toggleSearch"></button>
        <div class="search-cont">
            <input
                type="text"
                placeholder="Я ищу"
                v-model="searchTerm"
            />
            <ul v-if="searchTerm.length >= 2">
                <li v-for="item in blogs" :key="`${item.type}-${item.slug}`">
                    <NuxtLink
                        :to="
                            item.type === 'article'
                                ? `/articles/${item.slug}`
                                : item.type === 'spec'
                                    ? `/specs/${item.slug}`
                                    : `/qsts/${item.slug}`
                        "
                    >
                        {{ item.title }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        links: Object
    })

    const isActive = ref(false)
    const searchStatus = ref(false)

    function toggleMenu() {
        isActive.value = !isActive.value
    }

    function toggleSearch() {
        searchStatus.value = !searchStatus.value
    }

    const route = useRoute()

    watch(() => route.fullPath, () => {
        isActive.value = false
        searchStatus.value = false
    })

    /* ===== ПОИСК ===== */

    const searchTerm = ref('')
    const debouncedTerm = ref('')

    let timer: ReturnType<typeof setTimeout> | null = null

    watch(searchTerm, (val) => {
        if (!val) {
            debouncedTerm.value = ''
            return
        }

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            debouncedTerm.value = val
        }, 300)
    })

    const blogs = useGlobalSearch(debouncedTerm)
</script>

<style scoped>
    .header {
        height: 70px;
        position: sticky;
        top: 20px;
        right: 0;
        left: 0;
        z-index: 9;
        margin-bottom: 40px;
    }

    .header .container {
        display: flex;
        align-items: center;
        gap: 20px;
        height: 100%;
    }

    .header-logo {
        border-radius: 500px;
        background: #26347F;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 0 22px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .header-logo:hover {
        background: rgba(38, 52, 127, 0.70);
    }

    .header-logo_full {
        width: 100%;
    }

    .header-logo_md {
        display: none;
    }

    .header-nav {
        height: 100%;
        width: 100%;
        padding: 20px 50px;
        box-sizing: border-box;
        border-radius: 60px;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }

    .header-nav a {
        color: #26347F;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        letter-spacing: -0.8px;
        text-align: center;
        cursor: pointer;
    }

    .header-nav a:hover {
        color: #87A4F4;
    }

    .header-nav_active {
        color: #E51837 !important;
    }

    .header-nav_mob {
        display: none;
    }

    .header-nav-search {

    }

    .header-nav-search input {
        display: none;
    }

    .header-nav-search-btn {
        color: #26347F;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        letter-spacing: -0.8px;
        text-align: center;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .header-nav-search-btn:hover {
        color: #87A4F4;
    }

    .header-nav-search-btn::before {
        content: '';
        width: 20px;
        height: 20px;
        background-image: url(/images/header/search.svg);
        background-size: 100% 100%;
        display: flex;
        transition: 0.3s;
    }

    .header-nav-search-btn:hover::before {
        background-image: url(/images/header/search_hover.svg);
    }

    .header-nav-search-btn.active {
        color: #E51837;
    }

    .header-nav-search-btn.active::before {
        background-image: url(/images/header/search_active.svg);
    }

    .header-link {
        width: 284px;
        height: 100%;
        display: flex;
        border-radius: 50px;
        background: #87A4F4;
        justify-content: center;
        align-items: center;
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        letter-spacing: -0.8px;
        text-align: center;
    }

    .header-link:hover {
        color: #26347F;
        background-color: rgba(135, 164, 244, 0.70);
    }

    .header-link.active {
        color: #26347F;
        background-color: #fff;
    }

    .header-menu-btn {
        display: none;
    }

    .header-nav-close {
        display: none;
    }

    .header-nav .header-link {
        display: none;
    }

    .search {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: #87A4F4;
        z-index: 5;
        max-height: 0;
        transition: 0.3s;
        overflow: hidden;
    }

    .search.active {
        max-height: 100%;
    }

    .search-cont {
        max-width: 919px;
        margin: 0 auto;
        margin-top: 140px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .search-cont input {
        color: #FFF;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1.28px;
        padding-bottom: 10px;
        padding-left: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    .search-cont input::placeholder {
        color: rgba(255, 255, 255, 0.30);
    }

    .search-cont ul {
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .search-cont ul a {
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
        letter-spacing: -0.8px;
        text-align: center;
        /* text-transform: capitalize; */
    }

    .search-cont ul a:hover {
        opacity: 0.6;
    }

    .search-close {
        display: none;
    }

    @media (max-width: 1700px) {
        .header {
            height: 44px;
        }

        .header .container {
            gap: 12px;
        }

        .header-logo_full {
            display: none;
        }

        .header-logo {
            padding: 0 38.5px;
        }

        .header-logo_md {
            display: flex;
        }

        .header-nav {
            padding: 0 43px;
        }

        .header-nav a {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            letter-spacing: -0.64px;
        }

        .header-nav-search-btn {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            letter-spacing: -0.64px;
            text-align: center;
            text-transform: capitalize;
        }

        .header-nav-search-btn::before {
            width: 15px;
            height: 15px;
        }

        .header-link {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            letter-spacing: -0.64px;
            text-align: center;
            padding: 0 34px;
            width: auto;
            white-space: nowrap;
        }
    }

    @media (max-width: 1199px) {
        .header {
            height: 50px;
        }

        .header-logo {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .header-link {
            max-width: 200px;
            min-width: 200px;
            box-sizing: border-box;
            padding: 0;
        }

        .header-menu-btn {
            display: flex;
            min-width: 50px;
            max-width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 50%;
            background-image: url(/images/header/menu.svg);
            background-size: 24px 16px;
            background-repeat: no-repeat;
            background-position: center center;
        }

        .header-nav {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            /* height: 100%; */
            left: 0;
            border-radius: 0;
            padding: 20px 15px;
            box-sizing: border-box;
            background-color: #F1F1F1;
            flex-direction: column;
            gap: 10px;
            /* justify-content: flex-end; */
            justify-content: flex-start;
            overflow-y: scroll;
            left: 100%;
            transition: 0.3s;
        }

        .header-nav::-webkit-scrollbar {
            display: none;
        }

        .header-nav.active {
            left: 0;
        }

        .header-nav-top {
            display: flex;
            gap: 11px;
            width: 100%;
            height: 50px;
            margin-bottom: 20px;
            order: 0;
        }

        .header-nav-search {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            border-radius: 316.793px;
            background: #26347F;
            overflow: hidden;
        }

        .header-nav-search-btn, .header-nav-search-btn.active, .header-nav-search-btn:hover {
            color: #FFF;
            width: 100%;
            max-width: 100%;
            height: 100%;
            margin: 0 auto;
            justify-content: center;
        }

        .header-nav-search-btn::before, .header-nav-search-btn.active::before, .header-nav-search-btn:hover::before {
            background-image: url(/images/header/search_menu.svg);
        }

        .header-nav-close {
            display: flex;
            max-width: 50px;
            min-width: 50px;
            height: 50px;
            background-color: #fff;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            background-image: url(/images/header/menu_close.svg);
            background-size: 22px 20px;
            background-repeat: no-repeat;
            background-position: center center;
        }

        .header-nav a {
            color: #26347F;
            font-family: Inter;
            font-size: 26px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%;
            letter-spacing: -1.3px;
            width: 100%;
            border-radius: 50px;
            background: #E2E4EE;
            box-sizing: border-box;
            padding: 10px;
            border: 10px solid #fff;
            order: 1;
        }

        .header-nav_mob {
            display: block;
        }

        .search {
            z-index: 9;
        }

        .search-close {
            display: flex;
            max-width: 50px;
            min-width: 50px;
            height: 50px;
            background-color: #fff;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            background-image: url(/images/header/menu_close.svg);
            background-size: 22px 20px;
            background-repeat: no-repeat;
            background-position: center center;
            position: absolute;
            top: 20px;
            right: 15px;
        }
        
        .search-cont {
            margin-top: 0;
            padding: 0 15px;
            box-sizing: border-box;
            padding-top: 80px;
        }

        .search-cont input {
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            letter-spacing: -0.8px;
            text-transform: capitalize;
            padding-bottom: 15px;
        }
    }

    @media (max-width: 639px) {
        .header-link {
            display: none;
        }

        .header-nav .header-link {
            display: flex;
            max-width: 100%;
            background-color: #87A4F4;
            border: 0;
            color: #FFF;
            text-align: center;
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%; /* 20px */
            letter-spacing: -0.8px;
            max-height: 70px;
            min-height: 70px;
            margin-top: 20px;
        }
    }

</style>