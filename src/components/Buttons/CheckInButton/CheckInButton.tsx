import React, { FC, ReactElement, useEffect, useState } from "react";
import Button from "@material-ui/core/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useCheckInButtonStyles } from "./CheckInButtonStyles";
import { useTranslation } from "react-i18next";
import { dailyCheckin, setWalletUserLoadingStatus } from "../../../store/ducks/wallet/actionsCreator";
import { selectWalletUserLoadingStatus, selectWalletUserMessage } from "../../../store/ducks/wallet/selectors";
import { useCheckStatus } from "../../../hook/useCheckStatus";
import { LoadingStatus } from "../../../types/common";
import Spinner from "../../Spinner/Spinner";

const CheckInButton: FC<any> = ({ userId, isPrivateProfile, size }): ReactElement => {
    const classes = useCheckInButtonStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const status = useSelector(selectWalletUserLoadingStatus);
    const errorMessage = useSelector(selectWalletUserMessage);
    const checkStatus = useCheckStatus();
    const [isLoading, setIsLoading] = useState(false);
    const handleCheckIn = () => {
        dispatch(dailyCheckin());
    };
    useEffect(() => {
        checkStatus(
            status,
            () => {
                dispatch(setWalletUserLoadingStatus(LoadingStatus.LOADED));
            },
            () => {
                dispatch(setWalletUserLoadingStatus(LoadingStatus.LOADED));
            },
            "Checkin success",
            errorMessage
        );
        if (status === LoadingStatus.LOADING) {
            setIsLoading(true);
        }
        if (status !== LoadingStatus.LOADING) {
            setIsLoading(false);
        }
    }, [status]);
    return (
        <>
            <Button
                className={classes.button}
                color="primary"
                variant="contained"
                size={size}
                onClick={handleCheckIn}
                disabled={isLoading}
            >
                {isLoading ? <Spinner colorsCss="white" /> : t("get_3_tomxu")}
            </Button>
        </>
    );
};

export default CheckInButton;
