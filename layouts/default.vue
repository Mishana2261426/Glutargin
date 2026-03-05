<template>
    <div class="page-wrapper">
        <!-- <div class="preloader" v-if="loading" :class="stageClasses">
            <div class="preloader-cont">
                <div class="preloader-cont-first"></div>
                <div class="preloader-cont-second"></div>
                <div class="preloader-cont-third"></div>
                <div class="preloader-cont-fourth"></div>
                <div class="preloader-cont-ball">
                    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                        <circle cx="42" cy="42" r="42" fill="url(#grad1)"/>
                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
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
                </div>
            </div>
        </div> -->
        <div>
            <AppHeader :links="links"/>
            <main>
                <slot />
            </main>
            <AppFooter :links="links" :links_add="links_add"/>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const stage = ref(1)
const stageClasses = ref(['preloader_stage_1'])

onMounted(() => {
    stage.value = 1
    stageClasses.value = ['preloader_stage_1']

    setTimeout(() => {
        stage.value = 2
        stageClasses.value.push('preloader_stage_2')
    }, 400)

    let current = 2
    const interval = setInterval(() => {
        current++
        stage.value = current
        stageClasses.value.push(`preloader_stage_${current}`)

        if (current === 5) {
            clearInterval(interval)
            setTimeout(() => {
                loading.value = false
            }, 1000)
        }
    }, 1000)
})

const links = ref([
    { title: 'Главная', to: '/', mob: true },
    { title: 'О препарате', to: '/about' },
    { title: 'Инструкции', to: '/instruction' },
    { title: 'Специалистам', to: '/spec' },
    { title: 'Вопрос-ответ', to: '/qst' },
    { title: 'Статьи', to: '/articles' }
])

const links_add = ref([
    {
        title: 'Фармаконадзор',
        href: ''
    },
    {
        title: 'Юридическая информация ',
        href: ''
    },
    {
        title: 'Политика конфиенциальности',
        href: ''
    },
])
</script>

<style scoped>
.preloader {
    position: fixed;
    inset: 0;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    aspect-ratio: 1/1;
    height: 100%;
    width: 100%;
}

.preloader-cont {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.preloader-cont-ball {
    position: absolute;
    width: 58px;
    height: 58px;
    z-index: 7;
}

.preloader-cont-ball svg {
    width: 100%;
    height: 100%;
}

.preloader-cont-first {
    width: 111px;
    height: 111px;
    background: rgba(38, 52, 127, 0.50);
    border-radius: 50%;
    position: absolute;
    z-index: 6;
}

.preloader-cont-second {
    width: 184px;
    height: 184px;
    background: rgba(38, 52, 127, 0.10);
    border-radius: 50%;
    position: absolute;
    z-index: 5;
}

.preloader-cont-third {
    width: 203px;
    height: 203px;
    background: rgba(38, 52, 127, 0.10);
    border-radius: 50%;
    position: absolute;
    z-index: 4;
}

.preloader-cont-first, .preloader-cont-second, .preloader-cont-third, .preloader-cont-ball, .preloader-cont-fourth {
    transition: 2s;
    aspect-ratio: 1/1 !important;
}

.preloader_stage_2 .preloader-cont-first {
    scale: 20;
}

.preloader_stage_2 .preloader-cont-second {
    scale: 2;
    scale: 20;
}

.preloader_stage_2 .preloader-cont-third {
    scale: 2;
    scale: 20;
}

.preloader_stage_3 .preloader-cont-ball {
    width: 183px;
    height: 183px;
}

.preloader_stage_4 .preloader-cont-first {
    scale: 0;
}

.preloader_stage_4 .preloader-cont-second {
    scale: 0;
}

.preloader_stage_4 .preloader-cont-third {
    scale: 0;
}

.preloader_stage_4 .preloader-cont-ball {
    opacity: 0;
}

.preloader_stage_4 {
    background-color: transparent;
}

.preloader-cont-fourth {
    background-color: #fff;
    width: 2000px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    z-index: 3;
    transition: 2s;
}

.preloader_stage_4 .preloader-cont-fourth  {
    scale: 0;
}
</style>
