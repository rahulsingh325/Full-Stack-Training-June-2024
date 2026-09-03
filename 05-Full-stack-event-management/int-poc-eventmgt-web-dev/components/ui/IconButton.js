"use client";

export default function IconButton({
  icon: Icon,
  onClick,
  size = 40,
  iconSize = 18,
  variant = "light",
  className = "bg-cool-grey-10",
  title,
  disabled = false,
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`
        btn
        btn-${variant}
        rounded-5
        d-flex
        align-items-center
        justify-content-center
        ${className}
      `}
      style={{ width: size, height: size, padding: 0 }}
    >
      <Icon size={iconSize} />
    </button>
  );
}
