<script setup lang="ts">
const colorMode = useColorMode()
function toggleDark() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <NButton
    btn="ghost-gray square"
    aria-label="Toggle dark mode"
    @click="toggleDark()"
  >
    <NIcon
      name="i-heroicons-sun-20-solid dark:i-heroicons-moon-20-solid"
    />
  </NButton>
</template>
