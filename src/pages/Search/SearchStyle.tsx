import { makeStyles } from "@material-ui/core";

export const useSearchStyles = makeStyles((theme) => ({
    backButtonWrapper: {
        display: "flex",
        alignItems: "center",
        width: "5%",
        paddingRight: 40
    },

    contentWrapper: {
        paddingTop: 97  
    },
    tabs: {
        "& .MuiTabs-indicator": {
            marginLeft: 35,
            maxWidth: 130,
            height: 4,
            backgroundColor: theme.palette.primary.main

        },
        "& .MuiTab-root": {
            fontSize: 15,
            textTransform: "none !important",
            minWidth: 200,
            fontWeight: 700
        },
        display:"flex",
        justifyContent:"space-between",
        width:"40vw",
        
    },
  
  
    
}));
