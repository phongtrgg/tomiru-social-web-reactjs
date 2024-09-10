import React, { FC, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Button, DialogActions, DialogTitle } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import a1 from "../../../../assets/BackgroundMessage/background-dep-de-ghep-anh.jpg";
import a2 from "../../../../assets/BackgroundMessage/background-hinh-nen-powerpoint-dep.jpg";
import a3 from "../../../../assets/BackgroundMessage/image.png";
import a4 from "../../../../assets/BackgroundMessage/image2.jpg";
import a5 from "../../../../assets/BackgroundMessage/image3.jpg";
import a6 from "../../../../assets/BackgroundMessage/image4.jpg";
import a7 from "../../../../assets/BackgroundMessage/image5.jpg";
import a8 from "../../../../assets/BackgroundMessage/image6.jpg";
import a9 from "../../../../assets/BackgroundMessage/image7.jpg";
import a10 from "../../../../assets/BackgroundMessage/image8.jpg";
import { useDispatch } from "react-redux";
import { setBackground } from "../../../../store/ducks/changeBackgroundChat/actionCreators";
import { WriteMessage } from "../../../../icons";
import { Console } from "console";
import { useTranslation } from "react-i18next";

const backgroundData = [
    { type: "color", color: "#808080" },
    { type: "image", src: a1 },
    { type: "image", src: a2 },
    { type: "image", src: a3 },
    { type: "image", src: a4 },
    { type: "image", src: a5 },
    { type: "image", src: a6 },
    { type: "image", src: a7 },
    { type: "image", src: a8 },
    { type: "image", src: a9 },
    { type: "image", src: a10 }
];

interface ChatBackGroundModal {
    open: boolean;
    onClose: () => void;
    onChangeBackground: (selectedBackground: string) => void;
}

const ChatBackGroundModal: FC<ChatBackGroundModal> = ({ open, onClose, onChangeBackground }) => {
    // const dispatch = useDispatch();
    const [selectedBackground, setSelectedBackground] = useState<string>("");
    const { t } = useTranslation();
    const changeBackground = () => {
        // if (selectedBackground) {
        //     dispatch(setBackground(selectedBackground)); // Dispatch action để thay đổi background
        //     onClose(); // Đóng modal sau khi thay đổi
        // }
        onChangeBackground(selectedBackground);
    };

    const handleBackgroundClick = (item: any) => {
        setSelectedBackground(item.type === "image" ? item.src : item.color);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{ width: "570px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "570px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <p style={{ width: "20px", height: "20px" }}> {WriteMessage}</p>
                        <p> {t("new-conversation")}</p>
                    </div>
                    <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
                </div>
            </DialogTitle>
            <DialogContent>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "5px" }}>
                    {backgroundData.map((item, index) => (
                        <div key={index} onClick={() => handleBackgroundClick(item)} style={{ position: "relative" }}>
                            {item.type === "image" ? (
                                <img
                                    style={{
                                        width: "120px",
                                        height: "140px",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        border: selectedBackground === item.src ? "3px solid #1DA1F2" : "none"
                                    }}
                                    src={item.src}
                                    alt=""
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "120px",
                                        height: "140px",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        backgroundColor: item.color,
                                        border: selectedBackground === item.color ? "3px solid #1DA1F2" : "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff" // Đảm bảo văn bản "Mặc định" hiển thị rõ ràng trên nền xám
                                    }}
                                >
                                    <span>Mặc định</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={changeBackground} color="primary" variant="contained" style={{ marginRight: "30px" }}>
                    Đổi hình nền
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatBackGroundModal;
