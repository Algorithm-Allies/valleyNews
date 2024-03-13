function AuthInput({ type, name, label, placeholder, ...props }) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 rounded"
        {...props}
      />
    </label>
  );
}
export default AuthInput;
