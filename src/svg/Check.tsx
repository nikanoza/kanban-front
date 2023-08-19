const Check: React.FC<{ color?: string }> = ({ color }) => {
  return (
    <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
      <path
        stroke={color ? color : "#fff"}
        strokeWidth="2"
        fill="none"
        d="m1.276 3.066 2.756 2.756 5-5"
      />
    </svg>
  );
};

export default Check;
