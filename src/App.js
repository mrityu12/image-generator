import React from 'react';
import ImageGenerator from './components/ImageGenerator';
import './App.css';

/**
 * Main App Component
 * Renders the Image Generator application
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Generator</h1>
        <p>Generate placeholder images with custom dimensions</p>
      </header>
      <main>
        <ImageGenerator />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 Anslation LLC - Front End Developer Project</p>
      </footer>
    </div>
  );
}

export default App;