// 代码生成时间: 2025-10-17 22:12:35
import Vue from 'vue';

// 引入OCR库，这里以tesseract.js为例
import Tesseract from 'tesseract.js';

// OCRApp 是一个Vue组件，负责执行OCR文字识别功能
export default Vue.extend({
  name: 'OCRApp',
  data() {
    return {
      // 图片的base64编码字符串
      imageBase64: '',
      // 识别结果显示
      recognizedText: '',
      // 错误信息
      errorMessage: '',
    };
  },
  methods: {
    // 处理文件上传
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        this.errorMessage = 'No file selected';
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageBase64 = e.target.result as string;
        this.recognizeText();
      };
      reader.onerror = (error) => {
        this.errorMessage = 'File read error: ' + error.message;
      };
      reader.readAsDataURL(file);
    },
    // 执行OCR识别
    async recognizeText() {
      try {
        if (!this.imageBase64) {
          throw new Error('No image to process');
        }
        const { data: { text } } = await Tesseract.recognize(
          this.imageBase64,
          'eng',
          { logger: m => console.log(m) }
        );
        this.recognizedText = text.trim();
        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = 'OCR error: ' + error.message;
      }
    }
  },
  mounted() {
    // 组件挂载后，可以在这里进行初始化操作
  }
});
