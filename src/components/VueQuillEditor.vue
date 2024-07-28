<template>
  <quill-editor
    v-model:value="content"
    :options="state.editorOption"
    @change="onEditorChange"
  />
</template>

<script setup>
import { onMounted, reactive, toRefs, watch } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const state = reactive({
  content: props.modelValue,
  editorOption: {
    placeholder: "내용을 입력해주세요...", // placeholder 설정
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
      ],
    },
    // more options
  },
});

// reactive안의 속성을 사용하기 위한 구조분해 할당
const { content } = toRefs(state);

function onEditorChange({ quill, html, text }) {
  emit('update:modelValue', html); // html로 하니가 거꾸로 써지는건 방지 됨
}

// v-model 바인딩 한 content가 바뀌면 감지하여 content에 넣기
watch(() => props.modelValue, (newValue) => {
  state.content = newValue;
});

// 마운트 할 때 v-model 바인딩 한 content가 있으면 content에 넣기
onMounted(() => {
  state.content = props.modelValue || ""; // modelValue가 없으면 빈 문자열로 설정
});

</script>

<style scoped>
.ql-container {
  height: 400px;
}
.ql-editor {
  height: 500px;
  overflow: scroll;
  overflow-x: hidden;
}
</style>