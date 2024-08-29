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
            <UserEdit :editID='user.id' @update-row="handleUpdate" @show-alert="handleAlert"></UserEdit>
            <!-- <span class="px-4">│</span> -->
            <UserReset :resetID='user.id' @show-alert="handleAlert"></UserReset>
            <UserDelete :deleteID='user.id' @delete-row="handleDelete" @show-alert="handleAlert"></UserDelete>
        </td>
    </tr>
</template>

<script setup>
    import UserEdit from './UserEdit.vue';
    import UserDelete from './UserDelete.vue';
    import UserReset from './UserReset.vue';

    defineProps({
        user: Object
    });

    const emit = defineEmits(['update-row', 'delete-row', 'show-alert']);

    function handleUpdate(updatedUser) {
        emit('update-row', updatedUser);
    }

    function handleDelete(deletedUser) {
        emit('delete-row', deletedUser);
    }

    function handleAlert(alertDetails) {
        emit('show-alert', alertDetails);
    }
</script>