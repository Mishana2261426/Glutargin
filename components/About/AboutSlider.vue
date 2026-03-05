<template>
    <div class="about-slider">
        <div class="container">
            <div class="main-top">
                <h2>{{ title }}</h2>

                <div
                    class="main-about-nav"
                    :class="{ 'main-about-nav_powder': activeTabIndex === 1 }"
                >
                    <button
                        v-for="(tab, index) in slider_tabs"
                        :key="index"
                        :class="{ active: activeTabIndex === index }"
                        @click="setTab(index)"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <div class="main-top-text" v-html="currentTab.text"></div>
            </div>

            <div
                class="about-slider-cont"
                :class="{ 'about-slider-cont_powder': activeTabIndex === 1 }"
            >
                <div
                    class="about-slider-cont-row swiper"
                    :key="activeTabIndex"
                >
                    <div class="swiper-wrapper">
                        <div
                            v-for="(item, index) in filteredSlides"
                            :key="item.pic"
                            class="swiper-slide about-slider-slide"
                        >
                            <div class="about-slider-slide-block">
                                <div class="about-slider-num">
                                    {{ String(index + 1).padStart(2, '0') }}
                                </div>

                                <div class="about-slider-pic">
                                    <img :src="item.pic" alt="">
                                    <img
                                        :src="item.pic_active"
                                        alt=""
                                        class="about-slider-pic_active"
                                    >
                                </div>

                                <div class="about-slider-text">
                                    {{ item.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="about-slider-nav">
                    <button
                        class="about-slider-nav-btn about-slider-nav-btn_prev"
                    ></button>
                    <button
                        class="about-slider-nav-btn about-slider-nav-btn_next"
                    ></button>
                </div>
            </div>

            <NuxtLink to="/stores" class="about-slider-where">
                Где купить
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
    slides: {
        type: Array,
        default: () => [],
    },
    title: {
        type: String,
        default: '',
    },
    slider_tabs: {
        type: Array,
        default: () => [],
    },
})

/* -------------------------
   Tabs
-------------------------- */

const activeTabIndex = ref(0)

const setTab = (index) => {
    activeTabIndex.value = index
}

const currentTab = computed(() => {
    return props.slider_tabs[activeTabIndex.value] ?? {}
})

/* -------------------------
   Slides filtering
-------------------------- */

const filteredSlides = computed(() => {
    if (!props.slides.length) return []

    const currentType =
        activeTabIndex.value === 0 ? 'tablet' : 'powder'

    return props.slides.filter(item => item.type === currentType)
})

/* -------------------------
   Swiper
-------------------------- */

let swiperInstance = null

const ensureSeamlessLoop = () => {
    const container = document.querySelector('.about-slider-cont-row')
    if (!container) return

    const wrapper = container.querySelector('.swiper-wrapper')
    if (!wrapper) return

    const slides = Array.from(wrapper.children)
    if (!slides.length) return

    const getWidth = () =>
        Array.from(wrapper.children).reduce(
            (sum, slide) => sum + slide.offsetWidth,
            0
        )

    const containerWidth = container.offsetWidth
    let totalWidth = getWidth()

    while (totalWidth < containerWidth * 3) {
        slides.forEach(slide => {
            const clone = slide.cloneNode(true)
            clone.classList.add('swiper-slide-dup')
            wrapper.appendChild(clone)
        })
        totalWidth = getWidth()
    }
}

const initSwiper = () => {
    if (swiperInstance) return

    ensureSeamlessLoop()

    swiperInstance = new Swiper('.about-slider-cont-row', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 14,
        centeredSlides: true,
        navigation: {
            nextEl: '.about-slider-nav-btn_next',
            prevEl: '.about-slider-nav-btn_prev',
        },
        on: {
            slideChange(swiper) {
                swiper.slides.forEach(slide => {
                    slide.classList.remove('prev-2', 'next-2')
                })

                const total = swiper.slides.length
                const prev2Index =
                    (swiper.activeIndex - 2 + total) % total
                const next2Index =
                    (swiper.activeIndex + 2) % total

                swiper.slides[prev2Index]?.classList.add('prev-2')
                swiper.slides[next2Index]?.classList.add('next-2')
            },
        },
    })
}

/* -------------------------
   Lifecycle
-------------------------- */

onMounted(() => {
    initSwiper()
})

watch(activeTabIndex, async () => {
    await nextTick()

    swiperInstance?.destroy(true, true)
    swiperInstance = null

    initSwiper()
})

onBeforeUnmount(() => {
    swiperInstance?.destroy(true, true)
    swiperInstance = null
})
</script>


