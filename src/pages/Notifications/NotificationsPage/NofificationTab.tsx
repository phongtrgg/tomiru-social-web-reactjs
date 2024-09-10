import React from "react";
import Tab from "@material-ui/core/Tab";
import { Chip } from "@material-ui/core";

interface NotificationTabProps {
    className: string;
    count: number;
    title: string;
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

export const NotificationTab: React.FC<NotificationTabProps> = ({ className, count, title, ...rest }) => (
    <Tab
        {...rest}
        label={
            <p className={className}>
                {title}
                {count === 0 || count === undefined ? null : (
                    <Chip
                        label={count}
                        style={{
                            backgroundColor: "red",
                            color: "white"
                        }}
                        size="small"
                    />
                )}
            </p>
        }
    />
);
