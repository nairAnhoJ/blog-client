<template>
    <div class="overflow-x-hidden">
        <div class="text-white p-6 min-h-[calc(100vh-64px)]">
            <div class="w-full flex items-center justify-between">
                <UserAdd></UserAdd>
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
                        <UserTable v-for="user in collection" :key="user.id" :user="user"></UserTable>
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
    // Imports

    // Variables
        const collection = ref([]);
        const isLoaded = ref(false);
        const pagination = ref({ links: {}, meta: {} });
    // Variables

    onMounted(async () => {
        try {
            const response = await usersIndex();
            collection.value = response.data.data
            pagination.value = {
                links: response.data.links,
                meta: response.data.meta
            };
        } catch (error) {
            console.error("Error fetching collection:", error);
        }finally{
            isLoaded.value = true;
        }
    });

    const fetchCollection = async (url) => {
        isLoaded.value = false;
        collection.value = [];
        if (!url) return;
        try {
            let response = await axios.get(url);
            collection.value = response.data.data; // Extracting transaction data
            pagination.value = {
                links: response.data.links,
                meta: response.data.meta
            };
        } catch (error) {
            console.error('Error loading page:', error);
        }finally{
            isLoaded.value = true;
        }
    };
</script>
