<template>
    <div class="main-med">
        <div class="container">
            <div class="main-top">
                <h2>
                    {{title}}
                </h2>
            </div>
            <div class="main-med-swiper">
                <div class="swiper-wrapper">
                    <div v-for="med in meds" class="swiper-slide main-med-swiper-slide" :class="{ 'main-med-swiper-slide_powder': med.type === 'powder' }">
                        <div class="main-med-swiper-slide-top">
                            <div class="main-med-swiper-slide-title">
                                {{med.title}}
                            </div>
                            <NuxtLink to="instruction" class="main-med-swiper-slide-btn">
                                Инструкция
                            </NuxtLink>
                        </div>
                        <div class="main-med-swiper-slide-pic">
                            <img :src="med.pic" alt="">
                        </div>
                        <div class="main-med-swiper-slide-bot">
                            <span>
                                {{med.add}}
                            </span>
                            <NuxtLink to="stores">
                                Где купить
                            </NuxtLink>
                        </div>
                        <div class="main-med-swiper-slide-bg">
                            <span>
                            </span>
                            <span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="main-med-swiper-nav">
                    <div class="main-med-swiper-nav-prev"></div>
                    <div class="main-med-swiper-nav-next"></div>
                </div>
            </div>
            <div class="main-med-mob">
                <div class="main-med-swiper_mob main-med-swiper_mob_tablet swiper">
                    <div class="swiper-wrapper">
                        <div
                            v-for="med in meds.filter(m => m.type === 'tablet')"
                            :key="med.title"
                            class="swiper-slide main-med-swiper-slide"
                        >
                            <div class="main-med-swiper-slide-top">
                                <div class="main-med-swiper-slide-title">
                                    {{ med.title }}
                                </div>
                                <NuxtLink to="instruction" class="main-med-swiper-slide-btn">
                                    Инструкция
                                </NuxtLink>
                            </div>

                            <div class="main-med-swiper-slide-pic">
                                <img :src="med.pic" alt="">
                            </div>

                            <div class="main-med-swiper-slide-bot">
                                <span>{{ med.add }}</span>
                                <NuxtLink to="stores">
                                    Где купить
                                </NuxtLink>
                            </div>

                            <div class="main-med-swiper-slide-bg">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="main-med-swiper-nav">
                        <div class="main-med-swiper-nav-prev"></div>
                        <div class="main-med-swiper-nav-next"></div>
                    </div>
                </div>
                <div class="main-med-swiper_mob main-med-swiper_mob_powder swiper">
                    <div class="swiper-wrapper">
                        <div
                            v-for="med in meds.filter(m => m.type === 'powder')"
                            :key="med.title"
                            class="swiper-slide main-med-swiper-slide main-med-swiper-slide_powder"
                        >
                            <div class="main-med-swiper-slide-top">
                                <div class="main-med-swiper-slide-title">
                                    {{ med.title }}
                                </div>
                                <NuxtLink to="instruction" class="main-med-swiper-slide-btn">
                                    Инструкция
                                </NuxtLink>
                            </div>

                            <div class="main-med-swiper-slide-pic">
                                <img :src="med.pic" alt="">
                            </div>

                            <div class="main-med-swiper-slide-bot">
                                <span>{{ med.add }}</span>
                                <NuxtLink to="stores">
                                    Где купить
                                </NuxtLink>
                            </div>

                            <div class="main-med-swiper-slide-bg">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="main-med-swiper-nav">
                        <div class="main-med-swiper-nav-prev"></div>
                        <div class="main-med-swiper-nav-next"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        meds: Object,
        title: String
    })
    onMounted(() => {
    let swiper

    const toggleSwiper = () => {
        if (window.innerWidth <= 1119) {
            swiper?.destroy(true, true)
            swiper = null
        } else {
            if (!swiper) {
                swiper = new Swiper('.main-med-swiper', {
                    loop: true,
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.main-med-swiper-nav-next',
                        prevEl: '.main-med-swiper-nav-prev'
                    },
                })
            }
        }

        const tabletSwiper = new Swiper('.main-med-swiper_mob_tablet', {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            navigation: {
                nextEl: '.main-med-swiper_mob_tablet .main-med-swiper-nav-next',
                prevEl: '.main-med-swiper_mob_tablet .main-med-swiper-nav-prev'
            },
            // если навигация не нужна – оставляем так
            // pagination / navigation можно добавить при желании
        })

        const tabletSwiper2 = new Swiper('.main-med-swiper_mob_powder', {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            navigation: {
                nextEl: '.main-med-swiper_mob_powder .main-med-swiper-nav-next',
                prevEl: '.main-med-swiper_mob_powder .main-med-swiper-nav-prev'
            },
            // если навигация не нужна – оставляем так
            // pagination / navigation можно добавить при желании
        })
    }

    toggleSwiper()
    window.addEventListener('resize', toggleSwiper)
})
</script>

