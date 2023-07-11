import { ErrorMessage, Field } from "formik";
import { InputLabel } from "@mui/material";

import FormError from "../FormError";
import CustomSelect from "./CustomSelect";

import "../styles/styles.css";

interface IMultiSelectProps {
  className?: string;
  name: string;
  // Here Options Value can be either string or number.so number type is added.
  options?: { label: string | number; value: string | number }[];
  placeholder?: string;
  isMulti?: boolean;
  label?: string;
  menuPlacement?: string;
  maxMenuHeight?: number;
  menuShouldScrollIntoView?: boolean;
  value?: string;
}

const Select = (props: IMultiSelectProps) => {
  const {
    className,
    name,
    options,
    placeholder,
    isMulti,
    label,
    menuPlacement,
    menuShouldScrollIntoView,
    maxMenuHeight,
    value,
  } = props;
  return (
    <>
      <div className="label-style">
        <InputLabel htmlFor={name} sx={{color: "black"}}>{label}</InputLabel>
      </div>

      <Field
        className={className}
        name={name}
        options={options}
        component={CustomSelect}
        placeholder={placeholder}
        isMulti={isMulti}
        menuPlacement={menuPlacement}
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        maxMenuHeight={maxMenuHeight}
        value={value}
      />
      <ErrorMessage name={name} component={FormError} />
    </>
  );
};

export default Select;
