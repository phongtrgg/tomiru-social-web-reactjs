import React, { FC, ReactElement } from "react";
import { AgentResponse } from "../../../store/ducks/agents/contract/states";
import { useTransactionP2PStyles } from "./TransactionP2PStyles";
interface TransactionP2PItemInterface {
    agent: AgentResponse;
}
const TransactionP2PItem: FC<TransactionP2PItemInterface> = ({ agent }: TransactionP2PItemInterface): ReactElement => {
    const classes = useTransactionP2PStyles();
    return (
        <div className={classes.boxContent}>
            <div className={classes.headerContent}>
                <h3>{agent.displayName}</h3>
                <p>{agent.status}</p>
            </div>
            <div className={classes.infor}>
                <p>123 giao dịch | 12,146.75 *</p>
            </div>
            <hr style={{ marginBottom: " 5px" }} />

            <div>
                <div style={{ display: "flex", gap: "70px", padding: "5px" }}>
                    <p className={classes.contact}>
                        <img
                            className={classes.imageContent}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ93xUf0lSUIUVu4DEJrQosi_GTRpLcX8lN_Q&s"
                            alt=""
                        />
                        <span>{agent.zaloLink}</span>
                    </p>
                    <p className={classes.contact}>
                        <img
                            className={classes.imageContent}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvlyQVnlwKuLJWenbHL1Ao3N2O-969sacIQ&s"
                            alt=""
                        />
                        <span>{agent.telegramLink}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default TransactionP2PItem;
