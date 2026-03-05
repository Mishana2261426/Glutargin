<template>
    <div v-if="showModal" class="modal-bg">
        <div class="modal">
            <div class="modal-top">
                <h2>ПРЕДУПРЕЖДЕНИЕ</h2>
            </div>
            <div class="modal-cont">
                <p>
                    Информация на сайте предназначена исключительно для медицинских работников. <br>
                </p>
                <p>
                    Подтвердите, пожалуйста, являетесь ли Вы <b>медицинским работником.</b>
                </p>
                <p>
                    Если Вы не являетесь медицинским работником, покиньте пожалуйста данный раздел сайта.
                </p>
                <label class="agree">
                    <input type="checkbox" v-model="agree">
                    <span></span>
                    Я ознакомлен с соглашением и согласен с его положениями
                </label>
            </div>
            <div class="btns modal-bot">
                <button @click="reject">Нет, я не являюсь <br> медицинским работником</button>
                <button @click="accept" :disabled="!agree">Да, я являюсь <br> медицинским работником</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const showModal = ref(false)
    const agree = ref(false)

    onMounted(() => {
        const accepted = localStorage.getItem('med_accept')

        if (accepted !== 'yes') {
            showModal.value = true
        }
    })

    const accept = () => {
        localStorage.setItem('med_accept', 'yes')
        showModal.value = false
    }

    const reject = () => {
        window.location.href = "/"
    }
</script>

<style scoped>
    .modal-bg {
        position: fixed;
        inset: 0;
        background: rgba(38, 52, 127, 0.60);
        backdrop-filter: blur(7.5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .modal {
        border-radius: 30px;
        background: #FFF;
        max-width: 1380px;
        width: 100%;
    }

    .modal-top {
        padding: 30px 0;
        border-bottom: 2px solid #D9D9D9;
        margin-bottom: 30px;
    }

    .modal h2 {
        color: #26347F;
        font-family: Roboto;
        font-size: 45px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
        letter-spacing: -1.98px;
        text-transform: uppercase;
        text-align: center;
    }

    .modal-cont {
        padding: 0 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .modal-cont p {
        color: #26347F;
        font-family: Inter;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
        letter-spacing: -1.6px;
    }

    .modal-cont label {
        color: #26347F;
        font-family: Inter;
        font-size: 30px;
        font-style: normal;
        font-weight: 400;
        line-height: 110%;
        letter-spacing: -0.9px;
        display: flex;
        gap: 9px;
        align-items: flex-start;
        cursor: pointer;
    }

    .modal-cont label input {
        display: none;
    }

    label span {
        max-width: 30px;
        min-width: 30px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid rgba(38, 52, 127, 0.30);
        box-sizing: border-box;
        margin-right: 5px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.3s;
    }

    label span::after {
        content: '';
        width: 19.5px;
        height: 18px;
        background-image: url(/images/main-qst/gal.svg);
        background-size: 100% 100%;
        display: flex;
        opacity: 0;
        transition: 0.3s;
    }

    label input:checked~span {
        border: 1px solid rgba(38, 52, 127, 1);
    }

    label input:checked~span::after {
        opacity: 1;
    }

    button[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .modal-bot {
        padding: 30px;
        border-top: 2px solid #D9D9D9;
        margin-top: 30px;
        display: flex;
        gap: 20px;
    }

    .modal-bot button {
        width: 50%;
        color: #FFF;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
        letter-spacing: -1px;
        text-align: center;
        border-radius: 30px;
        background: #26347F;
        padding: 10px 30px;
        box-sizing: border-box;
    }

    .modal-bot button:hover {
        background-color: rgba(38, 52, 127, 0.70);
    }

    button[disabled]:hover {
        background: #26347F !important;
    }

    @media (max-width: 1700px) {
        .modal {
            max-width: 940px;
            max-height: 90vh;
            overflow-y: scroll;
        }

        .modal-cont {
            max-width: 673px;
        }

        .modal-cont label {
            max-width: 470px;
            font-size: 30px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%;
            letter-spacing: -0.9px;
            gap: 5px;
        }

        .modal-bot {
            flex-direction: column;
            gap: 20px;
        }

        .modal-bot button {
            width: 100%;
            padding: 10px 20px;
        }
    }

    @media (max-width: 1199px) {
        .modal {
            max-width: 600px;
        }

        .modal-cont p {
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%;
            letter-spacing: -1.2px;
        }

        .modal-cont label {
            max-width: 452px;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 110%;
            letter-spacing: -0.72px;
        }
    }

    @media (max-width: 639px) {
        .modal {
            max-height: 100vh;
        }

        .modal-top {
            margin-bottom: 20px;
        }

        .modal h2 {
            font-size: 36px;
            font-style: normal;
            font-weight: 500;
            line-height: 140%;
            letter-spacing: -1.584px;
            text-transform: uppercase;
        }

        .modal-cont {
            padding: 0 16px;
        }

        .modal-bot {
            padding: 20px 15px;
        }
    }
</style>