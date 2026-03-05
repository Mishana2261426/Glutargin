<template>
    <section class="about-banner">
        <div class="container">
            <div class="about-banner-cont">
                <h1 class="visually-hidden">Глутаргин алкоклин</h1>
                <div class="about-banner-cont-title">
                    <div class="about-banner-cont-title-pic">
                        <div class="about-banner-cont-title-pic-top">
                            <img src="/images/about-banner/title_top.svg" alt="">
                        </div>
                        <div class="about-banner-cont-title-pic-bot">
                            <img src="/images/about-banner/title_bot.svg" alt="">
                        </div>
                    </div>
                    <div
                        class="about-banner-cont-title-text"
                        v-if="banner"
                    >
                        {{ banner.title }}
                    </div>
                </div>
                <div class="about-banner-cont-pills">
                    <div class="about-banner-cont-pills-item">
                        <img src="/images/about-banner/pill.svg" alt="">
                    </div>
                    <div class="about-banner-cont-pills-item">
                        <img src="/images/about-banner/pill.svg" alt="">
                    </div>
                    <div class="about-banner-cont-pills-item">
                        <img src="/images/about-banner/pill.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    const banner = await useAboutBanner()
    onMounted(() => {
        if (window.innerWidth <= 639) return; // ❗ блокируем эффект на маленьких экранах

        const pills = document.querySelectorAll('.about-banner-cont-pills-item')

        // Коэффициенты движения
        const speeds = [
            0.06,   // 1 — за курсором
            -0.03,  // 2 — в обратную сторону
            0.04    // 3 — снова за курсором
        ]

        let mouseX = 0, mouseY = 0
        let currentX = 0, currentY = 0

        // Сохраняем исходные трансформации для каждой таблетки
        const baseTransforms = Array.from(pills).map(el => {
            const style = window.getComputedStyle(el)
            return style.transform === 'none' ? '' : style.transform
        })

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX
            mouseY = e.clientY
        })

        const animate = () => {
            currentX += (mouseX - currentX) * 0.1
            currentY += (mouseY - currentY) * 0.1

            pills.forEach((pill, i) => {
                const speed = speeds[i]

                const x = (currentX - window.innerWidth / 2) * speed
                const y = (currentY - window.innerHeight / 2) * speed

                pill.style.transform = `${baseTransforms[i]} translate(${x}px, ${y}px)`
            })

            requestAnimationFrame(animate)
        }

        animate()
    })

</script>

