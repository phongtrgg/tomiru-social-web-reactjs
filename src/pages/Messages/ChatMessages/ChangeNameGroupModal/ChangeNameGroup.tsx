import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    TextareaAutosize,
    Typography
} from "@material-ui/core";
import { CloseIcon } from "../../../../icons";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTranslation } from "react-i18next";

interface RenameGroupModalProps {
    open: boolean;
    onClose: () => void;
    onRename: (newName: string) => void;
}

const ChangeNameGroup: React.FC<RenameGroupModalProps> = ({ open, onClose, onRename }) => {
    const { t } = useTranslation();
    const [newName, setNewName] = useState("");
    const [error, setError] = useState("");

    const handleRename = () => {
        if (isNameValid(newName)) {
            onRename(newName);
            onClose();
        } else {
            setError("Bạn cần phải nhập tên nhóm");
        }
    };

    const isNameValid = (name: string) => {
        return name.trim().length > 0;
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "450px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <p>
                            <BorderColorIcon style={{ width: "20px", height: "20px" }} />
                        </p>
                        <p>{t("change-group-name")}</p>
                    </div>
                    <div style={{ width: "25px", cursor: "pointer" }} onClick={onClose}>
                        {CloseIcon}
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <TextareaAutosize
                    autoFocus
                    minRows={5}
                    placeholder="Tên đoạn chat "
                    style={{
                        width: "100%",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "4px",
                        outline: "none",
                        resize: "none"
                    }}
                    value={newName}
                    onChange={(e) => {
                        setNewName(e.target.value);
                        setError("");
                    }}
                />
                {error && (
                    <Typography color="error" variant="caption">
                        {error}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleRename}
                    style={{ backgroundColor: "rgb(29, 155, 240)", color: "white", width: "100px" }}
                    disabled={!isNameValid(newName)}
                >
                    {t("save")}
                </Button>
                <Button onClick={onClose} style={{ border: "1px solid gray", width: "80px" }}>
                    {t("cancel")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangeNameGroup;
