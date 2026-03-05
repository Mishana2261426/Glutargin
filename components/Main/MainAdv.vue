<template>
    <div class="main-adv">
        <div class="container">
            <div class="main-top">
                <h2>
                    {{ title }}
                </h2>
                <span>
                    {{ text }}
                </span>
            </div>
            <div class="main-adv-row swiper">
                <div class="swiper-wrapper">
                    <div :href="adv.href" v-for="adv in advs" class="swiper-slide">
                        {{ adv.title }}
                    </div>
                </div>
            </div>
            <div class="main-med-swiper-nav">
                <div class="main-med-swiper-nav-prev"></div>
                <div class="main-med-swiper-nav-next"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        advs: Object,
        title: String,
        text: String
    })

    onMounted(() => {
        let advSwiper = null

        const toggleAdvSwiper = () => {
            // Если экран ≤ 639 — включаем swiper
            if (window.innerWidth <= 639) {

                // если ещё не создан — создаём
                if (!advSwiper) {
                    advSwiper = new Swiper('.main-adv-row.swiper', {
                        slidesPerView: 'auto',
                        spaceBetween: 12,
                        loop: false,
                        navigation: {
                            nextEl: '.main-med-swiper-nav-next',
                            prevEl: '.main-med-swiper-nav-prev'
                        },
                    })
                }

            } else {
                // Если экран >639 — выключаем swiper
                if (advSwiper) {
                    advSwiper.destroy(true, true)
                    advSwiper = null
                }
            }
        }

        toggleAdvSwiper()
        window.addEventListener('resize', toggleAdvSwiper)
    })
</script>

<style scoped>
    .main-top {
        justify-content: flex-end;
        padding-right: 40px;
        box-sizing: border-box;
        gap: 34px;
    }

    .main-top h2 {
        white-space: nowrap;
    }

    .main-top span {
        color: #87A4F4;
        font-family: Inter;
        font-size: 40px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -2px;
    }

    .main-adv {
        margin-bottom: 150px;
    }

    .main-adv-row {
        display: flex;
        flex-wrap: wrap;
        gap: 34px;
    }

    .main-adv-row .swiper-wrapper {
        gap: 34px;
        display: flex;
        flex-wrap: wrap;
    }

    .main-adv-row .swiper-slide {
        width: calc(25% - 25.5px);
        padding: 30px;
        padding-right: 34px;
        border-radius: 20px;
        background: #FFF;
        box-sizing: border-box;
        height: 200px;
        color: #26347F;
        font-family: Inter;
        font-size: 40px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -2px;
        position: relative;
        overflow: hidden;
        transition: 0.3s;
    }

    .main-adv-row .swiper-slide:hover {
        color: #fff;
        background-color: #E51837;
    }

    .main-adv-row .swiper-slide::after {
        content: '';
        background-color: #26347F;
        width: 163px;
        height: 163px;
        position: absolute;
        right: -80px;
        bottom: -80px;
        border-radius: 50%;
        transition: 0.3s;
    }

    .main-adv-row .swiper-slide:hover::after {
        background-color: #840014;
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

    .main-med-swiper-nav {
        display: none;
    }

    @media (max-width: 1700px) {
        .main-adv {
            margin-bottom: 120px;
        }

        .main-top {
            padding-right: 20px;
        }

        .main-top span {
            font-size: 25px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -1.25px;
        }

        .main-adv-row {
            gap: 12px;
        }

        .main-adv-row .swiper-wrapper {
            gap: 12px;
        }

        .main-adv-row .swiper-slide {
            width: calc(25% - 9px);
            height: 127px;
            padding: 20px;
            font-size: 25px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1.25px;
            padding-right: 30px;
        }

        .main-adv-row .swiper-slide::after {
            width: 103px;
            height: 103px;
            right: -50px;
            bottom: -50px;
        }
    }

    @media (max-width: 1199px) {
        .main-adv {
            margin-bottom: 100px;
        }

        .main-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 25px;
        }

        .main-adv-row {
            margin: 0 -15px;
            padding: 0 15px;
            overflow-x: scroll;
            flex-wrap: nowrap;
            gap: 12px;
        }

        .main-adv-row .swiper-wrapper {
            gap: 12px;
            flex-wrap: nowrap;
        }

        .main-adv-row::-webkit-scrollbar {
            display: none;
        }

        .main-adv-row .swiper-slide {
            max-width: 281px;
            min-width: 281px;
            width: 100%;
            height: 127px;
            padding: 15px;
            padding-right: 30px;
        }
    }

    @media (max-width: 639px) {
        .main-top h2 {
            font-size: 32px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%;
            white-space: wrap;
        }

        .main-top {
            gap: 10px;
            margin-bottom: 25px;
        }

        .main-top span {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -1px;
        }

        .main-adv {
            margin-bottom: 80px;
        }

        .main-med-swiper-nav {
            display: flex;
        }

        .main-adv-row {
            margin: 0;
            padding: 0;
            overflow: visible;
        }

        .main-adv-row .swiper-wrapper {
            gap: 0;
            margin: 0 -15px;
            padding: 0 15px;
        }

        .main-adv-row .swiper-slide {
            /* max-width: 100%; */
            /* min-width: 0; */
        }

        .main-med-swiper-nav {
            display: flex;
            margin: 20px auto 0;
            justify-content: center;
        }
    }
    
</style>