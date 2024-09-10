import React, { useEffect, useState } from "react";
import "./CustomerService.css";
import DoneIcon from "@mui/icons-material/Done";
import CustomerServiceModal from "./CustomerServiceModal/CustomerServiceModal";
import { Box, CircularProgress, Modal } from "@material-ui/core";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    selectBuyPackageStatus,
    selectPackagesResult,
    selectPackagesStatus
} from "../../store/ducks/packages/selectors";
import { LoadingStatus } from "../../types/common";
import { PackageResponse } from "../../store/ducks/packages/contracts/state";
import { PackageItem } from "./PackageItem/PackageItem";
import { buyPackages, fetchPackages } from "../../store/ducks/packages/actionCreators";
import { CUSTOMER_SERVICE_SUCCCESS } from "../../constants/path-constants";
const CustomerService: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<PackageResponse | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const packages = useSelector(selectPackagesResult);
    const packagesLoadingStatus = useSelector(selectPackagesStatus);
    const buyStatus = useSelector(selectBuyPackageStatus);
    const openModal = (pkg: PackageResponse) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleOpen = () => {
        if (selectedPackage) {
            dispatch(buyPackages(selectedPackage));
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(fetchPackages());
    }, []);
    useEffect(() => {
        if (buyStatus === LoadingStatus.LOADING) {
            setOpen(true);
        } else {
            setOpen(false);
            if (buyStatus === LoadingStatus.SUCCESS) {
                history.push(CUSTOMER_SERVICE_SUCCCESS);
            }
        }
    }, [buyStatus]);
    return (
        <>
            <div className="rootContainer">
                <Link to="/home">
                    <div className="closeIcon">
                        <CloseOutlinedIcon />
                    </div>
                </Link>

                <div className="containerTitle">
                    <h1 className="title">{t("upgrade-to-premium-title")}</h1>
                </div>
                <div className="content">
                    <p className="text">{t("upgrade-to-premium-content")}</p>
                </div>

                <div className="box-container">
                    <div className="box-service">
                        {packagesLoadingStatus === LoadingStatus.LOADING ? (
                            <CircularProgress />
                        ) : packagesLoadingStatus === LoadingStatus.ERROR ? (
                            t("error")
                        ) : (
                            packages?.map((pkg: PackageResponse, i: number) => (
                                <PackageItem packageProp={pkg} key={i} openModal={openModal} />
                            ))
                        )}
                        {/* <div className="box-one">
                            <p className="name-package">{t("consumer-pack")}</p>
                            <p className="price">
                                110.000 đ<span style={{ fontSize: "20px" }}>/</span>
                                <span style={{ fontSize: "20px", marginLeft: "3px" }}>{t("month")}</span>
                            </p>
                            <div className="benefit">
                                <p>{t("monthly-payment")}</p>
                                <div className="cheeseparings">Tiết kiệm 10%</div>
                            </div>
                            <div className="button-container">
                                <button className="button" onClick={() => openModal("Gói tiêu dùng")}>
                                    Đăng ký
                                </button>
                            </div>
                            <div className="advantages">
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px", marginTop: "3px" }} />
                                    <p className="advantage-text">
                                        Chiết khấu 10-20% tại đại lý và điểm bán Tomiru cho mọi sản phẩm.
                                    </p>
                                </div>
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px", marginTop: "3px" }} />
                                    <p className="advantage-text">
                                        Điểm danh, tích điểm năm 2 mở thẻ miễn phí trọn đời.
                                    </p>
                                </div>
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px", marginTop: "3px" }} />
                                    <p className="advantage-text">
                                        Điểm danh, tích điểm năm 2 mở thẻ miễn phí trọn đời.
                                    </p>
                                </div>
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px", marginTop: "3px" }} />
                                    <p className="advantage-text">
                                        Giới thiệu thẻ đóng phí năm, hưởng 20% hoa hồng trực tiếp 264.000 đồng trên
                                        1.320.000 đồng mỗi thẻ.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="box-two">
                            <p className="name-package">{t("business-pack")}</p>
                            <p className="price">
                                1.320.000 đ<span style={{ fontSize: "20px" }}>/</span>
                                <span style={{ fontSize: "20px", marginLeft: "3px" }}>{t("month")}</span>
                            </p>
                            <div className="benefit">
                                <p>{t("annual-payment")}</p>
                                <div className="cheeseparings">Tiết kiệm 10%</div>
                            </div>
                            <div className="button-container">
                                <button className="button" onClick={() => openModal("Gói kinh doanh")}>
                                    Đăng ký
                                </button>
                            </div>
                            <div className="advantages">
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px" }} />
                                    <p className="advantage-text">Được nhận Combo hàng từ 1.7 triệu đến...</p>
                                </div>
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px" }} />
                                    <p className="advantage-text">Được mua hàng tại các đại lý,... tất cả sản phẩm.</p>
                                </div>
                                <div className="advantage">
                                    <DoneIcon style={{ fontSize: "18px" }} />
                                    <p className="advantage-text">Được sở hữu vị trí cố định tại mô hình.</p>
                                </div>
                                <div style={{ marginTop: "12px" }} className="advantage">
                                    <DoneIcon style={{ fontSize: "18px" }} />
                                    <p className="advantage-text">Có nguồn thu nhập khi... kinh doanh.</p>
                                </div>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>

                <div className="compare-container">
                    <h2 className="title-2">So sánh gói Tiêu Dùng và gói Kinh Doanh</h2>
                    <div className="criteria">
                        <div>
                            <p style={{ opacity: "0.5" }}>Trải nghiệm nâng cao</p>
                        </div>
                        <div className="criteria-content">
                            <p>Miễn phí</p>
                            <p>Tiêu dùng</p>
                            <p>Kinh doanh</p>
                        </div>
                    </div>

                    <div className="criteria-content-1">
                        <p style={{ opacity: "0.5" }}>Quyền truy cập sớm vào Grok</p>
                    </div>

                    <div className="criteria-content-2">
                        <div className="criteria-category">
                            <p>Quảng cáo trên dòng thời gian</p>
                            <p>Dành cho bạn và Đang theo dõi</p>
                        </div>
                        <div className="criteria-content">
                            <p>Đầy đủ</p>
                            <p>Một nửa</p>
                            <p style={{ marginRight: "13px" }}>Không có</p>
                        </div>
                    </div>

                    <div className="criteria-content-3">
                        <div className="criteria-category">
                            <p>Quảng cáo câu trả lời</p>
                        </div>
                        <div className="criteria-content">
                            <p>Nhỏ nhất</p>
                            <p style={{ marginRight: "45px" }}>Lớn</p>
                            <p style={{ marginRight: "15px" }}>Lớn nhất</p>
                        </div>
                    </div>

                    <div className="criteria-content-3">
                        <div className="criteria-category">
                            <p>{t("edit-post")}</p>
                        </div>
                        <div className="criteria-content">
                            <p>
                                <DoneIcon />
                            </p>
                            <p className="icon2">
                                <DoneIcon />
                            </p>
                            <p className="icon3">
                                <DoneIcon />
                            </p>
                        </div>
                    </div>

                    <div className="criteria-content-3">
                        <div className="criteria-category">
                            <p>Bài đăng dài hơn</p>
                        </div>
                        <div className="criteria-content">
                            <p>
                                <DoneIcon />
                            </p>
                            <p className="icon2">
                                <DoneIcon />
                            </p>
                            <p className="icon3">
                                <DoneIcon />
                            </p>
                        </div>
                    </div>

                    <div className="criteria-content-3">
                        <div className="criteria-category">
                            <p>Hoàn tác bài đăng</p>
                        </div>
                        <div className="criteria-content">
                            <p>
                                <DoneIcon />
                            </p>
                            <p className="icon2">
                                <DoneIcon />
                            </p>
                            <p className="icon3">
                                <DoneIcon />
                            </p>
                        </div>
                    </div>

                    <div className="criteria-content-3">
                        <div className="criteria-category">
                            <p>Phát video trong nền</p>
                        </div>
                        <div className="criteria-content">
                            <p>
                                <DoneIcon />
                            </p>
                            <p className="icon2">
                                <DoneIcon />
                            </p>
                            <p className="icon3">
                                <DoneIcon />
                            </p>
                        </div>
                    </div>

                    <div className="criteria-content-3">
                        <div className="criteria-category">
                            <p>Tải video xuống</p>
                        </div>
                        <div className="criteria-content">
                            <p>
                                <DoneIcon />
                            </p>
                            <p className="icon2">
                                <DoneIcon />
                            </p>
                            <p className="icon3">
                                <DoneIcon />
                            </p>
                        </div>
                    </div>
                </div>

                <CustomerServiceModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    loading={handleOpen}
                    selectedPackage={selectedPackage}
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box
                        sx={{
                            bgcolor: "white",
                            display: "flex",
                            position: "absolute",
                            top: "40%",
                            left: "47%",
                            padding: "20px",
                            borderRadius: "16px"
                        }}
                    >
                        <CircularProgress />
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default CustomerService;
