import { LucideIcon } from 'lucide-react'; // Importe o tipo LucideIcon

type ButtonProps = {
  color: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  height?: string | number;
  width?: string | number;
  fontWeight?: string;
  type?: 'button' | 'submit' | 'reset';
  fontFamily?: string;
  fontSize?: string | number;
  icon?: LucideIcon; 
  marginTop?: string;
  borderRadious?: string;
};

const Button = ({
  color,
  text,
  onClick,
  disabled = false,
  height,
  width = '100%',
  fontWeight = 'normal',
  type = 'button',
  fontFamily = 'inherit',
  fontSize = '14px',
  marginTop,
  borderRadious,
  icon: Icon, 
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
    marginTop: marginTop,
    borderRadius: borderRadious,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      className={`flex items-center justify-center text-white rounded-sm ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-75 active:bg-opacity-90'}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />} 
      {text}
    </button>
  );
};

export default Button;
