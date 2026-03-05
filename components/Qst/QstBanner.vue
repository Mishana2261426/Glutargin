<template>
    <section class="qst-banner"
        :class="{
            'qst-banner_powder': activeTab === 'powder',
            'qst-banner_tablet': activeTab === 'tablet'
        }"
    >
        <div class="container">
            <div class="qst-banner-cont">
                <div class="qst-banner-cont-block">
                    <h1>
                        {{title}}
                    </h1>
                    <p v-html="text"></p>
                </div>
                <div class="qst-banner-cont-anim">
                    <div class="qst-banner-cont-anim-first"></div>
                    <div class="qst-banner-cont-anim-second"></div>
                    <div class="qst-banner-cont-anim-third"></div>
                    <div class="qst-banner-cont-anim-ball">
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
        tabs: Array,
        activeTab: String 
    })

    const emit = defineEmits(['tab-click'])

    function clickTab(id) {
        emit('tab-click', id)
    }
</script>

<style scoped>
    .qst-banner {
        margin-top: 40px;
        margin-bottom: 140px;
    }

    .qst-banner-cont {
        border-radius: 50px;
        background: #FFF;
        height: 650px;
        overflow: hidden;
        padding: 50px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        transition: 0.3s;
    }

    .qst-banner-cont-block {
        max-width: 793px;
        display: flex;
        flex-direction: column;
        gap: 40px;
        position: relative;
        z-index: 4;
    }

    .qst-banner-cont-block h1 {
        color: #26347F;
        font-family: Inter;
        font-size: 115px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -4.6px;
    }

    .qst-banner-cont-block p {
        max-width: 767px;
        color: #26347F;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1.28px;
    }

    .qst-banner-cont-anim {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 156px;
        top: 118px;
    }

    .qst-banner-cont-anim-ball {
        width: 184px;
        height: 184px;
        position: relative;
        z-index: 3;
    }

    .qst-banner-cont-anim-ball_red {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        opacity: 0;
        transition: 0.3s;
    }

    .qst-banner-cont-anim-ball svg {
        width: 100%;
        height: 100%;
    }

    .qst-banner-cont-anim-first {
        width: 620px;
        height: 620px;
        background-color: rgba(38, 52, 127, 0.50);
        position: absolute;
        border-radius: 50%;
        z-index: 2;
    }

    .qst-banner-cont-anim-second {
        width: 1000px;
        height: 1000px;
        position: absolute;
        border-radius: 50%;
        background-color: #E2E3ED;
        z-index: 1;
    }

    .qst-banner-cont-anim-third {
        width: 1500px;
        height: 1500px;
        position: absolute;
        border-radius: 50%;
        background-color: #F0F1F6;
        z-index: 0;
    }

    .qst-banner-cont-anim-first,
    .qst-banner-cont-anim-second,
    .qst-banner-cont-anim-third {
        animation: pulse 6s ease-in-out infinite;
        transform-origin: center;
        transition: 0.3s;
    }

    .qst-banner-cont-anim-first {
        animation-delay: 0s;
    }
    .qst-banner-cont-anim-second {
        animation-delay: 0.8s;
    }
    .qst-banner-cont-anim-third {
        animation-delay: 1.6s;
    }

    @keyframes pulse {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.1); } /* +20% */
        100% { transform: scale(1); }
    }

    .qst-banner_tablet .qst-banner-cont {
        background-color: #26347F;
        color: #fff;
    }

    .qst-banner_tablet .qst-banner-cont-block h1 {
        color: #fff;
    }

    .qst-banner_tablet .qst-banner-cont-block p {
        color: #fff;
    }

    .qst-banner_tablet .qst-banner-cont-anim-third {
        background: rgba(255, 255, 255, 0.10);
        opacity: 0.7;
    }

    .qst-banner_tablet .qst-banner-cont-anim-second {
        opacity: 0.7;
        background: rgba(255, 255, 255, 0.10);
    }

    .qst-banner_tablet .qst-banner-cont-anim-first {
        opacity: 0.7;
        background: var(--50, rgba(208, 225, 249, 0.50));
    }

    .qst-banner_powder .qst-banner-cont {
        background-color: #E51837;
    }

    .qst-banner_powder .qst-banner-cont-block h1 {
        color: #fff;
    }

    .qst-banner_powder .qst-banner-cont-block p {
        color: #fff;
    }

    .qst-banner_powder .qst-banner-cont-anim-third {
        background: rgba(255, 255, 255, 0.10);
        opacity: 0.7;
    }

    .qst-banner_powder .qst-banner-cont-anim-second {
        opacity: 0.7;
        background: rgba(255, 255, 255, 0.10);
    }

    .qst-banner_powder .qst-banner-cont-anim-first {
        opacity: 0.7;
        background: var(--50, rgba(208, 225, 249, 0.50));
    }

    .qst-banner_powder .qst-banner-cont-anim-ball_red {
        opacity: 1;
    }

    .qst-banner_powder, .qst-banner_tablet {
        margin-bottom: 50px;
    }

    @media (max-width: 1700px) {
        .qst-banner {
            margin-bottom: 120px;
        }

        .qst-banner-cont-anim {
            top: 30px;
            right: 57px;
        }

        .qst-banner_powder, .qst-banner_tablet {
            margin-bottom: 50px;
        }
    }

    @media (max-width: 1199px) {
        .qst-banner {
            margin-bottom: 100px;
        }

        .qst-banner-cont {
            padding: 47px;
        }

        .qst-banner-cont-block {
            gap: 20px;
        }

        .qst-banner-cont-block h1 {
            font-size: 75px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -3px;
        }

        .qst-banner-cont-block p {
            max-width: 448px;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
        }

        .qst-banner-cont-anim {
            top: 0;
            bottom: 0;
            right: -80px;
            margin: auto;
        }

        .qst-banner-cont-anim-first {
            width: 290px;
            height: 290px;
        }

        .qst-banner-cont-anim-second {
            width: 468px;
            height: 468px;
        }

        .qst-banner-cont-anim-third {
            width: 702px;
            height: 702px;
        }

        .qst-banner_powder, .qst-banner_tablet {
            margin-bottom: 30px;
        }
    }

    @media (max-width: 639px) {
        .qst-banner {
            margin-bottom: 80px;
        }

        .qst-banner-cont {
            height: 569px;
            border-radius: 15px;
            padding: 10px;
            align-items: flex-start;
            padding-top: 100px;
        }

        .qst-banner-cont-block {
            gap: 10px;
        }

        .qst-banner-cont-block h1 {
            font-size: 36px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -1.44px;
        }

        .qst-banner-cont-block p {
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
        }

        .qst-banner-cont-anim {
            bottom: 133px;
            top: auto;
        }

        .qst-banner_powder, .qst-banner_tablet {
            margin-bottom: 30px;
        }
    }
</style>