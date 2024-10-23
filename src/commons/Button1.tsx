type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button1({ text, onClick }: ButtonProps) {
  return (
    <button
      className="block w-full select-none rounded-lg bg-gradient-to-r from-[#304c5e] via-[#08293e] to-[#304c5e] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#304c5e]/20 transition-all hover:shadow-lg hover:shadow-[#304c5e]/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button1;
