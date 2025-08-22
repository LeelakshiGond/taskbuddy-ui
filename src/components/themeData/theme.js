import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6A1B9A", contrastText: "#fff" },
    secondary: { main: "#FDD835", contrastText: "#000" },
  },
  shape: { borderRadius: 10 },
  // applied everywhere
  typography: {
    allVariants: {
      color: "#263238",
      fontSize: "14px",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // ✅ Removed borderRadius: 5 to respect global radius (20px)
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px rgba(0,0,0,0) inset",
            WebkitTextFillColor: "#000 !important",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { boxShadow: "none", borderRadius: 10 },
        sizeSmall: { fontSize: "12px" },
        containedPrimary: {
          backgroundColor: "#6A1B9A",
          "&:hover": { backgroundColor: "#4A148C" },
        },
        containedSecondary: {
          backgroundColor: "#FDD835",
          "&:hover": { backgroundColor: "#FBC02D" },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: "38px",
        },
      },
    },
  },
});

export default theme;
