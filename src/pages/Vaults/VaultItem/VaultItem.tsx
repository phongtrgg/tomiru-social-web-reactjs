import React, { FC, ReactElement } from "react";
import { VaultResponse } from "../../../store/ducks/vault/contract/states";
import { useVaultItemStyles } from "./VaultItemStyle";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import icon from "../../../assets/icon.png";
import money1 from "../../../assets/money1.png";
import money2 from "../../../assets/money2.png";
import money3 from "../../../assets/money3.png";
import money4 from "../../../assets/money4.png";
import { formatVaultEndTime } from "../../../util/format-date-helper";
import { formatUserBalance } from "../../../util/format-number";
interface VaultItemInterface {
    vault: VaultResponse;
    onClick: (vault: VaultResponse) => void;
    index: number;
}
const VaultItem: FC<VaultItemInterface> = ({ vault, onClick, index }): ReactElement => {
    const classes = useVaultItemStyles();
    const icons = [money1, money2, money3, money4];
    return (
        <div className={classes.card}>
            <div className={classes.vaultNameBar}>
                <span className={classes.vaultName}>{vault.name}</span>
                <HelpOutlineOutlinedIcon
                    onClick={() => {
                        onClick(vault);
                    }}
                />
            </div>
            <div className={classes.vaultIconDiv}>
                <img src={icons[index]} alt="ICON" className={classes.vaultIcon} />
            </div>
            <div>
                {" "}
                <div className={classes.vaultValueDiv}>
                    <span className={classes.vaultValue}>{formatUserBalance(parseFloat(vault.value))}</span>
                    <div className={classes.vaultUnitDiv}>
                        {" "}
                        <span className={classes.vaultUnit}>{vault.unit}</span>
                        <img src={icon} alt="" />
                    </div>
                </div>
                <div className={classes.vaultInfoDiv}>
                    <span className={classes.vaultInfoCount}>XX</span>
                    <span className={classes.vaultInfo}>thành viên hợp lệ sẽ được nhận thưởng̣</span>
                </div>
                <div className={classes.vaultEndTime}>
                    <span>
                        <AccessAlarmsOutlinedIcon />
                    </span>
                    <span>{formatVaultEndTime(vault.end)}</span>
                </div>
            </div>
        </div>
    );
};
export default VaultItem;
