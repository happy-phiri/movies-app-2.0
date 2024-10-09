/* eslint-disable react/prop-types */

const Button = ({ text }) => {
  return (
    <button className="py-1 px-3 font-montserrat font-normal tracking-wide text-[#90cea1] border border-[#90cea1] hover:text-white hover:theme-gradient">
      {text}
    </button>
  );
};

export default Button;
