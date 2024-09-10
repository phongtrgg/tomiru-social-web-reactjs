import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface HideShowTomxuProps {
    number?: string | undefined;
}

const HideShowTomxu: React.FC<HideShowTomxuProps> = ({ number }) => {
    const [hidden, setHidden] = useState(true);

    const handleHideShow = () => {
        setHidden(!hidden);
    };

    return (
        <Typography
            component="span"
            variant="body2"
            style={{
                fontWeight: 600,
                fontSize: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            {hidden ? "-------" : number}
            <IconButton onClick={handleHideShow}>
                {hidden ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </IconButton>
        </Typography>
    );
};

export default HideShowTomxu;
