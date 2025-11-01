// 代码生成时间: 2025-11-01 14:31:12
import Vue from 'vue';
import { SpeechSynthesis } from './services/speechSynthesisService';

// VoiceSynthesisComponent.vue
<template>
  <div>
    <input v-model="textToSpeak" type="text" placeholder="Type something..."/>
    <button @click="synthesizeSpeech">Speak</button>
    <button @click="stopSpeech">Stop</button>
  </div>
</template>

<script lang="ts">
export default Vue.extend({
  data() {
    return {
      textToSpeak: ''
    };
  },
  methods: {
    async synthesizeSpeech() {
      if (!this.textToSpeak) {
        throw new Error('No text provided to synthesize speech.');
      }
      try {
        await SpeechSynthesis.synthesize(this.textToSpeak);
      } catch (error) {
        console.error('Error synthesizing speech:', error);
      }
    },
    stopSpeech() {
      SpeechSynthesis.cancel();
    },
  },
  mounted() {
    // Initialization logic if needed
  },
});
</script>

// services/speechSynthesisService.ts
import { SpeechSynthesisUtterance, SpeechSynthesisEvent } from './SpeechSynthesisUtterance';

export class SpeechSynthesis {
  private static utterance: SpeechSynthesisUtterance;

  static async synthesize(text: string): Promise<void> {
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.onend = this.onEndEvent;
    this.utterance.onerror = this.onErrorEvent;
    window.speechSynthesis.speak(this.utterance);
  }

  static cancel(): void {
    if (this.utterance) {
      this.utterance.onend = null;
      this.utterance.onerror = null;
      window.speechSynthesis.cancel(this.utterance);
    }
  }

  private static onEndEvent(event: SpeechSynthesisEvent): void {
    console.log('Speech synthesis ended', event);
  }

  private static onErrorEvent(event: SpeechSynthesisEvent): void {
    console.error('Speech synthesis error', event);
  }
}

// models/SpeechSynthesisUtterance.ts
export interface SpeechSynthesisUtterance {
  new(text: string): SpeechSynthesisUtterance;
  text: string;
  onend: (event: SpeechSynthesisEvent) => void;
  onerror: (event: SpeechSynthesisEvent) => void;
}

export interface SpeechSynthesisEvent {
  charIndex: number;
  elapsedTime: number;
  errorCode: number;
  error: string;
}
