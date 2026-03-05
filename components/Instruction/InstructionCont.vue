<template>
    <QstBanner
        :title="title"
        :text="text"
        :tabs="instr_tabs"
        :activeTab="activeTab"
        @tab-click="changeTab"
    />
    <section class="instr-cont">
        <div class="container">
            <div 
                class="main-about-nav"
                :class="{ 'main-about-nav_powder': activeTab === 'powder' }"
            >
                <button
                    v-for="tab in props.instr_tabs"
                    :key="tab.id"
                    :class="{ active: activeTab === tab.id }"
                    @click="setTab(tab.id)"
                >
                    {{ tab.label }}
                </button>
            </div>
            <div class="instr-cont-block"
                :class="{
                    'instr-cont-block_powder': activeTab === 'powder',
                    'instr-cont-block_tablet': activeTab === 'tablet'
                }"
            >
                <div class="instr-cont-block-add">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                            <circle cx="42" cy="42" r="42" fill="url(#grad1)"/>
                            <defs>
                                <linearGradient id="grad1" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none" class="qst-banner-cont-anim-ball_red">
                            <defs>
                                <linearGradient id="grad-red" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="19%">
                                        <animate attributeName="stop-color"
                                                values="#FFFFFF; #FFE1E5; #E51837; #FFFFFF"
                                                dur="4s"
                                                repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="85.7%">
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
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none">
                            <circle cx="42" cy="42" r="42" fill="url(#grad1)"/>
                            <defs>
                                <linearGradient id="grad1" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none" class="qst-banner-cont-anim-ball_red">
                            <defs>
                                <linearGradient id="grad-red" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="19%">
                                        <animate attributeName="stop-color"
                                                values="#FFFFFF; #FFE1E5; #E51837; #FFFFFF"
                                                dur="4s"
                                                repeatCount="indefinite" />
                                    </stop>
                                    <stop offset="85.7%">
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
                <div class="instr-cont-block-top"
                    :class="{
                        'instr-cont-block-top_powder': activeTab === 'powder',
                        'instr-cont-block-top_tablet': activeTab === 'tablet'
                    }"
                >
                    <div class="instr-cont-block-top-add">
                        <span></span>
                        <span></span>
                    </div>
                    <div class="instr-cont-block-top-cont">
                        {{ currentTab.label }}
                        <a :href="currentTab.link.href" v-if="currentTab.link">
                            {{currentTab.link.text}}
                        </a>
                    </div>
                </div>
                <h2 class="instr-cont-block-title">
                    ИНСТРУКЦИЯ  ПО МЕДИЦИНСКОМУ ПРИМЕНЕНИЮ ЛЕКАРСТВЕННОГО ПРЕПАРАТА  ГЛУТАРГИН АЛКОКЛИН   
                </h2>
                <div class="instr-cont-block-text" v-html="currentTab.content">
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        instr_tabs: Array,
        text: String,
        title: String
    })

    const activeTab = ref(props.instr_tabs[0].id)

    function setTab(id) {
        activeTab.value = id
    }

    const currentTab = computed(() => {
        return props.instr_tabs.find(t => t.id === activeTab.value)
    })

    const currentContent = computed(() => currentTab.value?.content || '')
</script>

