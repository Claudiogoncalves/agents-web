/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Navigate, useParams } from 'react-router-dom'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()

  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  function onStopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }
  }

  async function uploadAudio(audioBlob: Blob) {
    const formData = new FormData()

    formData.append('file', audioBlob, 'audio.webm')

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()
    console.log('Audio uploaded successfully:', result)
  }

  async function onStartRecording() {
    if (!isRecordingSupported) {
      alert('Gravação de áudio não é suportada neste navegador.')
      return
    }
    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
        const url = URL.createObjectURL(event.data)
        const audioElement = new Audio(url)
        audioElement.play()
        console.log('Gravação concluída', event.data)
      }
      setIsRecording(false)
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada')
    }

    recorder.current.onstop = () => {
      console.log('Gravação parada')
    }

    recorder.current.start()
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button
          className="w-40"
          onClick={onStopRecording}
          variant="destructive"
        >
          Parar gravacao
        </Button>
      ) : (
        <Button className="w-40" onClick={onStartRecording} variant="default">
          Gravar audio
        </Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>Pressione o botão para gravar</p>}
    </div>
  )
}
