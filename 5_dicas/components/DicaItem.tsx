type Props = {
  numero: number;
  texto: string | null;
  revelada: boolean;
  disabled: boolean;
  onClick: () => void;
};

export default function DicaItem({
  numero,
  texto,
  revelada,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left px-5 py-4 rounded-2xl border font-medium transition
        ${
          revelada
            ? "bg-slate-50 text-slate-900 border-slate-200"
            : "bg-slate-100 hover:bg-slate-200 border-slate-200 disabled:opacity-50"
        }`}
    >
      <span className="font-bold mr-2">Dica {numero}:</span>{" "}
      {revelada ? texto : "?"}
    </button>
  );
}
