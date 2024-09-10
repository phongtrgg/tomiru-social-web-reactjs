import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import { Height } from "@material-ui/icons";
import { he } from "date-fns/locale";

export const SearchAddPeopleStyle = withStyles((theme) => ({
    root: {
        paddingTop: 7,
        "& .MuiOutlinedInput-root": {
            borderRadius: 30,
            border: `1px solid ${theme.palette.divider}`,
            paddingLeft: 15,
            marginLeft: 15,
            width: 385,
            height: 40,
            "&.Mui-focused": {
                backgroundColor: theme.palette.background.paper,
                "& fieldset": { borderWidth: 1, borderColor: theme.palette.primary.main },
                "& svg path": {
                    fill: theme.palette.primary.main
                }
            },
            "&:hover": {
                "& fieldset": { borderColor: "transparent" }
            },
            "& fieldset": {
                borderColor: "transparent",
                borderWidth: 1
            },
            "& .MuiInputAdornment-root": {
                "& svg": {
                    color: theme.palette.text.secondary,
                    height: "1.25em"
                }
            }
        },
        "& .MuiOutlinedInput-input": {
            padding: "12px 0px"
        }
    }
}))(TextField);
