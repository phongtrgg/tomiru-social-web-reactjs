// import { makeStyles } from "@material-ui/core";

// export const useTweetImageStyles = makeStyles((theme) => ({
//     image: {
//         position: "relative",
//         "& img": {
//             objectFit: "cover",
//             marginTop: 10,
//             width: 504,
//             height: 252,
//             borderRadius: 20,
//             borderColor: theme.palette.info.light
//         },
//         "& .small": {
//             width: 260
//         }
//     }
// }));
import { makeStyles } from "@material-ui/core";

export const useTweetImageStyles = makeStyles((theme) => ({
    image: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: "100%",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: 20,
            borderColor: theme.palette.info.light
        },
        "& .small": {
            width: "100%",
            height: "auto",
            [theme.breakpoints.down("sm")]: {
                width: "100%"
            }
        }
    }
}));
