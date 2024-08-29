<template>
    <button @click="showAddModal" class="text-xl font-bold bg-blue-600 px-3 py-2 rounded-lg hover:bg-blue-700">
        ADD USER
    </button>

    <div v-if="isAddModalVisible" class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[100] flex items-center justify-center">
        <form @submit.prevent="store" class="w-[800px] bg-neutral-600 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b">
                <div class="font-bold text-2xl">
                    ADD USER
                </div>
                <div>
                    <button type="button" class="w-8 flex items-center hover:scale-105">
                        <IconClose @click="isAddModalVisible = !isAddModalVisible" class="w-full h-full"></IconClose>
                    </button>
                </div>
            </div>
            <div class="p-5 border-b">
                <div class="mb-6">
                    <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" v-model="user.name" class="bg-neutral-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" autocomplete="off">
                    <p v-if="errors && errors.name" class="text-red-500">{{ errors.name[0] }}</p>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="email" v-model="user.email" class="bg-neutral-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" autocomplete="off">
                    <p v-if="errors && errors.email" class="text-red-500">{{ errors.email[0] }}</p>
                </div>
            </div>
            <div class="p-5">
                <button class="bg-blue-600 hover:bg-blue-700 text-lg tracking-wide px-6 py-2 rounded-lg font-bold">
                    SUBMIT
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { createUser } from '@/http/user-api';
    import IconClose from '@/components/icons/IconClose.vue';

    const isAddModalVisible = ref(false);
    const errors = ref({});
    const loadingElement = document.getElementById('loading');
    const emit = defineEmits(['add-row', 'show-alert']);

    const user = ref({
        name: '',
        email: '',
        password: 'password'
    });
    
    const alert = ref({
        type: '',
        message: ''
    });

    function showAddModal(){
        user.value.name = '';
        user.value.email = '';
        isAddModalVisible.value = true;
    }

    async function store() {
        try {
            loadingElement.classList.remove('hidden');
            const response = await createUser(user.value);
            emit('add-row', response.data.data);
            alert.value.type = 'success';
            alert.value.message = 'User created successfully.';
            emit('show-alert', alert.value);
            isAddModalVisible.value = false;
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors || {};
                } else {
                    errors.value = 'An unexpected error occurred. Please try again later.';
                }
            } else {
                errors.value = 'An unexpected error occurred. Please try again later.';
            }
        }finally{
            loadingElement.classList.add('hidden');
        }
    };
</script>

