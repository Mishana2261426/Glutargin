<template>
    <div class="main-article">
        <div class="container">
            <div class="main-top">
                <h2>
                    {{ title }}
                </h2>
            </div>
            <div v-if="false">{{ qstCounter = 0 }}</div>
            <div class="main-article-row">
                <div
                    class="main-article-item"
                    v-for="(article, i) in articles"
                    :key="article.slug"
                    :class="{ open: openIndex === i }"
                >
                    <div
                        class="main-article-item-date"
                        v-if="route != 'qsts'"
                    >
                        {{ article.date }}
                    </div>

                    <div
                        class="main-article-item-num"
                         v-if="route == 'qsts'"
                    >
                        {{ ++qstCounter }}
                    </div>
                    <div class="main-article-item-pic">
                        <img :src="article.pic" alt="">
                    </div>
                    <div class="main-article-item-top-cont">
                        <div class="main-article-item-top-cont-title">
                            {{ article.title }}
                        </div>

                        <div class="main-article-item-top-cont-text">
                            {{ article.text }}
                        </div>

                        <NuxtLink
                            :to="`/${route}/${article.slug}`"
                            class="main-article-item-top-cont-link"
                        >
                            Читать дальше
                        </NuxtLink>
                    </div>
                    <button
                        class="main-article-item-btn"
                        @click="openIndex = openIndex === i ? -1 : i"
                    ></button>
                </div>

                <NuxtLink to="/articles" class="main-article-more" v-if="more">
                    Посмотреть все
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        articles: Object,
        title: String,
        more: Boolean,
        route: {
            type: String,
            default: 'articles',
        },
    })


    let qstCounter = 0


    const openIndex = ref(0)
</script>

