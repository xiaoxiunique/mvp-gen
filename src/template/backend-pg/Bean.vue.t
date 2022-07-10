<template>
  <div class='q-ma-md'>
    <h4 class='text-bold q-mt-none' style='margin-bottom: 2rem'>Wallet</h4>

    <div>
      <Table ref='tb'
             v-model:pagination='app.pagination'
             :columns='cols'
             :rows='app.list'
             :row-key='row=>row.id'
             :loading='app.loading'
             class='q-my-md'
             @request='app.handleOnRequest'
      >
        <template v-slot:top-left>
          <TableFilterTips
            :fp='app.fetchParams'
            @remove='
              (key) => {
                app.fetchParams[key] = null;
                app.fetch();
              }
            '
          />
        </template>
        <template v-slot:top-right>
          <q-btn icon='refresh' dense flat @click='app.fetch()'></q-btn>
          <TableFilter @fetch='app.fetch()' @reset='app.resetForm() && app.fetch()'>
            <template v-slot:default>
              <div class='q-gutter-y-md'>
                <q-input v-model.trim='app.fetchParams["address"]' outlined dense label='Address'></q-input>
              </div>
            </template>
          </TableFilter>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useTableData } from '@/hooks';
import { useField } from '@/hooks/useField';
import Table from '@/components/Table/Table.vue';
import TableFilter from '@/components/Table/TableFilter.vue';
import TableFilterTips from '@/components/Table/TableFilterTips.vue';
import { <$ model.Name $> } from '@/api/<$ model.controllerName $>';

const tb = ref();
const app = ref(useTableData({ requester: new <$ model.Name $>(), fp: {} }));

const cols = useField(['blockchain', 'address', 'isWhale', 'discordId', 'twitterId', 'verified', 'balance'], {
  // Action: {
  //   render: (h: (...pros) => unknown, { row }: { row: <$ model.Name $>Schema }) => {
  //     return [
  //     ];
  //   }
  // }
}, []);


</script>