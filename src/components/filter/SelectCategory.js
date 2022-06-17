import { FormControl, Select, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./style.css";

const SelectCategory = ({ onChange, selectedCategory, categories }) => {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#b00000',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <FormControl className="form-control">
      <Select className="category-select" value={selectedCategory.id} onChange={onChange}>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </ThemeProvider>
  );
};

export default SelectCategory;