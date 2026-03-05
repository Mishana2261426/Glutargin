<script setup lang="ts">
const meds = await useAboutSliders()
</script>

<template>
    <main style="padding: 24px;">
        <h1>Test meds</h1>

        <ul style="display: flex; flex-direction: column; gap: 20px">
            <li v-for="med in meds" :key="med.slug">
                <strong>{{ med.type }}</strong> <br>
                <!-- <strong>{{ med.types }}</strong><br>
                <strong>{{ med.pic }}</strong> <br>
                <strong>{{ med.picBg }}</strong> <br>
                <strong>{{ med.text }}</strong> <br> -->
            </li>
        </ul>
    </main>
</template>
