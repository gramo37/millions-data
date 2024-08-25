import { useCallback, useEffect, useRef, useState } from "react";

interface UseWorker<TInput, TOutput> {
  workerResult: TOutput | null;
  postMessage: (message: TInput) => void;
}

function useWorker<TInput, TOutput>(
  workerUrl: string
): UseWorker<TInput, TOutput> {
  const workerRef = useRef<Worker | null>(null);
  const [workerResult, setWorkerResult] = useState<TOutput | null>(null);

  useEffect(() => {
    // Initialize the Web Worker
    workerRef.current = new Worker(workerUrl);

    // Handle messages from the worker
    workerRef.current.onmessage = (e: MessageEvent<TOutput>) => {
      setWorkerResult(e.data);
    };

    // Cleanup: Terminate the worker when the component unmounts
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [workerUrl]);

  // Function to send data to the worker
  const postMessage = useCallback((message: TInput) => {
    if (workerRef.current) {
      workerRef.current.postMessage(message);
    }
  }, []);

  return { workerResult, postMessage };
}

export default useWorker;
