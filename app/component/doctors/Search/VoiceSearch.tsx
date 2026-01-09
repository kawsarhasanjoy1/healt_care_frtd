import { useEffect } from "react";
import toast from "react-hot-toast";
import { LuMic, LuMicOff } from "react-icons/lu";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceSearch = ({ setFilters }: {setFilters: any}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setFilters((prev: any) => ({ ...prev, searchTerm: transcript }));
    }
  }, [transcript]);

  const handleVoiceSearch = () => {
    if (!browserSupportsSpeechRecognition) {
      return toast.error("Your browser does not support speech recognition.");
    }

    SpeechRecognition.startListening({
      continuous: false,
      language: "bn-BD",
    });
  };

  return (
    <div
      onClick={listening ? SpeechRecognition.stopListening : handleVoiceSearch}
      className={`  p-2 rounded-full cursor-pointer transition-all ${
        listening
          ? "bg-red-100 text-red-600 animate-pulse"
          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
      }`}
      title={listening ? "Stop Listening" : "Search with your voice"}
    >
      {listening ? <LuMicOff size={25} /> : <LuMic size={25} />}
    </div>
  );
};


export default VoiceSearch