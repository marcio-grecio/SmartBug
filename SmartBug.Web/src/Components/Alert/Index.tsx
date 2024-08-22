import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, LucideIcon } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  title?: string; // Tornar o título opcional
  message: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  duration?: number;
  onClose?: () => void;
  width?: string; // Largura do alert
  titleSize?: string; // Tamanho da fonte do título
  messageSize?: string; // Tamanho da fonte da mensagem
  iconSize?: string; // Tamanho do ícone
  showProgress?: boolean; // Controle para exibir ou não a barra de progresso
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  position = 'top-right',
  duration = 5000,
  onClose,
  width = '400px',
  titleSize = '1.25rem', // 20px
  messageSize = '1rem', // 16px
  iconSize = '22px', // 24px
  showProgress = false, // Barra de progresso desabilitada por padrão
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (showProgress) {
      const intervalTime = 20; // Intervalo menor para animação mais suave
      const decrement = 100 / (duration / intervalTime); // Calcula o decremento para cada intervalo

      const interval = setInterval(() => {
        setProgress(prev => {
          const nextValue = prev - decrement;
          return nextValue > 0 ? nextValue : 0;
        });
      }, intervalTime);

      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [duration, onClose, showProgress]);

  if (!visible) return null;

  const typeStyles = {
    error: 'bg-red-200 border-red-300 text-red-800',
    success: 'bg-green-200 border-green-300 text-green-800',
    warning: 'bg-yellow-200 border-yellow-300 text-yellow-800',
    info: 'bg-blue-200 border-blue-300 text-blue-800',
  };

  const icons: { [key in AlertProps['type']]: LucideIcon } = {
    error: AlertCircle,
    success: CheckCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const IconComponent = icons[type];

  const positionStyles = {
    'top-left': 'top-3 left-4',
    'top-right': 'top-3 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={`alert flex flex-col ${typeStyles[type]} p-3 rounded border-b-2 ${positionStyles[position]} fixed z-9999`}
      style={{ width: width }}
    >
      <div className="flex flex-row items-center">
        <div
          className="alert-icon flex items-center bg-opacity-50 justify-center flex-shrink-0 rounded-full"
          style={{ width: iconSize, height: iconSize }}
        >
          <IconComponent size={iconSize} />
        </div>
        <div className="alert-content ml-4" style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          {title && ( // Renderiza o título somente se ele for fornecido
            <div className="alert-title font-semibold" style={{ fontSize: titleSize }}>
              {title}
            </div>
          )}
          <div className="alert-description" style={{ fontSize: messageSize }}>
            {message}
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-auto font-semibold focus:outline-none"
          style={{ fontSize: titleSize }}
        >
          &times;
        </button>
      </div>
      {showProgress && (
        <div className="progress-bar mt-2 h-1 rounded bg-opacity-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <div
            className="bg-opacity-75 h-full rounded"
            style={{ width: `${progress}%`, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
        </div>
      )}
    </div>
  );
};

export default Alert;
