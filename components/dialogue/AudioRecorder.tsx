import React, { useState, FC } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import { PiRecordFill } from "react-icons/pi";
import { FiEdit } from 'react-icons/fi';

type AudioRecorderProps = {
  sendNewMessage: (isSelf: boolean, message: string) => void;
  ghost?: string;
  updateGhost: (ghost: string) => void;
};

const AudioRecorder: FC<AudioRecorderProps> = (props) => {
  const { sendNewMessage, ghost, updateGhost } = props;
  const [recorder] = useState(new MicRecorder({ bitRate: 128 }));
  const [selfRecorded, setSelfRecorded] = useState<boolean>(false);
  const [partRecorded, setPartRecorded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelfButton = () => {
    if (selfRecorded) {
      setSelfRecorded(!selfRecorded);
      stopRecording(true);
    } else {
      setSelfRecorded(!selfRecorded);
      startRecording();
    }
  };
  const handlePartButton = () => {
    if (partRecorded) {
      setPartRecorded(!partRecorded);
      stopRecording(false);
    } else {
      setPartRecorded(!partRecorded);
      startRecording();
    }
  };
  const startRecording = () => {
    recorder.start().then(() => {
      setError(null);
    }).catch((e: any) => {
      setError('Microphone access is required.');
      console.error(e);
    });
  };

  const stopRecording = (isSelf: boolean) => {
    recorder.stop().getMp3().then(async ([buffer, blob]: [ArrayBuffer[], Blob]) => {
      const file = new File(buffer, 'recording.mp3', { type: blob.type });
      const formData = new FormData();
      formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to upload');
        }
        const data = await response.json();
        sendNewMessage(isSelf, data.url);
    }).catch((e: any) => {
      setError('Recording failed.');
      console.error(e);
    });
  };

  return (
    <div className='flex flex-col gap-1 justify-center items-center'>
      {error &&
        <div className='p-2 px-8 bg-red-100 rounded border-red-400 border w-full'>
          <p className='text-red-500'>{error}</p>
        </div>
      }
      {ghost != null && (
        <div className="flex flex-row justify-center gap-4">
          <button
            className='flex items-center justify-center gap-3 bg-white p-4 rounded border shadow-lg'
            onClick={partRecorded ? () => { } : handleSelfButton}
          >
            <PiRecordFill className='text-2xl text-yellow-600' />
            {selfRecorded ? 'Stop Recording' : 'Record as True Self'}
          </button>
          <button
            className='flex items-center justify-center gap-3 bg-white p-4 rounded border shadow-lg'
            onClick={selfRecorded ? () => { } : handlePartButton}
          >
            <PiRecordFill className='text-2xl text-yellow-600' />
            {partRecorded ? 'Stop Recording' : 'Record as '}{ghost}
          </button>
        </div>
      )}
      {ghost == null && (
        <div className='p-2 px-8 bg-red-100 rounded border-red-400 border w-full'>
          <p className='text-red-500'>Please create Title</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
