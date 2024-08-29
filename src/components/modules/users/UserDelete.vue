<template>
    <button @click="showDeleteModal(deleteID)" class="group relative inline-block flex hover:underline p-3 bg-red-500 text-white rounded-xl hover:bg-red-400 duration-300 z-10">
        <IconTrash class="w-5 h-5"></IconTrash>
        <span class="absolute hidden group-hover:flex right-1/2 -bottom-[2px] translate-y-full translate-x-1/2 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700 z-20">Delete</span>
    </button>

    <div v-if="isDeleteModalVisible" class="h-screen w-screen bg-neutral-900 bg-opacity-60 fixed top-0 left-0 z-[100] flex items-center justify-center">
        <form @submit.prevent="destroy" class="w-[800px] bg-neutral-600 rounded-lg">
            <div class="p-5 flex items-center justify-between border-b">
                <div class="font-bold text-2xl">
                    DELETE USER
                </div>
                <div>
                    <button type="button" class="w-8 flex items-center hover:scale-105">
                        <IconClose @click="isDeleteModalVisible = !isDeleteModalVisible" class="w-full h-full"></IconClose>
                    </button>
                </div>
            </div>
            <div class="p-5 border-b text-left">
                Are you sure you want to delete this user?

                <h1 class="mt-5 text-lg font-semibold tracking-wide">User Details:</h1>
                <p>Name: {{user.name}}</p>
                <p>Email: {{user.email}}</p>
            </div>
            <div class="p-5 text-start">
                <button class="bg-red-600 hover:bg-red-700 text-lg tracking-wide px-6 py-2 rounded-lg font-bold">
                    SUBMIT
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { editUser, deleteUser } from '@/http/user-api';
    import IconClose from '@/components/icons/IconClose.vue';
    import IconTrash from '@/components/icons/IconTrash.vue';

    const user = ref({
        name: '',
        email: ''
    });
    
    const alert = ref({
        type: '',
        message: ''
    });

    const props = defineProps({
        deleteID: {
            type: Number,
            required: true,
        }
    });

    const isDeleteModalVisible = ref(false);
    const errors = ref({});
    const loadingElement = document.getElementById('loading');
    const emit = defineEmits(['delete-row', 'show-alert']);

    async function showDeleteModal(id) {
        try {
            loadingElement.classList.remove('hidden');
            errors.value = {};
            const response = await editUser(id);
            user.value = response.data.data
        }catch (error) {
            errors.value = 'An unexpected error occurred. Please try again later.';
        }finally{
            isDeleteModalVisible.value = true;
            loadingElement.classList.add('hidden');
        }
    }

    async function destroy() {
        try {
            loadingElement.classList.remove('hidden');
            const response = await deleteUser(props.deleteID);
            emit('delete-row', props.deleteID);
            alert.value.type = 'success';
            alert.value.message = 'User deleted successfully.';
            emit('show-alert', alert.value);
            isDeleteModalVisible.value = false;
        } catch (error) {
            errors.value = 'An unexpected error occurred. Please try again later.';
        }finally{
            loadingElement.classList.add('hidden');
        }
    }
</script>

