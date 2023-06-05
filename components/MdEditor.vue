<template>
  <ClientOnly fallback-tag="span" fallback="Loading comments...">
    <VueMarkdownEditor ref="editor" :disabled-menus="[]" v-model="content" height="500px" @change="handleChange" />
  </ClientOnly>
</template>

<script setup lang='ts'>
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

type Props = {
  modelValue: string,
  height?: string,
  placeholder?: string
}

interface EmitEvent {
  (e: 'update:modelValue', params: string): void
}

const props = withDefaults(defineProps<Props>(), {
  height: '500px',
  placeholder: '请输入内容'
})
const emit = defineEmits<EmitEvent>()

const editor = ref()

const content = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})

const handleChange = (text: string, html: string) => {

}

defineExpose({
  getHtml: () => {
    return xss.process(VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content.value));
  }
})
</script>

<style>
</style>
