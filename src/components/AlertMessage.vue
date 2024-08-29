<template>
    <div v-if="isAlertVisible" class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[100] flex items-center justify-center">
        <div class="w-[400px] bg-gray-600 rounded-lg overflow-hidden">
            <div class="flex justify-center w-full">
                <div class="bg-emerald-500 bg-opacity-20 rounded-full p-7 my-8">
                    <div class="bg-emerald-500 rounded-full p-3 animate-pulse">
                        <IconCheck class="w-14 text-white"></IconCheck>
                    </div>
                </div>
            </div>
            <p class="text-center text-emerald-400 font-bold text-4xl capitalize">{{ alertDetails.type }}!</p>
            <p class="text-center mt-3 text-lg px-8">{{ alertDetails.message }}</p>
            <button @click="close" class="bg-emerald-500 hover:bg-emerald-600 w-full py-4 mt-6 text-xl font-semibold tracking-wider">
                CLOSE
            </button>
        </div>
    </div>
</template>

<script setup>
    import IconCheck from './icons/IconCheck.vue';

    const props = defineProps({
        isAlertVisible: Boolean,
        alertDetails: Object,
    });
    const emit = defineEmits(['close']);

    function close(){
        emit('close');
    }
</script>