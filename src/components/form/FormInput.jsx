import { TextField } from "@mui/material";

export default function FormInput({
  label = "default label",
  required = false,
  name = "",
  formik,
  ...rest
}) {
  const handleChange = (e) => {
    const { value } = e.target;

    formik.setFieldValue(name, value);
  };
  return (
    <>
      <TextField
        required={required}
        id={name}
        label={label}
        fullWidth
        size="small"
        value={formik.values[name] || ""}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        name={name}
        onChange={handleChange}
        {...rest}
      />
    </>
  );
}
