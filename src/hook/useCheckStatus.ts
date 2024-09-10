import { useDispatch } from "react-redux";
import { LoadingStatus } from "../types/common";
import { setOpenErrorSnackBar, setOpenSnackBar } from "../store/ducks/actionSnackbar/actionCreators";
import { t } from "i18next";

export const useCheckStatus = () => {
    const dispatch = useDispatch();

    const checkStatus = (
        status: LoadingStatus,
        onSuccess?: () => void,
        onError?: () => void,
        successMessage?: string,
        errorMessage?: string
    ) => {
        if (status === LoadingStatus.SUCCESS) {
            if (onSuccess) {
                onSuccess();
            }
            if (successMessage) {
                dispatch(setOpenSnackBar(t(successMessage)));
            }
        }

        if (status === LoadingStatus.ERROR) {
            if (onError) {
                onError();
            }
            if (errorMessage) {
                dispatch(setOpenErrorSnackBar(t(errorMessage)));
            }
        }
    };

    return checkStatus;
};
