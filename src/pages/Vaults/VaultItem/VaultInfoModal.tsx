import React, { FC, ReactElement } from "react";
import { VaultResponse } from "../../../store/ducks/vault/contract/states";
import { Box, Divider, Modal } from "@material-ui/core";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import { useVaultItemStyles } from "./VaultItemStyle";
interface VauInfoInterface {
    vault: VaultResponse | undefined;
    onClose: () => void;
    show: boolean;
}
const VaultInfoModal: FC<VauInfoInterface> = ({ vault, onClose, show }): ReactElement => {
    const classes = useVaultItemStyles();
    const style = {
        position: "absolute" as "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "none",
        outline: "none",
        p: 3,
        borderRadius: "20px"
    };
    return (
        <Modal open={show} onClose={onClose}>
            <Box sx={style}>
                <div className={classes.modalHeader}>
                    {" "}
                    <span>
                        {" "}
                        <PaidOutlinedIcon />
                    </span>
                    <span>
                        <b>{vault && vault.name}</b>
                    </span>
                </div>
                <Divider />
                <div style={{ marginTop: "10px" }}>
                    <span style={{ fontSize: "14px" }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore iste nam quidem cupiditate
                        ipsa aut at sunt impedit a corrupti quos, quo id natus, veniam ipsum aliquam rem soluta non?
                    </span>
                </div>
            </Box>
        </Modal>
    );
};
export default VaultInfoModal;
