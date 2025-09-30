// 代码生成时间: 2025-09-30 17:21:34
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FileSyncTool',
  setup() {
    const selectedFile = ref<File | null>(null);
    const destinationPath = ref('');
    const errorMessage = ref('');

    const loadFile = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        selectedFile.value = input.files[0];
      } else {
        errorMessage.value = 'Failed to load file.';
      }
    };

    const backupFile = async () => {
      try {
        if (!selectedFile.value || !destinationPath.value) {
          throw new Error('Please select a file and specify a destination path.');
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (content) {
            const fs = require('fs');
            const path = require('path');
            fs.writeFileSync(path.join(destinationPath.value, selectedFile.value.name), content);
          }
        };
        reader.onerror = () => {
          throw new Error('Error reading the file.');
        };
        reader.readAsText(selectedFile.value);
        errorMessage.value = '';
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return {
      selectedFile,
      destinationPath,
      errorMessage,
      loadFile,
      backupFile
    };
  }
});
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
