type ButtonProps = {
  color: string;
  text: string;
  onClick?: () => void; // Torna onClick opcional
  disabled?: boolean;
  height?: string | number;
  width?: string | number;
  fontWeight?: string;
  type?: 'button' | 'submit' | 'reset';
  fontFamily?: string;
  fontSize?: string | number;
};

const Button = ({
  color,
  text,
  onClick, // Agora opcional
  disabled = false,
  height,
  width = '100%',
  fontWeight = 'normal',
  type = 'button',
  fontFamily = 'inherit',
  fontSize = '14px',
}: ButtonProps) => {
  const buttonStyle = {
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
      height,
      width,
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      fontSize: fontSize,
  };

  return (
      <button
          type={type}
          onClick={onClick} // Pode ser undefined
          disabled={disabled}
          style={buttonStyle}
          className={`text-white rounded-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75 active:bg-opacity-90'}`}
      >
          {text}
      </button>
  );
};

export default Button;
