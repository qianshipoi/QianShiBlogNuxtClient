import VueMarkdownEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';
// import '@kangc/v-md-editor/lib/plugins/tip/tip.css';

import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';

import Prism from 'prismjs'

VueMarkdownEditor
  .use(vuepressTheme, {
    Prism,
  })
  .use(createEmojiPlugin())
  .use(createCopyCodePlugin())
  .use(createAlignPlugin());

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMarkdownEditor);
});
