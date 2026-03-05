<template>
    <div class="main-feat">
        <div class="container">
            <div class="main-top">
                <h2>
                    {{ title }}
                </h2>
            </div>
            <div class="main-feat-cont" :class="{ 'main-feat-cont_powder': activeTab === 'powder' }">
                <div class="main-feat-cont-nav">
                    <button
                        :class="{ active: activeTab === 'tablet' }"
                        @click="activeTab = 'tablet'"
                    >
                        Таблетки
                    </button>

                    <button
                        :class="{ active: activeTab === 'powder' }"
                        @click="activeTab = 'powder'"
                    >
                        Порошок
                    </button>
                </div>

                <div class="main-feat-cont-block main-feat-cont-block_first" ref="block">
                    <div class="main-feat-cont-block-ball">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                <circle cx="42" cy="42" r="42" fill="url(#grad1)"/>
                                <defs>
                                    <linearGradient id="grad1" x1="0" y1="0" x2="84" y2="0" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%">
                                            <animate attributeName="stop-color"
                                                    values="#FFF; #CAC7DB; #26347F; #FFF"
                                                    dur="4s"
                                                    repeatCount="indefinite" />
                                        </stop>
                                        <stop offset="100%">
                                            <animate attributeName="stop-color"
                                                    values="#26347F; rgba(50,63,134,0.77); #FFF; #26347F"
                                                    dur="4s"
                                                    repeatCount="indefinite" />
                                        </stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <span class="main-feat-cont-block-ball_powder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                                <defs>
                                    <linearGradient id="grad-red" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%">
                                            <animate attributeName="stop-color"
                                                    values="#FFFFFF; #FFE1E5; #E51837; #FFFFFF"
                                                    dur="4s"
                                                    repeatCount="indefinite" />
                                        </stop>
                                        <stop offset="100%">
                                            <animate attributeName="stop-color"
                                                    values="#E51837; #FF6A7D; #FFFFFF; #E51837"
                                                    dur="4s"
                                                    repeatCount="indefinite" />
                                        </stop>
                                    </linearGradient>
                                </defs>

                                <circle cx="42" cy="42" r="42" fill="url(#grad-red)"/>
                            </svg>

                        </span>
                    </div>

                    <div class="main-feat-cont-block-sph"></div>

                    <div class="main-feat-cont-block-list">
                        <div
                            v-for="(feature, i) in currentFeatures"
                            :key="i"
                            v-html="feature.title"
                        ></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title?: string
    }>()

    const features_tablet = await useMainFeaturesTablets()

    const features_powder = await useMainFeaturesPowders()

    const block = ref<HTMLElement | null>(null)
    const activeTab = ref<'tablet' | 'powder'>('tablet')
    let triggered = false

    const currentFeatures = computed(() => {
        return activeTab.value === 'tablet'
            ? features_tablet.value
            : features_powder.value
    })

    const checkBlock = () => {
        if (triggered || !block.value) return

        const rect = block.value.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (rect.top < windowHeight * 0.5) {
            triggered = true

            setTimeout(() => {
                block.value?.classList.add('main-feat-cont-block_second')
            }, 300)

            setTimeout(() => {
                block.value?.classList.remove('main-feat-cont-block_first')
                block.value?.classList.remove('main-feat-cont-block_second')
                block.value?.classList.add('main-feat-cont-block_third')
            }, 1000)

            window.removeEventListener('scroll', checkBlock)
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', checkBlock, { passive: true })
        checkBlock()
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', checkBlock)
    })
</script>

