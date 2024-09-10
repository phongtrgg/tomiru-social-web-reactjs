import { withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

const styles = (theme: Theme) => ({
    root: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
                "& svg path": {
                    fill: theme.palette.primary.main
                }
            },
            borderRadius: 30,
            border: `1px solid ${theme.palette.divider}`,
            padding: 0,
            paddingLeft: 15,
            marginLeft: 15,
            width: 500,
            
            "& fieldset": {
                border: 1
            },
            "& .MuiInputAdornment-root": {
                "& svg": {
                    color: theme.palette.text.secondary,
                    height: ""
                }
            }
        },
        "& .MuiOutlinedInput-input": {
            padding: "12px 14px 14px 5px",
        }
    }
});

type ModalInputWrapperProps = TextFieldProps & WithStyles<typeof styles>;

const ModalInputWrapper = withStyles(styles)(TextField);

export default ModalInputWrapper;
