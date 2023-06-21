import React, { useState, useRef, useContext } from "react";
import { HyButton, HyIcon, HyText, HyToggle } from "../..";
import styles from "./verify.module.css";
import { AuthContext } from "../../pages/_app";
import Layout from "../../Layout";

import { updateDocByCollection } from "../../lib/endpoints";

import { storage } from "../_app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Verify() {
  const useAuthContext = useContext(AuthContext);

  const { currentUser } = useAuthContext;

  const [selectedPassport, setSelectedPassport] = useState<string | null>();
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [passportFormatUpload, setPassportFormatUpload] = useState<File>();
  const [photoFormatUpload, setPhotoFormatUpload] = useState<
    Blob | ArrayBuffer | Uint8Array
  >();
  const [url1, setUrl1] = useState(null);
  const [step, setStep] = useState(1);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<any>();
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const handleStartCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      mediaStreamRef.current = mediaStream;
      setCameraOpen(true);
    } catch (error) {
      console.log("Error accessing webcam:", error);
    }
  };

  const handleStopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      setCameraOpen(false);
    }
  };

  const handleToggleCamera = () => {
    if (isCameraOpen) handleStopCamera();
    else handleStartCamera();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string" || reader.result === null) {
        setSelectedPassport(reader.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context &&
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    canvas.toBlob((blob: any) => {
      // Crée un objet File à partir du blob
      const file = new File([blob], "capturedImage.png", { type: "image/png" });

      // Utilise l'objet File comme nécessaire (par exemple, pour l'envoyer via un formulaire ou l'enregistrer dans Firebase Storage)
      console.log(file);

      // Met à jour l'état ou effectue toute autre action requise avec le fichier
      setPhotoFormatUpload(file);
    }, "image/png");

    const capturedImage = canvas.toDataURL("image/png");

    setSelectedPhoto(capturedImage);
  };

  const handleFileUpload = () => {
    if (!passportFormatUpload || !photoFormatUpload) return;
    if (!selectedPassport && !selectedPhoto) {
      alert("Please choose a file first!");
    }
    const storageRefPassport = ref(
      storage,
      `/files/${currentUser.id}_passport`
    );

    const uploadTaskPassport = uploadBytesResumable(
      storageRefPassport,
      passportFormatUpload
    );

    const storageRefPhoto = ref(storage, `/files/${currentUser.id}_photo`);
    const uploadTaskPhoto = uploadBytesResumable(
      storageRefPhoto,
      photoFormatUpload
    );

    uploadTaskPassport.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTaskPassport.snapshot.ref).then((url) => {
          const updateData = {
            passport: url,
          };
          updateDocByCollection("users", updateData, currentUser.id);
          console.log(url);
        });
      }
    );

    uploadTaskPhoto.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url

        getDownloadURL(uploadTaskPhoto.snapshot.ref).then((url) => {
          const updateData = {
            photo: url,
          };
          updateDocByCollection("users", updateData, currentUser.id);
          console.log(url);
        });
      }
    );
  };

  return (
    <Layout>
      <div className={styles.verifypage}>
        {step === 1 && (
          <div className={styles.identity}>
            <div className={styles.content}>
              <HyText variant="title">Piece d'identité</HyText>
              <input type="file" accept=".png" onChange={handleImageChange} />
              {selectedPassport && (
                <>
                  <HyIcon icon={selectedPassport} size="350" />
                </>
              )}
            </div>
            <div>
              <HyButton
                isDisabled={!selectedPassport}
                onClick={() => {
                  setStep(2);
                }}
              >
                Continuer
              </HyButton>
              <HyText classes={styles.step}>{step}/2</HyText>
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            <div className={styles.identity}>
              <HyText variant="title">Photo</HyText>
              <HyToggle
                value={isCameraOpen}
                setValue={handleToggleCamera}
                label="Ouvrir la camera"
              />
              <HyButton onClick={handleCapture}>Prendre une photo</HyButton>
              <video ref={videoRef} autoPlay muted />
            </div>
            <div className={styles.identity}>
              {selectedPhoto && <HyIcon icon={selectedPhoto} size="350" />}
              <HyButton onClick={handleFileUpload}>Envoyer</HyButton>
              <HyText classes={styles.step}>{step}/2</HyText>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Verify;
