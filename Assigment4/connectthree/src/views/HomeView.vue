<template>
  <div class="grid grid-rows-2 grid-cols-2 h-full w-full p-3 gap-4">
    <router-link to="/" class="w-full h-full border border-gray-900 rounded-lg flex text-white bg-gray-800 hover:bg-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="m-auto w-auto" stroke="#FFF" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
      <span class="text-8xl font-bold mr-auto mt-auto mb-auto w-1/2 text-center">Home</span>
    </router-link>  
    <router-link to="/game" class="w-full h-full border border-gray-900 rounded-lg flex text-white bg-gray-800 hover:bg-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="m-auto w-auto" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon></svg>      
      <span class="text-8xl font-bold mr-auto mt-auto mb-auto w-1/2 text-center">Play</span>
    </router-link>  
    <router-link to="/scoreboard" class="w-full h-full border border-gray-900 rounded-lg flex text-white bg-gray-800 hover:bg-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="m-auto w-auto" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
      <span class="text-8xl font-bold mr-auto mt-auto mb-auto w-1/2 text-center">Score</span>
    </router-link>  
    <router-link to="/profile" class="w-full h-full border border-gray-900 rounded-lg flex text-white bg-gray-800 hover:bg-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="m-auto w-auto" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      <span class="text-8xl font-bold mr-auto mt-auto mb-auto w-1/2 text-center">Profile</span>
    </router-link>  
  </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style>

</style>