<style scoped>

    .main-about-nav {
        position: absolute;
        top: 0;
        left: 37px;
        display: flex;
        gap: 10px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 80px;
        background: #26347F;
        color: #26347F;
        transition: 0.3s;
        width: fit-content;
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

    .instr-cont {
        margin-bottom: 140px;
        padding-top: 22px;
    }

    .instr-cont .container {
        position: relative;
    }

    .instr-cont-block {
        padding: 30px;
        box-sizing: border-box;
        border-radius: 30px;
        background: #FFF;
        max-width: 919px;
        width: 100%;
        margin: 0 auto;
        margin-top: 22px;
    }

    .instr-cont-block_tablet {
        color: #26347F;
    }

    .instr-cont-block_powder {
        color: #42000A;
    }

    .instr-cont-block_powder .instr-cont-block-title {
        color: #820014;
    }

    .instr-cont-block-top_powder {
        color: #E51837;
    }

    .instr-cont-block-top {
        font-family: "PT Sans";
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
        display: flex;
        gap: 44px;
        height: 88px;
        align-items: center;
        margin-bottom: 47px;
    }

    .instr-cont-block-top-cont {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .instr-cont-block-top-cont a {
        color: var(--, #26347F);
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -0.48px;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: none;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
    }

    .instr-cont-block-top-cont a:hover {
        opacity: 0.6;
    }

    /* .instr-cont-block-top_tablet::before {
        content: '';
        width: 67px;
        height: 29px;
        background-image: url(/images/about-banner/pill.svg);
        background-size: 100% 100%;
        display: flex;
        transform: rotate(90deg);
    } */
    
    .instr-cont-block-top_tablet .instr-cont-block-top-add {
        display: flex;
        gap: 20px;
    }

    .instr-cont-block-top_tablet .instr-cont-block-top-add span {
        height: 67px;
        width: 29px;
        background-image: url(/images/instruction/tablet.svg);
        background-size: 100% 100%;
        display: flex;
    }

    .instr-cont-block-top_powder .instr-cont-block-top-add {
        display: flex;
        gap: 9px;
    }

    .instr-cont-block-top_powder .instr-cont-block-top-add span {
        width: 74px;
        height: 88px;
        background-image: url(/images/instruction/powder.svg);
        background-size: 100% 100%;
        display: flex;
    }

    .instr-cont-block-title {
        font-family: "PT Sans";
        font-size: 50px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
        text-transform: uppercase;
        margin-bottom: 30px;
    }

    .instr-cont-block-text {
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: inherit;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
    }

    .instr-cont-block-add {

    }

    .instr-cont-block-add span {
        width: 600px;
        height: 600px;
        position: relative;
        display: flex;
    }

    .instr-cont-block-add span svg {
        width: 100%;
        height: 100%;
    }

    .qst-banner-cont-anim-ball_red {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        transition: 0.3s;
    }

    .instr-cont-block-add span:nth-child(1) {
        position: absolute;
        top: 120px;
        right: 200px;
        z-index: -1;
    }

    .instr-cont-block-add span:nth-child(2) {
        position: absolute;
        bottom: 260px;
        left: 200px;
        z-index: -1;
    }

    .instr-cont-block_powder .qst-banner-cont-anim-ball_red {
        opacity: 1;
    }

    @media (max-width: 1700px) {
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

        .instr-cont-block {
            max-width: 905px;
        }

        .instr-cont-block-add span {
            width:364px;
            height: 364px;
        }

        .instr-cont-block-add span:nth-child(1) {
            position: absolute;
            top: 120px;
            right: 20px;
            z-index: -1;
        }

        .instr-cont-block-add span:nth-child(2) {
            position: absolute;
            bottom: 260px;
            left: 20px;
            z-index: -1;
        }

        .instr-cont {
            margin-bottom: 120px;
        }
    }

    @media (max-width: 1199px) {
        .main-about-nav {
            position: unset;
            margin-right: auto;
        }

        .instr-cont-block {
            padding: 20px 15px;
        }

        .instr-cont-block-top {
            gap: 20px;
            margin-bottom: 30px;
            height: 74px;
        }

        .instr-cont-block-top_powder .instr-cont-block-top-add span {
            width: 60.545px;
            height: 74px;
        }

        .instr-cont-block-title {
            max-width: 446px;
            font-size: 30px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        .instr-cont-block-add {
            display: none;
        }

        .instr-cont-block {
            border-radius: 15px;
        }

        .instr-cont {
            margin-bottom: 100px;
        }
    }

    @media (max-width: 639px) {
        .instr-cont {
            margin-bottom: 80px;
        }

        .instr-cont-block-top-cont {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
    }
</style>