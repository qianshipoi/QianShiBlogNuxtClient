export const useLayout = () => {
  const layout = ref<"default" | "mobile">("default")
  const { width } = useWindowSize()
  const MOBILD_MAX_WIDTH = 850;

  watch(() => width.value, (newVal) => {
    layout.value = newVal < MOBILD_MAX_WIDTH ? "mobile" : "default"
  }, { immediate: true })

  console.log(process);

  // watch(() => layout.value, (newVal) => setPageLayout(newVal))

  watchEffect(() => {
    if (process.client) {
      setPageLayout(layout.value)
    }
  })

  onMounted(() => {
    layout.value = width.value < MOBILD_MAX_WIDTH ? "mobile" : "default"
  })

  return {

  }
}
