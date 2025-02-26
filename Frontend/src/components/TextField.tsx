import { twMerge } from "tailwind-merge";

function TextField(props: any) {
  const {
    type = "text",
    placeholder = "",
    startIcon,
    endIcon,
    fullWidth = true,
    className = "",
    inputClassName = "",
    label,
    textArea,
    ...rest
  } = props;
  const hasIcon = startIcon || endIcon;

  return (
    <div className={twMerge("relative", className, fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={rest.id || rest.name}
          className="text-primary-solid text-base mb-2 block ml-2"
        >
          {label}
        </label>
      )}
      {!textArea ? (
        <input
          className={twMerge(
            "px-4 py-2 border-[1px] border-primary-solid border-solid",
            "rounded-full bg-white outline-none placeholder:text-[#BDBDBD]",
            "disabled:opacity-50",
            startIcon && "pl-10",
            endIcon && "pr-10",
            fullWidth && "w-full",
            inputClassName
          )}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <textarea
          rows={1}
          className={twMerge(
            "px-4 py-2 border-[1px] border-primary-solid border-solid",
            "rounded-full bg-white outline-none placeholder:text-[#BDBDBD] resize-none",
            fullWidth && "w-full",
            inputClassName
          )}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      )}

      {hasIcon && (
        <span
          className={twMerge(
            "absolute top-1/2 -translate-y-1/2 z-10",
            startIcon ? "left-3" : "right-3"
          )}
        >
          {startIcon && startIcon}
          {endIcon && endIcon}
        </span>
      )}
    </div>
  );
}

export default TextField;