<style scoped>
    .about-slider {
        margin-bottom: 140px;
    }

    .main-top {
        display: flex;
        flex-direction: column;
    }

    .main-top-text {
        max-width: 831px;
        color: #26347F;
        font-family: Inter;
        font-size: 32px;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.6px;
        margin-left: auto;
        margin-right: 345px;
    }

    .about-slider-cont {
        height: 670px;
        border-radius: 30px;
        background: #FFF;
        display: flex;
        align-items: flex-start;
        padding-top: 30px;
        box-sizing: border-box;
        position: relative;
    }

    .swiper-wrapper {
        /* align-items: center; */
    }

    .about-slider-slide {
        height: 549px;
        min-width: 478px;
        max-width: 478px;
        display: flex;
        align-items: flex-end;
        position: relative;
        z-index: 1;
        /* transition: 0.3s; */
    }

    .about-slider-slide-block {
        height: 318px;
        width: 100%;
        border-radius: 30px;
        background: linear-gradient(0deg, rgba(38, 52, 127, 0.10) 0%, rgba(38, 52, 127, 0.10) 100%), #DFE0EB;
        padding: 30px;
        box-sizing: border-box;
        transition: 0.3s;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .swiper-slide-prev .about-slider-slide-block, .swiper-slide-next .about-slider-slide-block {
        background-color: #F2F2F2;
    }

    .swiper-slide-prev .about-slider-slide-block {
        transform: translateX(64px);
        margin-bottom: 68px;
    }

    .swiper-slide-next .about-slider-slide-block {
        transform: translateX(-64px);
        margin-bottom: 68px;
    }

    .swiper-slide-prev, .swiper-slide-next {
        z-index: 2;
    }

    .about-slider-slide.prev-2 .about-slider-slide-block {
        transform: translateX(286px);
        margin-bottom: 133px;
    }

    .about-slider-slide.next-2 .about-slider-slide-block {
        transform: translateX(-286px);
        margin-bottom: 133px;
    }

    .swiper-slide-active {
        /* width: 768px !important; */
        z-index: 3;
    }

    .swiper-slide-active .about-slider-slide-block {
        background: #26347F;
        height: 100%;
    }

    .about-slider-cont_powder .swiper-slide-active .about-slider-slide-block {
        background: #E51837;
    }

    .about-slider-num {
        color: #FFF;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 120%;
        letter-spacing: -0.42px;
        padding: 6px 13px;
        box-sizing: border-box;
        border-radius: 30px;
        background: #26347F;
        width: fit-content;
    }

    .swiper-slide-active .about-slider-num {
        color: #26347F;
        background-color: #fff;
    }

    .about-slider-pic {
        width: 63px;
        height: 63px;
        position: absolute;
        right: 30px;
        top: 30px;
    }

    .about-slider-pic img {
        width: 100%;
        height: 100%;
        transition: 0.3s;
    }

    .about-slider-pic_active {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        opacity: 0;
    }

    .swiper-slide-active .about-slider-pic {
        right: 0;
        left: 0;
        top: 98px;
        margin: auto;
        width: 172px;
        height: auto;
        animation: pulse 1.6s ease-in-out infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.08);
        }
        100% {
            transform: scale(1);
        }
    }

    .swiper-slide-active .about-slider-pic img {
        opacity: 0;
    }

    .swiper-slide-active .about-slider-pic_active {
        opacity: 1 !important;
    }

    .about-slider-text {
        max-width: 344px;
        color: #26347F;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.6px;
        margin-top: auto;
    }

    .swiper-slide-active .about-slider-text {
        max-width: 100%;
        color: #FFF;
    }

    .about-slider-nav {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 18px;
        position: absolute;
        right: 0;
        left: 0;
        bottom: 18px;
    }

    .about-slider-nav-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-image: url(/images/main-med/arrow_active.svg);
        background-size: 8px 16px;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #26347F;
        transition: 0.3s;
    }

    .about-slider-cont_powder .about-slider-nav-btn {
        background-color: #E51837;
    }

    .about-slider-nav-btn:hover {
        background-color: #fff;
        background-image: url(/images/main-med/arrow.svg);
    }

    .about-slider-nav-btn_next {
        transform: rotate(180deg);
    }

    .swiper-navigation-icon {
        display: none !important;
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

    .about-slider-where {
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        max-width: 508px;
        width: 100%;
        margin: 0 auto;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px 85px;
        box-sizing: border-box;
        border-radius: 50px;
        background: #26347F;
    }

    .about-slider-where:hover {
        background-color: rgba(38, 52, 127, 0.70);
    }

    @media (max-width: 1700px) {
        .about-slider {
            margin-bottom: 120px;
        }

        .about-slider-slide {
            align-items: center;
        }

        .about-slider-slide .about-slider-slide-block {
            transform: none !important;
            margin: 0;
        }

        .main-top-text {
            margin-left: auto;
            margin-right: 10%;
            max-width: 677px;
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

    @media (max-width: 1199px) {
        .about-slider {
            margin-bottom: 100px;
        }

        .main-top {
            flex-direction: row;
        }

        .about-slider-cont {
            height: 617px;
        }

        .about-slider-slide {
            height: 495px;
        }

        .about-slider-slide-block {
            padding: 30px;
        }

        .swiper-slide-active .about-slider-pic {
            top: 79px;
        }

        .main-top {
            flex-direction: column;
            margin-bottom: 20px;
            gap: 20px;
        }

        .main-about-nav {
            position: unset;
            margin-right: auto;
        }

        .main-top-text {
            margin-left: auto;
            margin-right: 0;
            max-width: 457px;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1px;
        }

        .about-slider-where {
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            padding: 12px 0;
            margin-top: 20px;
            /* max-width: 100%; */
        }
    }

    @media (max-width: 639px) {
        .main-top {
            margin-bottom: 20px;
        }

        .about-slider {
            margin-bottom: 80px;
        }

        .about-slider-cont {
            height: 477px;
        }

        .about-slider-slide {
            height: 385px;
            max-width: 300px;
            min-width: 300px;
        }

        .about-slider-slide-block {
            padding: 10px;
            padding-bottom: 30px;
        }

        .about-slider-text {
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1px;
        }

        .swiper-slide-active .about-slider-pic {
            width: 130px;
            top: 80px;
        }
    }
</style>
