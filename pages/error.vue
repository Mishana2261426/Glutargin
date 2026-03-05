<template>
    <section class="error">
        <div class="container">
            <div class="error-cont">
                <div class="error-title">
                    <span>
                        4
                    </span>
                    <div class="qst-banner-cont-anim">
                        <div class="qst-banner-cont-anim-first"></div>
                        <div class="qst-banner-cont-anim-second"></div>
                        <div class="qst-banner-cont-anim-third"></div>
                        <div class="qst-banner-cont-anim-ball">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="84" height="84" viewBox="0 0 84 84" fill="none" class="qst-banner-cont-anim-ball_red">
                                <defs>
                                    <linearGradient id="grad-red" x1="0" y1="0" x2="1" y2="1">
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
                    <span>
                        4
                    </span>
                </div>
                <div class="error-cont-block">
                    <h1>
                        К сожалению, страница не найдена
                    </h1>
                    <p>
                        Похоже, страница которую вы ищете не существует или была перемещена. <br> Не волнуйтесь, мы вернем вас в нужное направление!
                    </p>
                    <NuxtLink to="/">Перейти на главную</NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>
    .qst-banner-cont-anim {
        position: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        left: 0;
        margin: auto;
        /* top: 118px; */
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
        position: absolute;
    }

    .qst-banner-cont-anim-first {
        width: 450px;
        height: 450px;
        background-color: rgba(38, 52, 127, 0.50);
        position: absolute;
        border-radius: 50%;
        z-index: 2;
    }

    .qst-banner-cont-anim-second {
        width: 770px;
        height: 770px;
        position: absolute;
        border-radius: 50%;
        background-color: #E2E3ED;
        z-index: 1;
    }

    .qst-banner-cont-anim-third {
        width: 1468px;
        height: 1468px;
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

    .error {
        margin-bottom: 35px;
    }

    .error-cont {
        border-radius: 50px;
        background: #FFF;
        position: relative;
        height: 855px;
        overflow: hidden;
    }

    .error-title {
        position: absolute;
        right: 0;
        left: 0;
        margin: auto;
        top: 131px;
        display: flex;
        color: #26347F;
        font-family: Inter;
        font-size: 500px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -20px;
        max-width: 1330px;
    }

    .error-title span {
        position: relative;
        z-index: 3;
    }

    .error-cont-block {
        position: absolute;
        z-index: 4;
        bottom: 52px;
        right: 0;
        left: 0;
        margin: auto;
        max-width: 697px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .error-cont-block h1 {
        color: #26347F;
        font-family: "PT Sans";
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 110%;
        text-transform: uppercase;
        margin-bottom: 10px;
        text-align: center;
    }

    .error-cont-block p {
        color: #26347F;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
        text-align: center;
    }

    .error-cont-block a {
        margin-top: 30px;
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        padding: 16px 85px;
        box-sizing: border-box;
        border-radius: 50px;
        background: #26347F;
        max-width: 508px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .error-cont-block a:hover {
        background: rgba(38, 52, 127, 0.70);
    }

    @media (max-width: 1700px) {

    }

    @media (max-width: 1199px) {
        .error-cont {
            height: 700px;
        }

        .error-title {
            font-size: 200px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -8px;
            top: 150px;
            max-width: 630px;
        }

        .qst-banner-cont-anim-ball {
            width: 100px;
            height: 100px;
        }

        .qst-banner-cont-anim-first {
            width: 230px;
            height: 230px;
        }

        .qst-banner-cont-anim-second {
            width: 394.727px;
            height: 394.727px;
        }

        .qst-banner-cont-anim-third {
            display: none;
        }

        .error-cont-block {
            bottom: 20px;
        }

        .error-cont-block p {
            max-width: 373px;
            color: #26347F;
            font-family: Inter;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -1px;
            text-align: center;
        }
    }

    @media (max-width: 639px) {
        .error-cont {
            height: 630px;
        }

        .error-title {
            top: 100px;
            font-size: 100px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -4px;
            max-width: 330px;
        }

        .qst-banner-cont-anim-ball {
            width: 54.633px;
            height: 54.633px;
        }

        .qst-banner-cont-anim-first {
            width: 124.797px;
            height: 124.797px;
        }

        .qst-banner-cont-anim-second {
            width: 213.541px;
            height: 213.541px;
        }

        .error-cont-block {
            left: 15px;
            right: 15px;
        }

        .error-cont-block h1 {
            max-width: 317px;
            font-size: 30px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%;
            text-align: center;
            text-transform: uppercase;
        }

        .error-cont-block p {
            text-align: left;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -1px;
        }

        .error-cont-block a {
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.7px;
            padding: 10px 0;
            width: 100%;
        }
    }
</style>