<style scoped>
    .main-med {
        margin-bottom: 140px;
    }

    .main-med-swiper {
        display: flex;
        flex-direction: column;
        gap: 30px;
        overflow: hidden;
    }

    .main-med-swiper-nav {
        position: relative;
        margin: 0 auto;
        display: flex;
        gap: 10px;
    }

    .main-med-swiper-nav-next, .main-med-swiper-nav-prev {
        position: unset;
        font-size: 0;
        cursor: pointer;
        width: 32px;
        height: 32px;
        background-color: #FFF;
        border-radius: 50%;
        background-image: url(/images/main-med/arrow.svg);
        background-size: 8px 16px;
        background-position: center center;
        background-repeat: no-repeat;
        display: flex;
        transition: 0.3s;
    }

    .main-med-swiper-nav-next:hover, .main-med-swiper-nav-prev:hover {
        background-color: #26347F;
        background-image: url(/images/main-med/arrow_active.svg);
    }

    .main-med-swiper-nav-next {
        transform: rotate(180deg);
    }

    .main-med-swiper-slide {
        background: #fff;
        padding: 30px;
        box-sizing: border-box;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        color: #26347F;
        transition: 0.3s;
        position: relative;
        overflow: hidden;
    }

    .main-med-swiper-slide::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(180deg, #029DE0 0%, #283681 100%);
        opacity: 0;
        transition: opacity .3s;
        z-index: 0;
    }

    .main-med-swiper-slide_powder::before {
        background: linear-gradient(180deg, #CB0044 0%, #53001F 100%), #FFF;
    }

    .main-med-swiper-slide:hover::before {
        opacity: 1;
    }

    .main-med-swiper-slide:hover {
        color: #fff;
    }

    .main-med-swiper-slide_powder {
        color: #E51837;
    }

    .main-med-swiper-slide-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        z-index: 1;
    }

    .main-med-swiper-slide-title {
        color: inherit;
        font-family: "PT Sans";
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
    }

    .main-med-swiper-slide-btn {
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        max-width: 250px;
        height: 50px;
        width: 100%;
        background-color: #26347F;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main-med-swiper-slide-btn:hover {
        background-color: rgba(38, 52, 127, 0.70);
    }

    .main-med-swiper-slide_powder .main-med-swiper-slide-btn {
        background-color: #E51837;   
    }

    .main-med-swiper-slide_powder .main-med-swiper-slide-btn:hover {
        background-color: rgba(229, 24, 55, 0.70);
    }

    .main-med-swiper-slide-pic {
        aspect-ratio: 488.00/269.77;
        max-width: 56%;
        position: relative;
        z-index: 1;
    }

    .main-med-swiper-slide-pic img {
        width: 100%;
        height: 100%;
    }

    .main-med-swiper-slide-bot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        position: relative;
        z-index: 1;
    }

    .main-med-swiper-slide-bot span {
        color: inherit;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
    }

    .main-med-swiper-slide-bot a {
        color: inherit;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -1px;
        transition: none;
        padding-bottom: 1px;
        border-bottom: 1px solid;
    }

    .main-med-swiper-slide-bot a:hover {
        /* opacity: 0.7; */
    }

    .main-med-swiper-slide-bg {
        position: absolute;
        /* top: 114px; */
        right: 40px;
        bottom: 0;
        display: flex;
        gap: 45px;
        z-index: 0;
        /* height: fit-content; */
        height: 100%;
        opacity: 0.5;
        transition: 0.3s;
        align-items: flex-end;
    }

    .main-med-swiper-slide_powder .main-med-swiper-slide-bg {
        right: -50px;
        gap: 20px;
        bottom: 64px;
        opacity: 0.1;
    }

    .main-med-swiper-slide-bg span {
        width: 130px;
        height: 300px;
        background-image: url(/images/main-med/pill.svg);
        background-size: 100% 100%;
        transition: 0.3s;
    }

    .main-med-swiper-slide_powder .main-med-swiper-slide-bg span {
        background-image: url(/images/main-med/pack.svg);
        width: 202.903px;
        height: 258.24px;
        position: relative;
    }

    .main-med-swiper-slide_powder .main-med-swiper-slide-bg span:nth-child(2)::after {
        content: '';
        width: 33px;
        height: 47px;
        background-image: url(/images/main-med/grains.svg);
        background-size: 100% 100%;
        position: absolute;
        transform: rotate(108deg);
        top: -20px;
        left: -30px;
        opacity: 0;
    }

    .main-med-swiper-slide-bg span:first-child {
        transform: translateY(144px);
    }

    .main-med-swiper-slide:hover .main-med-swiper-slide-bg {
        opacity: 1;
        gap: 30px;
        right: 78px;
        align-items: center;
    }

    .main-med-swiper-slide_powder:hover .main-med-swiper-slide-bg {
        bottom: 0;
        right: 40px;
        opacity: 1;
    }

    .main-med-swiper-slide:hover .main-med-swiper-slide-bg span {
        width: 87.3px;
        height: 202px;
        transform: none;
    }

    .main-med-swiper-slide_powder:hover .main-med-swiper-slide-bg span {
        width: 157.143px;
        height: 200px;
        opacity: 0.5;
    }

    .main-med-swiper-slide_powder:hover .main-med-swiper-slide-bg span:nth-child(2) {
        transform: rotate(-105deg) translateY(-40px);
        opacity: 1;
    }

    .main-med-swiper-slide_powder .main-med-swiper-slide-bg span:nth-child(2)::after {
        opacity: 1;
    }

    .main-med-mob {
        display: none;
    }

    @media(max-width: 1700px) {
        .main-med {
            margin-bottom: 115px;
        }

        .main-med-swiper-slide {
            padding: 20px;
        }

        .main-med-swiper-slide-top {
            margin-bottom: 4px;
        }

        .main-med-swiper-slide-title {
            font-size: 26px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%;
        }

        .main-med-swiper-slide-btn {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            width: 158px;
            height: 30px;
        }

        .main-med-swiper-slide-pic {
            /* max-width: 307px; */
        }

        .main-med-swiper-slide-bot span {
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -0.7px;
        }

        .main-med-swiper-slide-bot a {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
        }

        .main-med-swiper-slide-bg {
            right: 36px;
            gap: 48px;
            bottom: 57px;
        }

        .main-med-swiper-slide-bg span {
            width: 59px;
            height: 136px;
        }

        .main-med-swiper-slide-bg span:first-child {
            transform: translateY(110px);
        }

        .main-med-swiper-slide:hover .main-med-swiper-slide-bg {
            bottom: 0;
            right: 30px;
        }

        .main-med-swiper-slide:hover .main-med-swiper-slide-bg span {
            width: 59px;
            height: 136px;
        }

        .main-med-swiper-slide_powder .main-med-swiper-slide-bg {
            right: 30px;
            bottom: 71px;
            gap: 9px;
        }

        .main-med-swiper-slide_powder .main-med-swiper-slide-bg span {
            width: 106px;
            height: 134px;
        }

        .main-med-swiper-slide_powder:hover .main-med-swiper-slide-bg {
            gap: 10px;
            right: 10px;
        }

        .main-med-swiper-slide_powder:hover .main-med-swiper-slide-bg span {
            width: 106px;
            height: 134px;
        }
    }

    @media(max-width: 1199px) {
        .main-med {
            margin-bottom: 90px;
        }

        .main-med-swiper .swiper-wrapper {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .main-med-swiper-nav {
            display: none;
        }

        .main-med-swiper-slide::before {
            display: none;
        }

        .main-med-swiper-slide:hover {
            color: #26347F;
        }

        .main-med-swiper-slide_powder:hover {
            color: #E51837;
        }

        .main-med-swiper {
            display: none;
        }

        .main-med-mob {
            display: block;
        }

        .main-med-mob .main-med-swiper_mob:first-child {
            margin-bottom: 20px;
        }

        .main-med-swiper_mob .main-med-swiper-nav {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
    }

    @media(max-width: 639px) {
        .main-med {
            margin-bottom: 80px;
        }

        .main-med-swiper-slide {
            padding: 20px 10px;
        }

        .main-med-swiper-slide-top, .main-med-swiper-slide-bot {
            display: contents;
        }

        .main-med-swiper-slide-bg {
            display: none;
        }

        .main-med-swiper-slide-title {
            order: 0;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%;
            margin-bottom: 5px;
        }

        .main-med-swiper-slide-bot span {
            order: 1;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -0.8px;
            margin-bottom: 20px;
        }

        .main-med-swiper-slide-pic {
            order: 2;
            max-width: 100%;
            margin-bottom: 30px;
        }

        .main-med-swiper-slide-btn {
            order: 3;
            width: 100%;
            max-width: 100%;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            height: 40px;
            border-radius: 20px;
            margin-bottom: 10px;
        }

        .main-med-swiper-slide-bot a {
            order: 4;
            color: #FFF;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            width: 100%;
            height: 40px;
            border-radius: 20px;
            background: #87A4F4;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-med-swiper-slide_powder .main-med-swiper-slide-bot a {
            background-color: #F48B87;
        }
    }
</style>