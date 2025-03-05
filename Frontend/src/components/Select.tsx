import { ChevronDown } from "lucide-react";
import { twJoin, twMerge } from "tailwind-merge";

function Select({
  children,
  className,
  selectClassName,
  label,
  defaultOptionLabel = "Select",
  labelClassName,
  onChange,
  name,
  color = "primary",
  ...rest
}: any) {
  return (
    <div className={twMerge("relative", className)}>
      {label && (
        <label
          htmlFor={rest.id || rest.name}
          className={twMerge(
            "text-primary-solid text-base mb-2 block ml-2",
            color === "secondary" && `text-secondary-solid`,
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          name={name}
          onChange={onChange}
          className={twMerge(
            "px-4 py-2 border-[1px] border-black border-solid",
            "rounded-lg bg-white outline-none text-[#BDBDBD]",
            "placeholder:text-secondary-solid cursor-pointer appearance-none",
            color === "secondary" &&
              `border-secondary-solid text-secondary-solid`,
            rest?.value && "text-black",
            selectClassName
          )}
          {...rest}
        >
          <option value="">{defaultOptionLabel}</option>
          {children}
        </select>
        <ChevronDown
          className={twJoin(
            "absolute w-4 h-4 right-5",
            "top-1/2 -translate-y-1/2 pointer-events-none"
          )}
        />
      </div>
    </div>
  );
}

export default Select;
