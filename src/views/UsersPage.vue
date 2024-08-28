<template>
    <div class="overflow-x-hidden">
        <div class="text-white p-6 min-h-[calc(100vh-64px)]">
            <div class="w-full flex items-center justify-between">
                <UserAdd @add-row="addRow"></UserAdd>
            </div>
            <div class="mt-6 w-full">
                <table class="w-full">
                    <thead class="border-b">
                        <tr>
                            <th class="w-32 text-center px-6 py-3">ID</th>
                            <th class="w-[500px] text-left px-6">Name</th>
                            <th class="w-[500px] text-left px-6">Email</th>
                            <th class="text-center px-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserTable v-for="user in collection" :key="user.id" :user="user" @update-row="updateRow" @delete-row="deleteRow"></UserTable>
                    </tbody>
                </table>
                <Loading v-if="!isLoaded"></Loading>
            </div>


            <!-- PAGINATION -->
                <PaginationComponent v-if="isLoaded" :pagination="pagination" @load-page="fetchCollection"></PaginationComponent>
            <!-- PAGINATION -->
        </div>
    </div>
</template>

<script setup>
    // Imports
        import { onMounted, ref } from 'vue';
        import { usersIndex } from '@/http/user-api';
        import UserTable from '@/components/modules/users/UserTable.vue';
        import Loading from '@/components/Loading.vue';
        import UserAdd from '@/components/modules/users/UserAdd.vue';
        import PaginationComponent from '@/components/PaginationComponent.vue';
        import axios from '@/axios';
        import { useAuthStore } from '@/stores/authStore';

    // Imports

    // Variables
        const collection = ref([]);
        const isLoaded = ref(false);
        const pagination = ref({ links: {}, meta: {} });
        const errors = ref({});
        const authStore = useAuthStore();
    // Variables

    onMounted(async () => {
        await fetchCollection();
    });

    const fetchCollection = async (url) => {
        isLoaded.value = false;
        collection.value = [];
        try {
            const response = url ? await axios.get(url) : await usersIndex();
            collection.value = response.data.data;
            pagination.value = {
                links: response.data.links,
                meta: response.data.meta,
            };
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors || {};
                } else if(error.response.status === 401) {
                    authStore.logout();
                } else {
                    errors.value = 'An unexpected error occurred. Please try again later.';
                }
            } else {
                errors.value = 'An unexpected error occurred. Please try again later.';
            }
        } finally {
            isLoaded.value = true;
        }
    };

    function updateRow(updatedUser) {
        const index = collection.value.findIndex(user => user.id == updatedUser.id);
        
        if (index != -1) {
            collection.value[index] = updatedUser;
        }
    }

    function addRow(newUser) {
        collection.value.push(newUser);
    }

    function deleteRow(deleteUser) {
        const index = collection.value.findIndex((user) => user.id === deleteUser);
        if (index !== -1) {
            collection.value.splice(index, 1);
        }
    }
</script>