<style scoped>
    .main-feat {
        margin-bottom: 140px;
    }

    .main-feat-cont {
        max-height: 1000px;
        height: 80vh;
        width: 100%;
        aspect-ratio: 188 / 100;
        background-color: #fff;
        border-radius: 50px;
        position: relative;
        overflow: hidden;
    }

    .main-feat-cont-nav {
        position: absolute;
        top: 30px;
        left: 30px;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 80px;
        background: #26347F;
        gap: 10px;
        transition: 0.3s;
        z-index: 1;
    }

    .main-feat-cont-nav:hover {
        /* background: rgba(38, 52, 127, 0.70); */
    }

    .main-feat-cont-nav button {
        color: #FFF;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px;
        letter-spacing: -0.72px;
        padding: 5px 30px;
        box-sizing: border-box;
        border-radius: 100px;
        background-color: transparent;
    }

    .main-feat-cont-nav:hover button {
        color: #87A4F4;
    }

    .main-feat-cont-nav button.active {
        background-color: #FFF;
        color: #26347F;
    }

    .main-feat-cont_powder .main-feat-cont-nav {
        background-color: #E51837;
    }

    .main-feat-cont_powder .main-feat-cont-nav:hover {
        /* background: rgba(229, 24, 55, 0.70); */
    }

    .main-feat-cont_powder .main-feat-cont-nav button.active {
        color: #E51837 !important;
    }

    .main-feat-cont_powder .main-feat-cont-nav:hover button {
        color: #F48789;
    }

    .main-feat-cont-block-ball {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 200px;
        width: -webkit-fit-content;
        aspect-ratio: 1 / 1;
        /* border: 15vh solid rgba(38, 52, 127, 0.10); */
        border-radius: 50%;
        transition: 2s;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .main-feat-cont-block-ball::after {
        content: '';
        width: 40vh;
        max-width: 473px;
        aspect-ratio: 1/1;
        height: fit-content;
        position: relative;
        border-radius: 50%;
        background: rgba(38, 52, 127, 0.10);
        /* margin: auto; */
        transition: 2s;
    }

    .main-feat-cont_powder .main-feat-cont-block-ball {
        border-color: rgba(229, 24, 55, 0.10);
    }

    .main-feat-cont-block-ball span {
        /* background: linear-gradient(138deg, #FFF 19.01%, #26347F 85.7%); */
        display: flex;
        width: fit-content;
        aspect-ratio: 1/1;
        height: 100%;
        border-radius: 50%;
        transition: 2s;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
    }

    .main-feat-cont-block-ball span svg {
        width: 100%;
        height: 100%;
    }

    .main-feat-cont-block-ball_powder {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        opacity: 0;
    }

    .main-feat-cont_powder .main-feat-cont-block-ball span {
        background: linear-gradient(138deg, #FFF 19.01%, #E51837 85.7%);
    }

    .main-feat-cont_powder .main-feat-cont-block-ball_powder {
        opacity: 1;
    }

    .main-feat-cont-block_first .main-feat-cont-block-ball::after {
        width: 30vh;
        max-width: 400px;
    }

    .main-feat-cont-block_second .main-feat-cont-block-ball::after {
        width: 40vh;
        max-width: 654px;
    }

    .main-feat-cont-block_third .main-feat-cont-block-ball::after {
        animation: pulseBorder 3s ease-in-out infinite;
    }

    @keyframes pulseBorder {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    .main-feat-cont-block-sph {
        aspect-ratio: 1/1;
        height: calc(100% - 56px);
        /* width: calc(); */
        background: rgba(38, 52, 127, 0.10);
        border-radius: 50%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        transition: 1s;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: pulseBorder 4s ease-in-out infinite;
    }

    .main-feat-cont-block-sph::after {
        content: '';
        position: relative;
        width: 60vh;
        height: fit-content;
        aspect-ratio: 1/1;
        background: rgba(38, 52, 127, 0.10);
        max-width: 709px;
        border-radius: 50%;
        transition: 2s;
    }

    .main-feat-cont-block_first .main-feat-cont-block-sph {
        height: calc(60% - 56px);
    }

    .main-feat-cont-block_first .main-feat-cont-block-sph::after {
        width: 40vh;
    }

    .main-feat-cont-block_second .main-feat-cont-block-sph {
        height: calc(100% - 56px);
    }

    .main-feat-cont-block_third .main-feat-cont-block-sph::after {
        animation: pulseBorder 4s ease-in-out infinite;
    }

    .main-feat-cont-block-ball img {
        width: 100%;
        height: 100%;
    }

    .main-feat-cont-block-list {

    }

    .main-feat-cont-block-list div {
        position: absolute;
        z-index: 1;
        color: #26347F;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
        width: fit-content;
        min-width: 363px;
        box-sizing: border-box;
        padding: 0 20px;
        border-radius: 50px;
        border: 1px solid rgba(38, 52, 127, 0.30);
        background: rgba(255, 255, 255, 0.50);
        height: 58px;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 1s;
    }

    .main-feat-cont_powder .main-feat-cont-block-list div {
        color: #840014;
    }

    .main-feat-cont-block-list div::before {
        content: '';
        display: flex;
        min-width: 10px;
        max-width: 10px;
        height: 10px;
        background: radial-gradient(66% 66% at 50% 50%, #77A9F5 0%, #26347F 100%);
        border-radius: 50%;
        border: 9.5px solid #77A9F5;
        transform: 0.5s;
    }

    .main-feat-cont_powder .main-feat-cont-block-list div::before {
        background: radial-gradient(66% 66% at 50% 50%, #FFF 0%, #E51837 100%);
        border-color: #e7b9c1;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div::before {
        border-color: #D0E1F9;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div {
        font-size: 0;
        max-width: 29px;
        min-width: 29px;
        width: 100%;
        padding: 0;
        height: auto;
        border-color: transparent;
    }

    .main-feat-cont-block-list div:nth-child(1) {
        top: 8%;
        right: 0;
        left: 0;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(1) {
        top: 18.6%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(1) {
        top: 8%;
    }

    .main-feat-cont-block-list div:nth-child(2) {
        top: 27%;
        left: 11%;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(2) {
        left: 34.67%;
        top: 32.5%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(2) {
        top: 27%;
        left: 11%;
    }

    .main-feat-cont-block-list div:nth-child(3) {
        top: 27%;
        right: 11%;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(3) {
        right: 34.67%;
        top: 32.5%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(3) {
        top: 27%;
        right: 11%;
    }

    .main-feat-cont-block-list div:nth-child(4) {
        bottom: 36%;
        left: 9.8%;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(4) {
        left: 32.66%;
        bottom: 40.6%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(4) {
        bottom: 36%;
        left: 9.8%;
    }

    .main-feat-cont-block-list div:nth-child(5) {
        bottom: 36%;
        right: 9.8%;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(5) {
        right: 32.66%;
        bottom: 40.6%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(5) {
        bottom: 36%;
        right: 9.8%;
    }

    .main-feat-cont-block-list div:nth-child(6) {
        bottom: 7%;
        left: 23.5%;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(6) {
        left: 41.54%;
        bottom: 22%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(6) {
        bottom: 7%;
        left: 23.5%;
    }

    .main-feat-cont-block-list div:nth-child(7) {
        bottom: 7%;
        right: 23.5%;
        margin: auto;
    }

    .main-feat-cont-block_first .main-feat-cont-block-list div:nth-child(7) {
        right: 41.54%;
        bottom: 22%;
    }

    .main-feat-cont-block_second .main-feat-cont-block-list div:nth-child(7) {
        bottom: 7%;
        right: 23.5%;
    }

    @media (max-width: 1700px) {
        .main-feat {
            margin-bottom: 116px;
        }

        .main-feat-cont {
            aspect-ratio: 1160 / 658;
        }

        .main-feat-cont-nav {
            top: 20px;
            left: 20px;
            gap: 6.336px;
            padding: 3px;
        }

        .main-feat-cont-nav button {
            padding: 2px 25px;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 100%;
            letter-spacing: -0.64px;
        }

        .main-feat-cont-block-ball {
            border-width: 15vh
        }

        .main-feat-cont-block-ball {
            height: 158px;
        }

        .main-feat-cont-block-list div {
            max-width: 417px;
            width: 100%;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -0.8px;
            padding: 10px 20px;
            gap: 10px;
        }

        .main-feat-cont-block-list div br {
            display: none;
        }

        .main-feat-cont-block-list div:nth-child(1) {
            top: 32px;
        }

        .main-feat-cont-block-list div:nth-child(2) {
            left: 20px;
            top: 146px;
        }

        .main-feat-cont-block-list div:nth-child(3) {
            right: 20px;
            top: 146px;
        }

        .main-feat-cont-block-list div:nth-child(4) {
            left: 20px;
            bottom: 217px;
        }

        .main-feat-cont-block-list div:nth-child(5) {
            right: 20px;
            bottom: 217px;
        }

        .main-feat-cont-block-list div:nth-child(6) {
            left: 121px;
            bottom: 43px;
        }

        .main-feat-cont-block-list div:nth-child(7) {
            right: 121px;
            bottom: 43px;
        }
    }

    @media (max-width: 1199px) {
        .main-feat {
            margin-bottom: 100px;
        }

        .main-feat-cont {
            aspect-ratio: 0;
            overflow: visible;
            background: transparent;
            height: auto;
        }

        .main-feat-cont-nav {
            position: unset;
            width: fit-content;
            margin-bottom: 20px;
        }

        .main-feat-cont-block {
            background-color: #fff;
            height: 100%;
            overflow: hidden;
            position: relative;
            border-radius: 20px;
            padding: 20px 0;
            box-sizing: border-box;
            /* aspect-ratio: 610 / 362; */
        }

        .main-feat-cont-block-ball {
            height: 83px;
            border-width: 63px;
        }

        .main-feat-cont-block-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 335px;
            width: 100%;
            margin: 0 auto;
        }

        .main-feat-cont-block-list div {
            position: unset;
            gap: 4px;
            height: 34px;
            width: 100%;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -0.7px;
            padding: 5px 20px;
            box-sizing: border-box;
            min-width: 0;
            max-width: 100%;
        }

        .main-feat-cont-block-list div::before {
            max-width: 4px !important;
            min-width: 4px !important;
            height: 4px !important;
            border-width: 4px !important;
        }

        .main-feat-cont-block_first .main-feat-cont-block-list div {
            position: unset;
            gap: 4px;
            height: 34px;
            width: 100%;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -0.7px;
            padding: 5px 20px;
            box-sizing: border-box;
            min-width: 0;
            max-width: 100%;
        }

        .main-feat-cont-block-sph {
            aspect-ratio: 1/1;
            width: calc(60% - 56px);
            height: fit-content;
        }

        .main-feat-cont-block-ball::after {
            max-width: 210px;
        }
    }

    @media (max-width: 639px) {
        .main-feat {
            margin-bottom: 80px;
            overflow: hidden;
        }

        .main-feat .main-top {
            margin-bottom: 20px;
        }

        .main-feat-cont-block {
            background-color: transparent;
            overflow: visible;
        }

        .main-feat-cont-block-list div {
            border: 0.333px solid rgba(38, 52, 127, 0.30);
            background: #FFF;
            height: 40px !important;
        }

        .main-feat-cont-block-sph {
            aspect-ratio: 1 / 1;
            background: rgba(38, 52, 127, 0.10);
            border-radius: 50%;
            height: auto !important;
            width: 100% !important;
            max-width: 350px;
            left: 0;
            right: 0;
            margin: auto;
        }

        .main-feat-cont-block-ball {
            height: 50px !important;
            border-width: 60px !important;
            width: 50px !important;
        }

        .main-feat-cont-block-ball span {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
        }

        .main-feat-cont-block-sph::after {
            width: 40vh;
        }
    }
</style>