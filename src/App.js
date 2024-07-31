import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import song from './song.mp3';

// Función para importar todas las imágenes
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./imagenes', false, /\.(jpg|jpeg)$/));

// Ordenar las imágenes de manera ascendente basándose en el nombre
const sortImages = (images) => {
  return images.sort((a, b) => {
    const numA = parseInt(a.split('/').pop().match(/\d+/)[0], 10);
    const numB = parseInt(b.split('/').pop().match(/\d+/)[0], 10);
    return numA - numB;
  });
};

const sortedImages = sortImages(images);

// Función para barajar un array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Barajar imágenes
const shuffledImages = shuffleArray(sortedImages);

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Función para manejar errores de carga de imágenes
  const handleError = (event) => {
    // Usa una imagen de fallback en caso de error
    event.target.src = 'path/to/default-image.jpg'; // Ruta a una imagen por defecto
  };

  // Función para avanzar a la siguiente imagen
  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
  };

  useEffect(() => {
    const interval = setInterval(showNextImage, 2000); // Cambia la imagen cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);

    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
    };
  }, []);

  // Genera 10 corazones
  const hearts = Array.from({ length: 10 }, (_, i) => <div key={i} className="heart"></div>);

  return (
    <div className="App">
      {hearts}
      <header className={`App-header ${isAudioPlaying ? 'visible' : 'invisible'}`}>
        <h1 className="animated-heading">
          {Array.from("¡Felices 26 meses!").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </h1>

        <p className="custom-message">
          como dijo un rarito por ahi, Me gustaría pasar el resto de mis días con alguien que no me necesite para nada, pero que me quiera en todo.
        </p>
      </header>
      <div className={`media-container ${isAudioPlaying ? 'visible' : 'invisible'}`}>
        <img
          src={shuffledImages[currentImageIndex]}
          alt={`img${currentImageIndex}`}
          onError={handleError}
        />
      </div>
      <audio
        className="audio-player"
        controls
        autoPlay
        ref={audioRef}
        style={{ opacity: isAudioPlaying ? 0 : 1 }} // Estilo para el reproductor de audio
      >
        <source src={song} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;
