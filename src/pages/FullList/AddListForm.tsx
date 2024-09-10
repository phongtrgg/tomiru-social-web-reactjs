import React from "react";
import { Avatar, Box, TextField, IconButton } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoIcon from "@mui/icons-material/Photo";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ProfileAvatar from "../../components/AddTweetForm/ProfileAvatar/ProfileAvatar";
import UploadImages from "../../components/UploadImages/UploadImages";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";

const AddListForm: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                width: "100%",
                flexDirection: "column",
                borderRadius: 2,
                textAlign: "center",
                fontSize: "0.875rem",
                fontWeight: "700",
                backgroundColor: "#fdfbfb",
                margin: " 24px 0",
                padding: "8px",
                border: "none"
                // boxShadow: 12,
            }}
        >
            <Box display="flex" alignItems="center" width={"100%"} paddingLeft={2} paddingRight={2} mt={1}>
                <ProfileAvatar />
                <TextField
                    placeholder={t("write-something")}
                    multiline
                    variant="outlined"
                    sx={{
                        width: "100%",
                        margin: "4px 0 0 16px",
                        borderRadius: "6px",
                        outline: "none",
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#cccccc80",
                            padding: "8px",
                            "& fieldset": {
                                borderColor: "#ccc"
                            },
                            "&:hover fieldset": {
                                borderColor: "#aaa"
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#aaa"
                            }
                        }
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingLeft: 2,
                    paddingRight: 2,
                    mt: 1
                }}
            >
                <UploadImages />
                <Button variant="contained" color="primary">
                    {t("reply")}
                </Button>
            </Box>
        </Box>
    );
};

export default AddListForm;
