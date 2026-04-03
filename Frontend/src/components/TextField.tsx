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
            "px-4 py-2 border-[1px] border-black border-solid dark:border-zinc-700",
            "rounded-lg bg-white dark:bg-zinc-800 outline-none placeholder:text-[#BDBDBD] dark:text-white dark:placeholder:text-zinc-500",
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
            "px-4 py-2 border-[1px] border-black border-solid dark:border-zinc-700",
            "rounded-lg bg-white dark:bg-zinc-800 outline-none placeholder:text-[#BDBDBD] dark:text-white dark:placeholder:text-zinc-500 resize-none",
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
