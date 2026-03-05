<template>
    <section class="article-solo">
        <div class="container">
            <div class="article-banner">
                <img :src="banner" alt="">
            </div>
            <div class="article-row">
                <div class="article-item" v-for="article in article_texts">
                    <div class="article-item-bg">
                        <img :src="article.bg" alt="">
                    </div>
                    <div class="article-item-text" v-html="article.content">
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const props = defineProps({
        article_texts: Object,
        banner: String,
    })
</script>

<style>
    .article-solo {
        margin-bottom: 140px;
    }

    .article-banner {
        width: 100%;
        height: 713px;
        max-height: calc(100vh - 110px);
        border-radius: 30px;
        background: #FFF;
        padding: 20px;
        box-sizing: border-box;
    }

    .article-banner img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        border-radius: 30px;
    }

    .article-row {
        width: 100%;
        margin: 0 auto;
        margin-top: -220px;
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;
    }

    .article-item {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .article-item-text {
        padding: 50px;
        box-sizing: border-box;
        border-radius: 30px;
        background: #FFF;
        max-width: 933px;
        width: 100%;
        overflow: hidden;
    }

    .article-item-bg {
        position: absolute;
        right: 0;
        max-width: 443px;
        min-width: 443px;
        border-radius: 30px;
        overflow: hidden;
        top: 240px;
        bottom: 341px;
        z-index: -1;
    }

    .article-item:nth-child(even) .article-item-bg {
        right: auto;
        left: 0;
    }

    .article-item-bg img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }

    .article-item-text {
        display: flex;
        flex-direction: column;
    }

    .article-item-text h2 {
        color: #26347F;
        font-family: "PT Sans";
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: 110%;
        letter-spacing: -0.96px;
        text-transform: uppercase;
        margin-bottom: 30px;
    }

    .article-item-text i {
        color: #26347F;
        font-family: Inter;
        font-size: 30px;
        font-style: italic;
        font-weight: 600;
        line-height: 110%;
        margin-bottom: 20px;
    }

    .article-item-text p {
        color: #26347F;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
    }

    .article-item-text a {
        color: var(--unnamed, #87A4F4);
        font-family: Inter;
        font-size: 20px;
        font-style: italic;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: auto;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
    }

    .article-item-text a:hover {
        opacity: 0.6;
    }

    .article-item-text ul {
        padding-left: 20px;
        color: #26347F;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 110%;
        letter-spacing: -1px;
    }

    .article-item-text img {
        height: 288px;
        width: 100%;
        border-radius: 30px;
        object-fit: cover;
        object-position: center center;
        margin: 50px 0;
    }

    @media (max-width: 1700px) {
        .article-solo {
            margin-bottom: 120px;
        }

        .article-banner {
            height: 658px;
        }

        .article-item-bg {
            right: -203px;
        }

        .article-item:nth-child(even) .article-item-bg {
            left: -203px;
        }
    }

    @media (max-width: 1199px) {
        .article-item-bg {
            display: none;
        }

        .article-solo {
            margin-bottom: 100px;
        }

        .article-banner {
            border-radius: 20px;
        }

        .article-row {
            margin-top: 30px;
            gap: 30px;
        }

        .article-item-text {
            padding: 20px 15px;
        }

        .article-item-text h2 {
            margin-bottom: 20px;
            max-width: 510px;
            font-size: 30px;
            font-style: normal;
            font-weight: 700;
            line-height: 110%;
            letter-spacing: -0.6px;
            text-transform: uppercase;
        }

        .article-item-text i {
            font-size: 24px;
            font-style: italic;
            font-weight: 600;
            line-height: 110%;
            margin-bottom: 20px;
        }

        .article-item-text img {
            margin: 20px 0;
        }
    }

    @media (max-width: 639px) {
        .article-solo {
            margin-bottom: 80px;
        }

        .article-banner {
            padding: 15px;
            padding-bottom: 25px;
        }
    }
</style>