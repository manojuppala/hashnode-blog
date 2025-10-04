const ButtonLoading = ({
  text,
  onClick,
  loading,
  disabled,
  className
}: {
  text: string;
  onClick?: () => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <button 
    className={`btn btn-primary ${className}`} 
    type="submit" 
    disabled={disabled}
    onClick={onClick}>
    {loading ?
    <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
      </div>:
      <div>
        <b>
            {text}
        </b>
      </div>}
      </button>
  );
};

export default ButtonLoading;
