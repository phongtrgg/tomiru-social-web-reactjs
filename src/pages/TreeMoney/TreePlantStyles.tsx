import { makeStyles } from "@material-ui/core"; // Hoặc "@mui/material" cho phiên bản mới

// Định nghĩa các styles cho nút cây
export const useTreePlantStyles = makeStyles((theme) => ({
    tableHead: {
        backgroundColor: "#F5F5F5",
        borderRadius: "10px"
    },

    tableHeadCellFirst: {
        color: "white",

        borderRadius: "10px 0 0 0 "
    },
    tableHeadCellEnd: {
        color: "white",
        width: 100,
        borderRadius: "0 10px 0 0 "
    },
    pagination: {
        "& .MuiPaginationItem-ellipsis": {
            display: "none"
        },
        "& .MuiPaginationItem-icon": {
            display: "none"
        },
        "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#1D9BF0", // Màu nền xanh khi được chọn
            color: "white", // Màu chữ trắng khi được chọn
            "&:hover": {
                backgroundColor: "#1D9BF0" // Màu nền khi hover
            }
        }
    },
    selectedTab: {
        color: "black",
        paddingRight: "20px",
        paddingLeft: "20px"
    },
    tab: {
        color: "black",
        fontWeight: 700,
        paddingRight: "20px",
        paddingLeft: "20px"
    }
}));
