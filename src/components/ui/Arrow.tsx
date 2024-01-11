interface ArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}

export default function Arrow({ disabled, left, onClick }: ArrowProps) {
  const disabeld = disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={onClick}
      className={`arrow opacity-1 ${
        left ? "arrow--left" : "arrow--right"
      } ${disabeld} h-20`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {left && (
        <path d='M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z' />
      )}
      {!left && (
        <path d='M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z' />
      )}
    </svg>
  );
}