<style scoped>
    .main-article {
        margin-bottom: 140px;
    }

    .main-article-row {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 40px 20px;
        border-radius: 50px;
        background: #FFF;
        box-sizing: border-box;
    }

    .main-article-item {
        display: flex;
        color: #26347F;
        padding: 12px 20px 8px 10px;
        box-sizing: border-box;
        border-radius: 20px;
        border: 1px solid rgba(38, 52, 127, 0.15);
        max-height: 53px;
        overflow: hidden;
        transition: 0.3s;
        position: relative;
    }

    .main-article-item:hover {
        color: #87A4F4;
    }

    .main-article-item.open {
        max-height: 270px;
        background-color: #26347F;
        color: #fff;
    }

    .main-article-item-date {
        color: inherit;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: -0.2px;
        margin-right: 95px;
    }

    .main-article-item-pic {
        height: 250px;
        max-width: 499px;
        width: 100%;
        border-radius: 30px;
        overflow: hidden;
        margin-right: 20px;
        opacity: 0;
        transition: 0.3s;
    }

    .main-article-item.open .main-article-item-pic {
        opacity: 1;
    }

    .main-article-item-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }

    .main-article-item-top-cont {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .main-article-item-top-cont-title {
        color: inherit;
        font-family: "PT Sans";
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 110%;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    .main-article-item-top-cont-text {
        color: inherit;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
        max-width: 640px;
        opacity: 0;
        transition: 0.3s;
    }

    .main-article-item.open .main-article-item-top-cont-text {
        opacity: 1;
    }

    .main-article-item-top-cont-link {
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%; /* 20px */
        letter-spacing: -1px;
        margin-top: 30px;
        border-radius: 30px;
        color: #26347F;
        background: #FFF;
        width: 250px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #fff;
        box-sizing: border-box;
    }

    .main-article-item-top-cont-link:hover {
        background: rgba(38, 52, 127, 0.70);
        color: #fff;
    }

    .main-article-item-btn {
        min-width: 23px;
        max-width: 23px;
        height: 16px;
        background-image: url(/images/main-article/arrow.svg);
        background-size: 100% 100%;
        margin-top: 6px;
        transition: transform 0.3s;
        background-color: transparent;
    }

    .main-article-item.open .main-article-item-btn {
        transform: rotate(180deg);
        background-image: url(/images/main-article/arrow_active.svg);
    }

    .main-article-item-btn {
        position: absolute;
        top: 0;
        left: 0;
        right: 10px;
        height: 53px;
        max-width: 100%;
        min-width: 100%;
        background-image: none;
        margin-top: 0;
        padding-right: 10px;
        background-color: transparent;
    }

    .main-article-item.open .main-article-item-btn {
        background-image: none;
        transform: none;
    }

    .main-article-item-btn::after {
        content: '';
        width: 23px;
        height: 16px;
        background-image: url(/images/main-article/arrow.svg);
        background-size: 100% 100%;
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        transition: 0.3s;
    }

    .main-article-item.open .main-article-item-btn::after {
        background-image: url(/images/main-article/arrow_active.svg) !important;
        transform: rotate(180deg);
    }

    .main-article-item:hover .main-article-item-btn::after {
        background-image: url(/images/main-article/arrow_hover.svg);
    }
    
    .main-article-more {
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        width: 250px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        background: #26347F;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 30px;
    }

    .main-article-more:hover {
        background-color: rgba(38, 52, 127, 0.70);
    }

    .main-article-item-num {
        color: #FFF;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 120%;
        letter-spacing: -0.42px;
        padding: 6px 14px;
        box-sizing: border-box;
        border-radius: 30px;
        background: #26347F;
        margin-right: 143px;
        height: fit-content;
        width: fit-content;
        transition: 0.3s;
    }

    .main-article-item:hover .main-article-item-num {
        background-color: #87A4F4;
    }

    .main-article-item.open .main-article-item-num {
        color: #26347F;
        background-color: #fff;
    }

    @media (max-width: 1700px) {
        .main-article {
            margin-bottom: 120px;
        }

        .main-article-row {
            padding: 30px 20px;
            gap: 10px;
        }

        .main-article-item-date {
            font-size: 12.672px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.127px;
            margin-right: 45px;
        }

        .main-article-item {
            padding: 10px 10px 22px 8px;
            max-height: 44px;
        }

        .main-article-item.open {
            max-height: 185px;
        }

        .main-article-item-pic {
            max-width: 316px;
            height: auto;
            margin-right: 17px;
            border-radius: 20px;
        }

        .main-article-item-top-cont-title {
            font-size: 22px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%;
            text-transform: uppercase;
            margin-bottom: 6px;
        }

        .main-article-item-top-cont-text {
            max-width: 442px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 110%;
            letter-spacing: -0.8px;
        }

        .main-article-item-top-cont-link {
            margin-top: 20px;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.7px;
            width: 158px;
            height: 25px;
        }

        .main-article-more {
            margin-top: 30px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            width: 200px;
            height: 30px;
        }

        .main-article-item-num {
            margin-right: 41px;
            margin-top: -3px;
        }

        .main-article-item-btn {
            height: 44px;
        }
    }

    @media (max-width: 1199px) {
        .main-article {
            margin-bottom: 100px;
        }

        .main-article-row {
            padding: 15px 10px;
            gap: 10px;
            border-radius: 20px;
        }

        .main-article-item {
            padding: 10px;
            border-radius: 10px;
            max-height: 38px;
            height: 100%;
            position: relative;
        }

        .main-article-item.open {
            padding-bottom: 20px;
        }

        .main-article-item-date {
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.12px;
            margin-right: 5px;
        }

        .main-article-item-pic {
            margin-top: 4px;
            /* max-width: 161px; */
            max-width: 0;
            margin: 0;
        }

        .main-article-item.open .main-article-item-pic {
            max-width: 161px;
            margin-right: 10px;
            margin-top: 4px;
        }

        .main-article-item-top-cont {
            margin-right: 20px;
        }

        .main-article-item-top-cont-title {
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%;
            text-transform: uppercase;
        }

        .main-article-item-btn {
            position: absolute;
            top: 0;
            left: 0;
            right: 10px;
            height: 38px;
            max-width: 100%;
            min-width: 100%;
            background-image: none;
            margin-top: 0;
            padding-right: 10px;
            background-color: transparent;
        }

        .main-article-item.open .main-article-item-btn {
            background-image: none;
            transform: none;
        }

        .main-article-item-btn::after {
            content: '';
            width: 7.888px;
            height: 5.259px;
            background-image: url(/images/main-article/arrow.svg);
            background-size: 100% 100%;
            position: absolute;
            right: 10px;
            top: 0;
            bottom: 0;
            margin: auto;
            transition: 0.3s;
        }

        .main-article-item.open .main-article-item-btn::after {
            background-image: url(/images/main-article/arrow_active.svg);
            transform: rotate(180deg);
        }

        .main-article-item-top-cont-text {
            max-width: 305px;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -0.7px;
        }

        .main-article-item-top-cont-link {
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.7px;
            width: 158px;
            height: 25px;
            margin-top: 10px;
        }

        .main-article-more {
            margin-top: 20px;
        }

        .main-article-item-num {
            display: none;
        }
    }

    @media (max-width: 639px) {
        .main-article {
            margin-bottom: 80px;
        }

        .main-article .main-top {
            margin-bottom: 20px;
        }

        .main-article-row {
            padding: 10px;
            border-radius: 15px;
            gap: 5px;
        }

        .main-article-item {
            flex-direction: column;
            max-height: 56px;
        }

        .main-article-item.open {
            max-height: 600px;
            padding-bottom: 20px;
        }

        .main-article-item-top-cont {
            display: contents;
        }

        .main-article-item-top-cont-title {
            order: 0;
            margin-right: 20px;
            margin-bottom: 5px;
            min-height: 38px;
            max-height: 38px;
            display: flex;
            align-items: center;
        }

        .main-article-item-date {
            order: 1;
            opacity: 0;
            transition: 0.3s;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.14px;
            margin-bottom: 20px;
        }

        .main-article-item.open .main-article-item-date {
            opacity: 1;
        }

        .main-article-item-pic {
            order: 2;
            max-width: 100%;
            height: 120px;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .main-article-item.open .main-article-item-pic {
            max-width: 100%;
        }

        .main-article-item-top-cont-text {
            order: 3;
            max-width: 100%;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -0.8px;
        }

        .main-article-item-top-cont-link {
            order: 4;
            width: 100%;
            height: 30px;
            margin-top: 30px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
        }

        .main-article-item-btn {
            height: 56px;
        }

        .main-article-item-btn::after {
            width: 15px;
            height: 10px;
        }

        .main-article-more {
            margin-top: 30px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            width: 100%;
            height: 40px;
        }
    }
</style>