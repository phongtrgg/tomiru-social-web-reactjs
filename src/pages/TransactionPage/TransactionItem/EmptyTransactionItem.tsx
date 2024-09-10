import React, { FC, ReactElement } from "react";
interface EmptyTransactionItem {
    title: string;
}
const EmptyTransactionItem: FC<EmptyTransactionItem> = ({ title }: EmptyTransactionItem): ReactElement => {
    return (
        <tr>
            <td style={{ textAlign: "center" }} colSpan={7}>
                <h1>{title}</h1>
            </td>
        </tr>
    );
};
export default EmptyTransactionItem;
