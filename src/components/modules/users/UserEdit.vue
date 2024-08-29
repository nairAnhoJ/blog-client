<template>
    <button @click="showEditModal(editID)" class="group relative inline-block flex hover:underline p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-400 duration-300 z-10">
        <IconPencil class="w-5 h-5"></IconPencil>
        <span class="absolute hidden group-hover:flex right-1/2 -bottom-[2px] translate-y-full translate-x-1/2 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700 z-20">Edit</span>
    </button>

    <div v-if="isEditModalVisible" class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[100] flex items-center justify-center">
        <form @submit.prevent="update" class="w-[800px] bg-neutral-600 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b">
                <div class="font-bold text-2xl">
                    EDIT USER
                </div>
                <div>
                    <button type="button" class="w-8 flex items-center hover:scale-105">
                        <IconClose @click="isEditModalVisible = !isEditModalVisible" class="w-full h-full"></IconClose>
                    </button>
                </div>
            </div>
            <div class="p-5 border-b text-left">
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
    import { editUser, updateUser } from '@/http/user-api';
    import IconClose from '@/components/icons/IconClose.vue';
    import IconPencil from '@/components/icons/IconPencil.vue';

    const user = ref({
        name: '',
        email: ''
    });
    
    const alert = ref({
        type: '',
        message: ''
    });

    const props = defineProps({
        editID: {
            type: Number,
            required: true,
        }
    });

    const isEditModalVisible = ref(false);
    const errors = ref({});
    const loadingElement = document.getElementById('loading');
    const emit = defineEmits(['update-row', 'show-alert']);

    async function showEditModal(id) {
        try {
            loadingElement.classList.remove('hidden');
            errors.value = {};
            const response = await editUser(id);
            user.value = response.data.data
        }catch (error) {
            errors.value = 'An unexpected error occurred. Please try again later.';
        }finally{
            isEditModalVisible.value = true;
            loadingElement.classList.add('hidden');
        }
    }

    async function update() {
        try {
            loadingElement.classList.remove('hidden');
            const response = await updateUser(props.editID, user.value);
            emit('update-row', response.data.data);
            alert.value.type = 'success';
            alert.value.message = 'User updated successfully.';
            emit('show-alert', alert.value);
            isEditModalVisible.value = false;
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
    }
</script>

