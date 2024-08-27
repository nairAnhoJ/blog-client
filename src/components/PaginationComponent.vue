<template>
    <div class="flex items-center justify-end mt-5">
        <div v-if="pagination" class="">
            <ul class="flex flex-row items-center -space-x-px h-8 text-sm">
                <li>
                    <button @click="$emit('load-page', pagination.links.prev)" :disabled="!pagination.links.prev" class="disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                        <span class="sr-only">Previous</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                </li>

                <li v-if="pagination.meta && pagination.meta.links"
                    v-for="(page, index) in pagination.meta.links.slice(1, -1)">
                        <button  
                            @click="$emit('load-page', page.url)" 
                            :key="index" 
                            :disabled="page.active" 
                            :class="(pagination.meta.current_page == page.label) ? 'font-bold bg-gray-200' : ''"
                            class="disabled:pointer-events-none flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                                {{ page.label }}
                        </button>
                </li>

                <li>
                    <button @click="$emit('load-page', pagination.links.next)" :disabled="!pagination.links.next" class="disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                        <span class="sr-only">Next</span>
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        pagination: {
            type: Object,
            required: true
        }
    });
</script>