import { makeStyles, Theme } from "@material-ui/core";

interface SpinnerStylesProps {
    paddingTop?: number;
    colorsCss?: string;
}

export const useSpinnerStyles = makeStyles<Theme, SpinnerStylesProps>((theme) => ({
    loading: {
        width: 30,
        margin: "0px auto",
        paddingTop: (props) => (props.paddingTop !== undefined ? props.paddingTop : 50),
        paddingBottom: 50
    },
    spinner: {
        color: (props) => (props.colorsCss !== undefined ? props.colorsCss : "white !`important`"),
        height: 26,
        width: 26,
        animation: `$spinner 0.75s linear 0s infinite`,
        "& svg": {
            height: "100%",
            width: "100%"
        }
    },
    "@keyframes spinner": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    },
    backCircle: {
        stroke: (props) => (props.colorsCss !== theme.palette.primary.main ? props.colorsCss : "white "),
        strokeWidth: 4,
        opacity: 0.2
    },
    frontCircle: {
        stroke: (props) => (props.colorsCss !== theme.palette.primary.main ? props.colorsCss : "white "),
        strokeWidth: 4,
        strokeDasharray: 80,
        strokeDashoffset: 60
    }
}));
