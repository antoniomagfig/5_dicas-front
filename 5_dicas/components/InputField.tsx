type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
};

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm text-slate-300">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-4 py-3 rounded-xl bg-slate-900 text-white
          border ${
            error && touched
              ? "border-red-500"
              : "border-slate-700 focus:border-blue-500"
          }
          outline-none transition`}
      />

      {error && touched && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}