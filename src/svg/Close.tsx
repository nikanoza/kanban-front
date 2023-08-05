import { SvgComponentType } from "./types";

const Close: React.FC<SvgComponentType> = ({ onClick }) => {
  return (
    <svg
      width="10"
      height="7"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
    </svg>
  );
};

export default Close;
