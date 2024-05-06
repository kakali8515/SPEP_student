// @ts-check

import { ref } from "vue";

export const useAudioRecorder = (stopRecordingCallback) => {
  const mediaRecorder = ref(null);
  let stream;
  const audioChunks = ref([]);
  const audioElement = ref(null);
  const isAudioRecording = ref(false);

  const isAudioRecorded = ref(false);

  const reset = () => {
    audioChunks.value = [];
    mediaRecorder.value = null;
  };

  const startAudioRecording = () => {
    reset();
    // startRecording();
    navigator.mediaDevices
      .getUserMedia({
        audio: { sampleRate: 44100, channelCount: 2 },
      })
      .then((mediaStream) => {
        stream = mediaStream;
        mediaRecorder.value = new MediaRecorder(mediaStream);
        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.value.push(event.data);
        };

        mediaRecorder.value.onstop = () => {
          const audioBlob = new Blob(audioChunks.value, { type: "audio/mp3" });
          audioElement.value = audioBlob;

          //   onUploadRecordFile(audioElement.value, "audio");
          if (typeof stopRecordingCallback === "function") {
            stopRecordingCallback(audioElement.value);
          }

          stream.getTracks().forEach((track) => track.stop());
        };
        mediaRecorder.value.start();
        isAudioRecording.value = true;
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  // Function to stop recording
  const stopAudioRecording = () => {
    if (mediaRecorder.value && isAudioRecording.value) {
      mediaRecorder.value.stop();
      isAudioRecording.value = false;
      //   stopRecording();
    }
  };

  return {
    isAudioRecording,
    audioElement,
    startAudioRecording,
    stopAudioRecording,
  };
};
