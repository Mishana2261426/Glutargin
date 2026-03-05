<template>
    <div class="main-about">
        <div class="container">
            <div class="main-top">
                <h2>
                    {{ title }}
                </h2>
                <div class="main-about-nav" :class="{ 'main-about-nav_powder': active === 'powder' }">
                    <button
                        v-for="tab in tabs"
                        :key="tab.id"
                        :class="{ active: active === tab.id }"
                        @click="active = tab.id"
                    >
                        {{ tab.id === 'tablet' ? 'Таблетки' : 'Порошок' }}
                    </button>
                </div>
            </div>
            <div class="main-about-cont">
                <div
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="main-about-cont-item"
                    :class="{ 'main-about-cont-item_powder': active === 'powder' }"
                    v-show="active === tab.id"
                >
                    <div class="main-about-cont-item-pic">
                        <img :src="tab.pic" alt="">
                    </div>
                    <div class="main-about-cont-item-block">
                        <p>
                            {{ tab.text }}
                        </p>
                        <NuxtLink to="about">
                            Читать больше
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        tabs: Object,
        title: String
    })
    
    const active = ref('tablet')
</script>

<style scoped>
    .main-about {
        margin-bottom: 80px;
    }

    .main-about .container {
        position: relative;
    }

    .main-about-nav {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        gap: 10px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 80px;
        background: #26347F;
        color: #26347F;
        transition: 0.3s;
    }

    .main-about-nav_powder {
        background-color: #E51837;
        color: #E51837;
    }

    .main-about-nav:hover {
        /* background: rgba(38, 52, 127, 0.70); */
    }

    .main-about-nav_powder:hover {
        /* background-color: rgba(229, 24, 55, 0.70); */
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

    .main-about-cont-item {
        display: flex;
        gap: 20px;
        height: 350px;
        color: #26347F;
    }

    .main-about-cont-item_powder {
        color: #E51837;
    }

    .main-about-cont-item-pic {
        width: 50%;
        border-radius: 30px;
        overflow: hidden;
    }

    .main-about-cont-item-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
    }

    .main-about-cont-item-block {
        width: 50%;
        background-color: #fff;
        border-radius: 30px;
        position: relative;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .main-about-cont-item-block::after {
        content: '';
        width: 250px;
        height: 250px;
        border-radius: 50%;
        position: absolute;
        right: -70px;
        bottom: -80px;
        background: linear-gradient(135deg, #FFF 7.8%, #26347F 85.71%);
        transition: 0.3s;
    }

    .main-about-cont-item_powder .main-about-cont-item-block::after {
        background: linear-gradient(135deg, #FFF 7.8%, #E51837 85.71%);
    }

    .main-about-cont-item-block p {
        max-width: 777px;
        color: inherit;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 100%;
        letter-spacing: -1.6px;
        transition: 0.3s;
    }

    .main-about-cont-item-block a {
        margin-top: 30px;
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        width: 250px;
        height: 50px;
        border-radius: 30px;
        background: #26347F;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main-about-cont-item-block a:hover {
        background-color: rgba(38, 52, 127, 0.70);
    }

    .main-about-cont-item_powder .main-about-cont-item-block a {
        background-color: #E51837;
    }

    .main-about-cont-item_powder .main-about-cont-item-block a:hover {
        background-color: rgba(229, 24, 55, 0.70);
    }

    @media (max-width: 1700px) {
        .main-about {
            margin-bottom: 50px;
        }

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

        .main-about-cont-item {
            height: 222px;
        }

        .main-about-cont-item-pic {
            border-radius: 20px;
        }

        .main-about-cont-item-block {
            border-radius: 20px;
            padding: 20px;
        }

        .main-about-cont-item-block p {
            max-width: 492px;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -1px;
        }

        .main-about-cont-item-block a {
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;
            letter-spacing: -0.8px;
            width: 200px;
            height: 30px;
        }

        .main-about-cont-item-block::after {
            width: 158px;
            height: 158px;
            right: -50px;
            bottom: -50px;
        }
    }

    @media (max-width: 1199px) {
        .main-about {

        }

        .main-top {
            display: flex;
            flex-direction: column;
        }

        .main-about-nav {
            position: unset;
            margin-right: auto;
        }

        .main-about-cont-item {
            flex-direction: column-reverse;
            height: auto;
        }

        .main-about-cont-item-block {
            width: 100%;
            padding: 15px;
            height: 224px;
        }

        .main-about-cont-item-pic {
            width: 100%;
            height: 224px;
        }
    }

    @media (max-width: 639px) {
        .main-top {
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 20px;
        }

        .main-about-cont-item {
            gap: 15px;
        }

        .main-about-cont-item-block {
            padding: 10px;
            height: 168px;
        }

        .main-about-cont-item-block p {
            /* width: 310px; */
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            letter-spacing: -0.8px;
        }

        .main-about-cont-item-block a {
            width: 158px;
            margin-top: 20px;
        }

        .main-about-cont-item-block::after {
            width: 100px;
            height: 100px;
            right: -35px;
            bottom: -35px;
        }

        .main-about-cont-item-pic {
            height: 168px;
        }
    }
</style>