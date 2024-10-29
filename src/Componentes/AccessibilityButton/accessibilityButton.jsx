import React, { useState } from 'react';
import './styles.css';
import accessibilityIcon from "../../Assets/Imagens/Accessibility.png";

const AccessibilityButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const increaseFontSize = () => {
    document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, input, textarea').forEach(el => {
      const currentSize = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${currentSize + 2}px`;
    });
  };

  const decreaseFontSize = () => {
    document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, input, textarea').forEach(el => {
      const currentSize = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = `${currentSize - 2}px`;
    });
  };

  const toggleReadableFont = () => {
    document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, input, textarea').forEach(el => {
      el.classList.toggle('readable-font');
    });
  };

  const toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
  };

  const toggleNegativeContrast = () => {
    document.body.classList.toggle('negative-contrast');
  };

  const toggleGrayScale = () => {
    document.body.classList.toggle('grayscale');
  };


  const resetAccessibility = () => {
    // Remove all accessibility classes from the body
    document.body.classList.remove('high-contrast', 'negative-contrast', 'grayscale');
    
    // Reset font sizes
    document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, input, textarea').forEach(el => {
      el.style.fontSize = ''; // Reset font size to default
    });
    
    // Remove readable font class
    document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, input, textarea').forEach(el => {
      el.classList.remove('readable-font');
    });

  };

  return (
    <div className="accessibility-container">
      <button className="accessibility-toggle" onClick={toggleMenu} title="Ferramentas de Acessibilidade">
        {isMenuOpen ? (
          <img src={accessibilityIcon} alt="Accessibility Icon" className="icon-accessibility" /> // Ícone "x" para quando o menu estiver aberto
        ) : (
          <img src={accessibilityIcon} alt="Accessibility Icon" className="icon-accessibility" /> // Ícone de acessibilidade para quando o menu estiver fechado
        )}
      </button>
      {isMenuOpen && (
        <div className="accessibility-menu">
          <h3 className="accessibility-title">Ferramentas de Acessibilidade</h3>
          <button onClick={increaseFontSize}>Aumentar Texto</button>
          <button onClick={decreaseFontSize}>Diminuir Texto</button>
          <button onClick={toggleReadableFont}>Fonte Legivel</button>
          <button onClick={toggleHighContrast}>Alto Contraste</button>
          <button onClick={toggleNegativeContrast}>Contraste Negativo</button>
          <button onClick={toggleGrayScale}>Tons de Cinza</button>
          <button onClick={resetAccessibility}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export { AccessibilityButton };
