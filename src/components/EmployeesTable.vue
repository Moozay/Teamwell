<script setup>
import { ref,computed } from "vue";
import { useQuery } from "vue-query";
import { createDirectus, rest, readItems, staticToken } from "@directus/sdk";
import ActiveChip from './chips/ActiveChip.vue'
import InactifChip from './chips/InactiveChip.vue'
import InvitedChip from './chips/InvitedChip.vue'
import moment from 'moment';
import 'moment/dist/locale/fr';

moment.locale('fr');

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_ENDPOINT;
const TOKEN_BEARER = import.meta.env.VITE_TOKEN_BEARER;

const client = createDirectus(BACKEND_ENDPOINT).with(staticToken(TOKEN_BEARER)).with(rest());

const fetchEmployees = async () => {
  try {
    return await client.request(
      readItems("employees", {
        fields: [
          "user.first_name",
          "user.last_name",
          "user.email",
          "user.status",
          "current_contract.entry_date",
          "position.positions_id.name",
          "position.positions_id.department.name"
        ],
      })
    );
    
  } catch (error) {
    console.log(error);
  }
};


const convertDateEngToFr = (inputDate) => {
  const parsedDate = moment(inputDate, 'YYYY-MM-DD');
  const formattedDate = parsedDate.locale('fr').format('D MMMM YYYY');
  return formattedDate;
}

const findDifferenceOfDates = (inputDate) => {
  const startDate = new Date(inputDate);
  const currentDate = new Date();
  let monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
  monthsDiff -= startDate.getMonth() + 1;
  monthsDiff += currentDate.getMonth() + 1;

  const years = Math.floor(monthsDiff / 12);
  const months = monthsDiff % 12;

  if(years == 0)return `${months} mois`
  else return `${years} ans et ${months} mois`;
}

function useEmployeessQuery() {
  return useQuery("employees", fetchEmployees);
}

defineProps({
  msg: String,
});
const { isLoading, isError, data, error } = useEmployeessQuery();
console.log(data.value);
const count = ref(0);
</script>

<template>
  <div style="height: 80vh" class="relative overflow-x-auto mt-10 ">
    <table
      class="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-10/12 mx-auto shadow-xl"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-5 dark:text-gray-400 sticky top-0 bg-white"
      >
        <tr>
          <th scope="col" class="px-6 py-3">NOM</th>
          <th scope="col" class="px-6 py-3">TITRE</th>
          <th scope="col" class="px-6 py-3">RESPONSABLE</th>
          <th scope="col" class="px-6 py-3">DEPARTEMENT</th>
          <th scope="col" class="px-6 py-3">DEBUT CONTRAT</th>
          <th scope="col" class="px-6 py-3">STATUT</th>
        </tr>
      </thead>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="isError">An error has occurred: {{ error }}</div>

        <tbody v-else-if="data">
          <tr v-for="employee in data" class="bg-white border-b dark:border-gray-700">
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-emerald"
            >
              <div class="flex items-center">
                <img
                  class="mr-3 w-10 h-10 rounded-full"
                  src="https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg"
                  alt="Rounded avatar"
                />
                <div class="flex flex-col">
                  <p class="font-bold">{{employee.user.first_name}} {{employee.user.last_name}}</p>
                  <p>{{employee.user.email}}</p>
                
                </div>
              </div>
            </td>
            <td class="px-6 py-4" v-if="employee.position.length > 0">
              <div class="flex flex-col">
                <p class="font-bold" >{{employee.position[0].positions_id.name}}</p>
                <p>{{employee.position[0].positions_id.department.name}}</p>
              </div>
            </td>
            <td class="px-6 py-4" v-else>
              <div class="flex flex-col">
                <p class="font-weight-bold" >Null</p>
                <p>Null</p>
              </div>
            </td>
            <td class="px-6 py-4">David Peter</td>
            <td class="px-6 py-4" v-if="employee.position.length > 0 ">{{employee.position[0].positions_id.department.name}}</td>
            <td class="px-6 py-4" v-else>Null</td>
            <td class="px-6 py-4">
              <div class="flex flex-col">
                <p class="font-weight-bold">{{convertDateEngToFr(employee.current_contract.entry_date)}}</p>
                <p>{{findDifferenceOfDates(employee.current_contract.entry_date)}}</p>
              </div>
            </td>
            <td class="px-5 py-4" v-if="employee.user.status == 'active'">
              <ActiveChip/>
            </td>
            <td class="px-5 py-4" v-else-if="employee.user.status == 'invited'">
              <InvitedChip/>
            </td>
            <td class="px-5 py-4" v-else>
              <InactifChip/>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
