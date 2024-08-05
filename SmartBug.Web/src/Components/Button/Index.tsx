type ButtonProps = {
    color: string;
    text: string;
    onClick: () => void;
    disabled?: boolean;
    height?: string | number;
    width?: string | number;
    fontWeight?: string;
  };
  
  const Button = ({
    color,
    text,
    onClick,
    disabled = false,
    height,
    width = '100%',
    fontWeight = 'normal'
  }: ButtonProps) => {
    const buttonStyle = {
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
      height,
      width,
      fontWeight: fontWeight,
    };
  
    return (
      <button
        className={`text-white rounded-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75 active:bg-opacity-90'}`}
        onClick={onClick}
        disabled={disabled}
        style={buttonStyle}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  