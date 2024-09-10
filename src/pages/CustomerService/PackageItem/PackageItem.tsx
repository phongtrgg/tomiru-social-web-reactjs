import React, { FC, ReactElement } from "react";
import { PackageResponse } from "../../../store/ducks/packages/contracts/state";
import "../CustomerService.css";
import { useTranslation } from "react-i18next";
import DoneIcon from "@mui/icons-material/Done";
import { useSelector } from "react-redux";
import { selectVAT } from "../../../store/ducks/packages/selectors";
interface PackageItemInterface {
    packageProp: PackageResponse;
    openModal: (pkg: PackageResponse) => void;
}
export const PackageItem: FC<PackageItemInterface> = ({
    packageProp,
    openModal
}: PackageItemInterface): ReactElement => {
    const { t } = useTranslation();
    const VAT = useSelector(selectVAT);
    const VAT_use = VAT ? VAT : 0;
    return (
        <div className="box-one">
            <p className="name-package">{packageProp.name}</p>
            <p className="price">
                {packageProp.price * (1 + VAT_use)} Xu<span style={{ fontSize: "20px" }}>/</span>
                <span style={{ fontSize: "20px", marginLeft: "3px" }}>
                    {packageProp.validInDay === 7
                        ? `7 ${t("days")}`
                        : packageProp.validInDay === 30
                        ? t("month")
                        : packageProp.validInDay === 180
                        ? `6 ${t("months")}`
                        : t("year")}
                </span>
            </p>
            <div className="benefit">
                <p>
                    {packageProp.validInDay === 0
                        ? t("free")
                        : packageProp.validInDay === 30
                        ? t("monthly-payment")
                        : packageProp.validInDay === 180
                        ? t("6-months-payment")
                        : t("annual-payment")}
                </p>
                {packageProp.discount > 0 && (
                    <div className="cheeseparings">
                        {t("save-money")} {packageProp.discount}%
                    </div>
                )}
            </div>
            <div className="button-container">
                <button
                    className="button"
                    onClick={() => {
                        openModal(packageProp);
                    }}
                >
                    {t("register")}
                </button>
            </div>
            <div className="advantages">
                <div className="advantage">
                    <DoneIcon style={{ fontSize: "18px", marginTop: "3px" }} />
                    <p className="advantage-text">{packageProp.description}</p>
                </div>
            </div>
        </div>
    );
};
