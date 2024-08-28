<template>
    <tr class="border-b bg-neutral-800 border-neutral-500">
        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white text-center">
            {{ user.id }}
        </th>
        <td class="px-6 py-4"> 
            {{ user.name }}
        </td>
        <td class="px-6 py-4"> 
            {{ user.email }}
        </td>
        <td class="px-6 py-4 text-center flex items-center gap-x-4 justify-center">
            <UserEdit :editID='user.id' @update-row="handleUpdate"></UserEdit>
            <!-- <span class="px-4">│</span> -->
            <button class="group relative inline-block flex hover:underline p-3 bg-orange-500 text-gray-800 rounded-xl hover:bg-orange-400 duration-300 z-10">
                <IconReset class="w-5 h-5"></IconReset>
                <span class="absolute hidden group-hover:flex right-1/2 -bottom-[2px] translate-y-full translate-x-1/2 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700 z-20 whitespace-nowrap">Reset Password</span>
            </button>
            <UserDelete :deleteID='user.id' @delete-row="handleDelete"></UserDelete>
            <!-- <button class="group relative inline-block flex hover:underline p-3 bg-red-500 text-white rounded-xl hover:bg-red-400 duration-300 z-10">
                <IconTrash class="w-5 h-5"></IconTrash>
                <span class="absolute hidden group-hover:flex right-1/2 -bottom-[2px] translate-y-full translate-x-1/2 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:bottom-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-t-transparent after:border-b-gray-700 z-20">Delete</span>
            </button> -->
        </td>
    </tr>
</template>

<script setup>
    import IconTrash from '@/components/icons/IconTrash.vue';
    import IconReset from '@/components/icons/IconReset.vue';
    import UserEdit from './UserEdit.vue';
    import UserDelete from './UserDelete.vue';

    defineProps({
        user: Object
    });

    const emit = defineEmits(['update-row', 'delete-row']);

    function handleUpdate(updatedUser) {
        emit('update-row', updatedUser);
    }

    function handleDelete(deletedUser) {
        emit('delete-row', deletedUser);
    }
</script>