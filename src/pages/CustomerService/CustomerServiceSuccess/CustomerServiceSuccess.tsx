import React, { useEffect } from "react";
import successService from "../../../assets/CustomerService/cuccess.png";
import "./CustomerServeiceSuccess.css";
import { Box, CircularProgress } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { LoadingStatus } from "../../../types/common";
import { HOME } from "../../../constants/path-constants";
import { selectBuyPackageStatus, selectBuySuccessPackage } from "../../../store/ducks/packages/selectors";
import { setBuyPackageStatus } from "../../../store/ducks/packages/actionCreators";
const CustomerServiceSuccess: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const buySuccessPackage = useSelector(selectBuySuccessPackage);
    const status = useSelector(selectBuyPackageStatus);
    useEffect(() => {
        if (status === LoadingStatus.NEVER) {
            history.push(HOME);
        } else {
            setTimeout(() => {
                history.push(HOME);
                dispatch(setBuyPackageStatus(LoadingStatus.NEVER));
            }, 5000);
        }
    }, [status]);
    return (
        <>
            <div className="success-container">
                <div className="backgroundImageHere">
                    <div>
                        <img src={successService} alt="" className="success-image" />
                    </div>
                    <p className="success-title">{t("payment-successfully")}</p>
                    <div className="success-package">
                        <div className="success-package-info">
                            <p className="success-package-title">{buySuccessPackage && buySuccessPackage.name}</p>
                            <p className="success-package-price">
                                {`${buySuccessPackage && buySuccessPackage.price} Xu/`}
                                <span className="success-package-unit">
                                    {" "}
                                    {buySuccessPackage?.validInDay === 7
                                        ? t("week")
                                        : buySuccessPackage?.validInDay === 30
                                        ? t("month")
                                        : buySuccessPackage?.validInDay === 180
                                        ? `6 ${t("months")}`
                                        : t("years")}
                                </span>
                            </p>
                        </div>
                    </div>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                        <CircularProgress size={60} />
                    </Box>

                    <p className="success-text-back">{t("Tomiru will automatically return you to the home page")}</p>
                    <Link
                        to="/home"
                        className="success-link"
                        onClick={() => {
                            dispatch(setBuyPackageStatus(LoadingStatus.NEVER));
                        }}
                    >
                        {t("back-home")}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CustomerServiceSuccess;
