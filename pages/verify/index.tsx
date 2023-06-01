import React, { useState, useRef } from "react";
import { HyButton, HyIcon, HyText } from "../..";
import styles from "./verify.module.css";

function Verify() {
  const [selectedPassport, setSelectedPassport] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const handleStartCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      mediaStreamRef.current = mediaStream;
    } catch (error) {
      console.log("Error accessing webcam:", error);
    }
  };

  const handleStopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedPassport(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const capturedImage = canvas.toDataURL("image/png");
    setSelectedPhoto(capturedImage);
  };

  const handleSendPassport = () => {
    console.log("on envoie chef");
  };

  return (
    <>
      <div className={styles.verifypage}>
        <div className={styles.identity}>
          <HyText>Piece d'identité</HyText>
          <input type="file" accept=".png" onChange={handleImageChange} />
          {selectedPassport && <HyIcon icon={selectedPassport} size="56" />}
        </div>
        ET
        <div className={styles.identity}>
          <button onClick={handleStartCamera}>Ouvrir la webcam</button>
          <button onClick={handleStopCamera}>Arrêter la webcam</button>
          <button onClick={handleCapture}>Prendre une photo</button>
          <video ref={videoRef} autoPlay muted />
          {selectedPhoto && <HyIcon icon={selectedPhoto} size="56" />}
        </div>
      </div>
      <HyButton onClick={handleSendPassport}>Envoyer</HyButton>
    </>
  );
}

export default Verify;
