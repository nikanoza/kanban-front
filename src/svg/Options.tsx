import { SvgComponentType } from "./types";

const Options: React.FC<SvgComponentType> = ({ onClick }) => {
  return (
    <svg
      width="5"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <g fill="#828FA3" fill-rule="evenodd">
        <circle cx="2.308" cy="2.308" r="2.308" />
        <circle cx="2.308" cy="10" r="2.308" />
        <circle cx="2.308" cy="17.692" r="2.308" />
      </g>
    </svg>
  );
};

export default Options;
