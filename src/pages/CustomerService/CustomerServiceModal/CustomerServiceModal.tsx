import React, { useState } from "react";
import "./CustomerServiceModal.css";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslation } from "react-i18next";
import { PackageResponse } from "../../../store/ducks/packages/contracts/state";
import { selectVAT } from "../../../store/ducks/packages/selectors";
import { useSelector } from "react-redux";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage: PackageResponse | undefined;
    loading: any;
}

const CustomerServiceModal: React.FC<ModalProps> = ({ isOpen, onClose, selectedPackage, loading }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const VAT = useSelector(selectVAT);
    const VAT_use = VAT ? VAT : 0;
    if (!isOpen) {
        return null;
    }
    const packageDetails = {
        "Gói tiêu dùng": {
            price: "110.000 đ",
            benefits: [
                "Chiết khấu 10-20% tại đại lý và điểm bán Tomiru cho mọi sản phẩm.",
                "Điểm danh, tích điểm năm 2 mở thẻ miễn phí trọn đời.",
                "Điểm danh, tích điểm năm 2 mở thẻ miễn phí trọn đời.",
                "Giới thiệu thẻ đóng phí năm, hưởng 20% hoa hồng trực tiếp 264.000 đồng trên 1.320.000 đồng mỗi thẻ."
            ]
        },
        "Gói kinh doanh": {
            price: "1.320.000 đ",
            benefits: [
                "Được nhận Combo hàng từ 1.7 triệu đến...",
                "Được mua hàng tại các đại lý,... tất cả sản phẩm",
                "Được sở hữu vị trí cố định tại mô hình",
                "Có nguồn thu nhập khi... kinh doanh"
            ]
        }
    };
    // const { price, benefits } = packageDetails[selectedPackage];

    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal">
                    <div className="modal-header">
                        <h2>{selectedPackage?.name}</h2>
                        <button className="modal-close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-decao">
                            <p className="modal-price">
                                {`${selectedPackage ? selectedPackage.price * (1 + VAT_use) : 0} Xu`}
                                <span>/ {t("month")}</span>
                            </p>
                            <p className="modal-annual">
                                {selectedPackage?.validInDay === 0
                                    ? t("free")
                                    : selectedPackage?.validInDay === 30
                                    ? t("monthly-payment")
                                    : selectedPackage?.validInDay === 180
                                    ? t("6-months-payment")
                                    : t("annual-payment")}
                                {selectedPackage && selectedPackage.discount > 0 && (
                                    <span className="modal-save">{`${t("save-money")} ${
                                        selectedPackage.discount
                                    }%`}</span>
                                )}
                            </p>
                        </div>

                        <ul className="modal-benefits">
                            {/* {benefits.map((benefit, index) => (
                                <li key={index} className="modal-benefit">
                                    <DoneIcon />
                                    <p>{benefit}</p>
                                </li>
                            ))} */}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-button cancel" onClick={onClose}>
                            {t("cancel")}
                        </button>
                        <button className="modal-button confirm" onClick={() => loading()}>
                            {t("complete-payment")}
                        </button>
                    </div>
                </div>
                {/* {isLoading && (
                <div className="loading-modal">
                    <div className="loading-modal-content">
                        <CustomerServiceLoading  />
                        <p>Đang xử lý thanh toán...</p>
                    </div>
                </div>
            )} */}{" "}
            </div>
        </>
    );
};

export default CustomerServiceModal;
