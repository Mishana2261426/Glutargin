<template>
    <NuxtLink to="/stores" class="where-bot">
        Где купить
    </NuxtLink>
    <footer class="footer">
        <div class="container">
            <div class="footer-main">
                <div class="footer-first">
                    <NuxtLink to="/" class="footer-logo">
                        <img src="/images/footer/logo.svg" alt="">
                    </NuxtLink>
                    <div class="footer-first-row">
                        <div>
                            Телефон:
                            <a href="">
                                0123456789
                            </a>
                        </div>
                        <div>
                            E-mail:
                            <a href="">
                                alkoklin@mail.ru
                            </a>
                        </div>
                        <div>
                            Юридический адрес:
                            <a href="">
                                Москва, ул. Свободы, д.1, офис 1
                            </a>
                        </div>
                    </div>
                </div>
                <div class="footer-nav">
                    <NuxtLink :to="link.to" v-for="link in links">{{ link.title }}</NuxtLink>
                </div>
                <div class="footer-circle">
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
                </div>
            </div>
            <div class="footer-text">
                Имеются противопоказания. Необходимо получить консультацию специалиста
            </div>
            <div class="footer-bot">
                <div class="footer-bot-copy">
                    ©2025 Все права защищены 
                </div>
                <div class="footer-bot-links">
                    <a :href="link.href" class="" v-for="link in links_add">
                        {{link.title}}
                    </a>
                </div>
                <a href="" class="footer-bot-dev">
                    <span>
                        Разработка сайта
                    </span>
                    Твой стартап
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>

    const props = defineProps({
        links: Object,
        links_add: Object
    })
    // const footer_links = ref([
    //     {
    //         title: 'Главная',
    //         to: '/',
    //     },
    //     {
    //         title: 'О препарте',
    //         to: '/'
    //     },
    //     {
    //         title: 'Инструкции',
    //         to: '/'
    //     },
    //     {
    //         title: 'Специалистам',
    //         to: '/'
    //     },
    //     {
    //         title: 'Вопрос-ответ',
    //         to: '/'
    //     },
    //     {
    //         title: 'Статьи',
    //         to: '/'
    //     }
    // ]);
</script>

<style scoped>
    /* .footer {
        padding: 30px 0;
        border-radius: 40px 40px 0 0;
        background: #26347F;
    } */

    .footer {
        position: relative;
    }

    .footer .container {
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 40px 40px 0 0;
        background: #26347F;
    }

    .footer-main {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    .footer-first {
        max-width: 240px;
        width: 100%;
    }

    .footer-logo {
        width: 240.998px;
        height: 18.398px;
        display: flex;
    }

    .footer-logo img {
        width: 100%;
        height: 100%;
    }

    .footer-first-row {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .footer-first-row div {
        color: #87A4F4;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -0.48px;
        display: flex;
        gap: 5px;
    }

    .footer-first-row div a {
        color: #FFF;
    }

    .footer-first-row div a:hover {
        color: #87A4F4;
    }

    .footer-first-row div:last-child {
        display: flex;
        flex-direction: column;
    }

    .footer-nav {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .footer-nav a {
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 96%;
        letter-spacing: -0.8px;
        text-transform: capitalize;
    }

    .footer-nav a:hover {
        color: #87A4F4;
    }

    .footer-circle {
        content: '';
        height: 84px;
        display: flex;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        /* background: 
            linear-gradient(135deg, #FFF 0%, #26347F 85.72%),
            linear-gradient(206deg, #CAC7DB 32.7%, rgba(50, 63, 134, 0.77) 81.68%); */
    }

    .footer-circle svg {
        width: 100%;
        height: 100%;
    }

    .footer-text {
        opacity: 0.3;
        color: #FFF;
        font-family: Roboto;
        font-size: 2.3vw;
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
        letter-spacing: -1.98px;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    .footer-bot {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .footer-bot-copy {
        color: #FFF;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
    }

    .footer-bot-links {
        display: contents;
    }

    .footer-bot-links a {
        color: #FFF;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: auto;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
        margin: 0;
    }

    .footer-bot-links a:hover {
        color: #87A4F4;
    }

    .footer-bot-dev {
        display: flex;
        flex-direction: column;
        gap: 10px;
        color: #FFF;
        font-family: "Bebas Neue Cyrillic";
        font-size: 36px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.08px;
        text-transform: uppercase;
    }

    .footer-bot-dev span {
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
    }

    .footer-bot-dev:hover {
        color: #87A4F4;
    }

    .where-bot {
        display: none;
    }

    @media (max-width: 1700px) {
        .footer .container {
            padding-top: 20px;
            padding-bottom: 30px;
        }

        .footer-circle {
            height: 70px;
        }

        .footer-main {
            margin-bottom: 40px;
        }

        .footer-text {
            /* font-size: 24px; */
            /* font-style: normal;
            font-weight: 500;
            line-height: 140%;
            letter-spacing: 1.2px;
            text-align: center;
            text-transform: uppercase; */
            margin-bottom: 40px;
        }

        .footer-bot {
            align-items: flex-start;
        }

        .footer-bot-links {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }

    @media (max-width: 1199px) {
        .footer .container {

        }

        .footer-text {
            font-family: Roboto;
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -1.2px;
            text-align: center;
            text-transform: uppercase;
        }

        .footer-main {
            margin-bottom: 50px;
        }

        .footer-bot-dev {
            position: absolute;
            bottom: 30px;
            left: 15px;
        }

        .footer-text {
            margin-bottom: 50px;
        }

        .footer-bot {
            width: fit-content;
            width: -moz-fit-content;
            display: flex;
            flex-direction: column;
            gap: 18px;
            margin-left: auto;
            margin-right: 70px;
            align-items: flex-start;
            justify-content: flex-start;
        }

        .footer-bot-links {
            gap: 18px;
        }
    }

    @media (max-width: 639px) {
        .footer .container {
            padding-top: 20px;
            padding-bottom: 50px;
        }

        .footer-main {
            flex-direction: column;
            gap: 0;
            margin-bottom: 44px;
        }

        .footer-first {
            display: contents;
        }

        .footer-logo {
            order: 0;
            margin-bottom: 30px;
        }

        .footer-nav {
            order: 1;
        }

        .footer-first-row {
            order: 2;
        }

        .footer-circle {
            position: absolute;
            top: 108px;
            right: 15px;
            height: 100px;
        }

        .footer-first-row {
            margin-top: 50px;
        }

        .footer-text {
            color: #FFF;
            text-align: left;
            font-family: Roboto;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -1px;
            text-transform: uppercase;
            margin-bottom: 44px;
        }

        .footer-bot {
            margin: 0;
            width: 100%;
        }

        .footer-bot-dev {
            position: unset;
            margin: 0 auto;
            margin-top: 32px;
        }

        .where-bot {
            display: flex;
            position: fixed;
            bottom: 20px;
            right: 15px;
            left: 15px;
            z-index: 2;
            color: #FFF;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            padding: 10px 15px;
            box-sizing: border-box;
            border-radius: 20.213px;
            background: var(--unnamed, #87A4F4);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>