<style scoped>
    .about-banner {
        /* margin-top: 40px; */
    }

    .about-banner-cont {
        height: 650px;
        background-color: #fff;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-bottom: 140px;
    }

    .about-banner-cont-title {
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
    }

    .about-banner-cont-title::before {
        content: '';
        width: 120px;
        height: 120px;
        background: radial-gradient(50% 50% at 50% 50%, #019ADD 0%, #07478F 100%);
        border-radius: 50%;
        position: absolute;
        left: -270px;
        top: -11px;
    }

    .about-banner-cont-title::after {
        content: '';
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: radial-gradient(50% 50% at 50% 50%, #FFF 0%, #E51837 100%);
        position: absolute;
        left: -140px;
        top: -11px;
    }

    .about-banner-cont-title-pic {
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 1;
    }

    .about-banner-cont-title-pic-top {
        width: 751.961px;
        height: 124.285px;
    }

    .about-banner-cont-title-pic-top img {
        width: 100%;
    }

    .about-banner-cont-title-pic-bot {
        width: 714px;
        height: 94.369px;
        margin-left: 225px;
        margin-top: -20px;
    }

    .about-banner-cont-title-pic-bot img {
        width: 100%;
    }

    .about-banner-cont-title-text {
        color: #26347F;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1.28px;
        margin-left: 225px;
        position: relative;
        z-index: 1;
    }

    .about-banner-cont-pills-item {

    }

    .about-banner-cont-pills-item img {
        width: 100%;
        /* height: 100%; */
    }

    .about-banner-cont-pills-item:nth-child(1) {
        width: 172.427px;
        height: 73.311px;
        transform: rotate(-31.769deg);
        position: absolute;
        bottom: 125px;
        left: 14%;
    }

    .about-banner-cont-pills-item:nth-child(2) {
        width: 196.515px;
        height: 83.552px;
        transform: rotate(50.153deg);
        position: absolute;
        top: 166px;
        right: 12%;
    }

    .about-banner-cont-pills-item:nth-child(3) {
        width: 86.979px;
        height: 36.981px;
        transform: rotate(128.194deg);
        position: absolute;
        top: 323px;
        right: 11%;
    }

    @media (max-width: 1700px) {
        .about-banner {
            margin-bottom: 120px;
        }
        .about-banner-cont {
            padding-left: 110px;
            padding-right: 86px;
        }

        .about-banner-cont-title {
            flex-direction: row;
            flex-wrap: wrap;
            max-width: 964px;
        }

        .about-banner-cont-title::after, .about-banner-cont-title::before {
            position: unset;
            order: 0;
        }

        .about-banner-cont-title-pic {
            order: 1;
            width: 100%;
        }

        .about-banner-cont-title-text {
            order: 2;
        }

        .about-banner-cont-title-text {
            margin-left: 130px;
        }

        .about-banner-cont-pills-item:nth-child(1) {
            left: 53px;
            bottom: 89px;
        }

        .about-banner-cont-pills-item:nth-child(2) {
            top: 87px;
            right: 93px;
        }

        .about-banner-cont-pills-item:nth-child(3) {
            top: 250px;
            right: 50px;
        }
    }

    @media (max-width: 1199px) {
        .about-banner {
            margin-bottom: 100px;
        }

        .about-banner-cont {
            align-items: flex-start;
            padding-top: 106px;
            height: 650px;
            box-sizing: border-box;
        }

        .about-banner-cont-title {
            max-width: 592px;
        }

        .about-banner-cont-title-pic-top {
            width: 448px;
            height: 67px;
        }

        .about-banner-cont-title-pic-bot {
            width: 506px;
            height: 62px;
            margin-left: 30px;
            margin-top: 0;
        }

        .about-banner-cont-title::after, .about-banner-cont-title::before {
            width: 80px;
            height: 80px;
        }

        .about-banner-cont-title-text {
            margin-left: 133px;
        }

        .about-banner-cont-pills-item:nth-child(1) {
            width: 172.427px;
            height: 73.311px;
            transform: rotate(38.54deg);
            left: 20px;
            bottom: 90px;
        }

        .about-banner-cont-pills-item:nth-child(2) {
            width: 86.979px;
            height: 36.981px;
            transform: rotate(38.552deg);
            top: 52px;
            right: 100px;
        }

        .about-banner-cont-pills-item:nth-child(3) {
            width: 86.979px;
            height: 36.981px;
            transform: rotate(-58.451deg);
            top: 130px;
            right: 20px;
        }
    }

    @media (max-width: 639px) {
        .about-banner {
            margin-bottom: 76px;
        }

        .about-banner-cont {
            margin-bottom: 0;
        }

        .about-banner-cont {
            padding: 30px 9px;
            height: 569px;
            border-radius: 20px;
        }

        .about-banner-cont-title {
            max-width: 100%;
            gap: 5px;
            row-gap: 0;
        }

        .about-banner-cont-title-pic {
            margin-top: 68px;
            margin-bottom: 20px;
        }

        .about-banner-cont-title-pic-top {
            width: 230px;
            height: 35px;
            margin-left: 11px;
        }

        .about-banner-cont-title-pic-bot {
            width: 273px;
            height: 33px;
        }

        .about-banner-cont-title-text {
            margin-left: 0;
        }

        .about-banner-cont-title::before {
            margin-left: 20px;
        }

        .about-banner-cont-pills-item:nth-child(1) {
            width: 172.427px;
            height: 73.311px;
            transform: rotate(142.316deg);
            right: 10px;
            bottom: 60px;
            left: auto;
            top: auto;
        }

        .about-banner-cont-pills-item:nth-child(2) {
            width: 86.979px;
            height: 36.981px;
            transform: rotate(38.552deg);
            left: 20px;
            bottom: 160px;
            margin: auto;
            top: auto;
            right: auto;
        }

        .about-banner-cont-pills-item:nth-child(3) {
            width: 86.979px;
            height: 36.981px;
            transform: rotate(128.311deg);
            top: 100px;
            right: 20px;
        }
    }
</style>