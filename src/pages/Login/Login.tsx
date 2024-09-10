import React, { ChangeEvent, FC, FormEvent, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, CircularProgress, IconButton, Typography } from "@material-ui/core";

import { useLoginStyles } from "./LoginStyles";
import { selectUserIsError, selectUserIsLoaded, selectUserIsLoading } from "../../store/ducks/user/selectors";
import { fetchSignIn, setUserLoadingStatus } from "../../store/ducks/user/actionCreators";
import { ACCOUNT_FORGOT, ACCOUNT_SIGNIN } from "../../constants/path-constants";
import { LoadingStatus } from "../../types/common";
import iconTomiru from "../../assets/icontomiru.png";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: FC = (): ReactElement => {
    const classes = useLoginStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const errorStatus = useSelector(selectUserIsError);
    const isLoading = useSelector(selectUserIsLoading);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.LOADING));
        };
    }, []);

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchSignIn({ email, password, history }));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
        if (isLoading || errorStatus) {
            dispatch(setUserLoadingStatus(LoadingStatus.SUCCESS));
        }
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);

        if (isLoading || errorStatus) {
            dispatch(setUserLoadingStatus(LoadingStatus.SUCCESS));
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <header className={classes.header}>
                <div className="logo">
                    <img src={iconTomiru} alt="" width={25} height={35} />
                    <p className={classes.titleHeader}>Tomiru</p>
                </div>
            </header>

            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <Typography variant="h5" className={classes.title}>
                        Đăng Nhập
                    </Typography>
                    {errorStatus && (
                        <Typography variant={"body1"} component={"div"} className={classes.error}>
                            Tên người dùng và mật khẩu bạn đã nhập không khớp với hồ sơ của chúng tôi. Vui lòng kiểm tra
                            lại và thử lại.
                        </Typography>
                    )}
                    <form onSubmit={onSubmit} className={classes.inputContainer}>
                        <div className={classes.inputFieldInfor}>
                            <label className={classes.inputLabel}> Email hoặc tên đăng nhập *</label>
                            <input
                                className={classes.input}
                                type="email"
                                placeholder="Email hoặc tên đăng nhập"
                                onChange={handleChangeEmail}
                                required
                            />
                        </div>

                        <div className={classes.inputFieldInfor}>
                            <label className={classes.inputLabel}> Mật khẩu *</label>
                            <input
                                className={classes.input}
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                onChange={handleChangePassword}
                                required
                            />
                            <IconButton
                                className={classes.eyeIcon}
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                            </IconButton>
                        </div>
                        <Link to={ACCOUNT_FORGOT} className={classes.forgotPassword}>
                            <p className={classes.textForgotPassword}>Quên mật khẩu?</p>
                        </Link>
                        <Button
                            variant="contained"
                            type="submit"
                            className={classes.button}
                            fullWidth
                            disabled={!(email && password) || isLoading}
                        >
                            {/* {isLoading ? <CircularProgress size={24} /> : "  Đăng Nhập"} */}Đăng Nhập
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
