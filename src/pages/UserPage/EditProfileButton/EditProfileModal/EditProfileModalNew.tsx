import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import { Avatar, Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { selectUserData } from "../../../../store/ducks/user/selectors";
import { uploadMultiImages } from "../../../../util/upload-image-helper";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";

import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { updatedUserData } from "../../../../store/ducks/user/actionCreators";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useEditProfileModalNewStyle } from "./EditProfileModalNewStyle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTranslation } from "react-i18next";

import { setOpenErrorSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import { LoadingStatus } from "../../../../types/common";

interface EditProfileModalProps {
    visible?: boolean;
    onClose: () => void;
}

export interface EditProfileFormProps {
    fullName: string;
    gender: string;
    phoneNumber: string;
    dateOfBirth: string;
    biO: string;
}

export const EditProfileFormSchema = yup.object().shape({
    fullName: yup.string().min(1, "Name can’t be blank").required(),
    gender: yup.string().required("Gender is required"),
    phoneNumber: yup.string().required("Phone number is required")
});

const EditProfileModalNew: FC<EditProfileModalProps> = ({ visible, onClose }): ReactElement | null => {
    // const globalClasses = useGlobalStyles({});
    const classes = useEditProfileModalNewStyle();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [avatar, setAvatar] = useState<ImageObj>();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [stringAvatar, setStringAvatar] = useState<string>("");
    const [stringWallpaper, setStringWallpaper] = useState<string>("");
    const [uploadImgStatus, setUploadImgStatus] = useState<LoadingStatus>(LoadingStatus.NEVER);
    const [uploadImgStatus1, setUploadImgStatus1] = useState<LoadingStatus>(LoadingStatus.NEVER);
    const { t } = useTranslation();
    useEffect(() => {
        if (userData) {
            setStringAvatar(userData.avatar);
            setStringWallpaper(userData.wallpaper);
        }
    }, [userData]);
    useEffect(() => {
        const getAvatarUrl = async () => {
            try {
                if (avatar) {
                    setUploadImgStatus(LoadingStatus.LOADING);
                    const avatarResponse = await uploadMultiImages([avatar.file]);
                    setStringAvatar(avatarResponse[0]);
                    setUploadImgStatus(LoadingStatus.SUCCESS);
                }
            } catch {
                dispatch(setOpenErrorSnackBar(t("Avatar-error-upload")));
                setUploadImgStatus(LoadingStatus.ERROR);
            }
        };
        getAvatarUrl();
        if (!avatar) {
            setUploadImgStatus(LoadingStatus.NEVER);
        }
    }, [avatar]);
    useEffect(() => {
        const getWallpaperUrl = async () => {
            try {
                if (wallpaper) {
                    setUploadImgStatus1(LoadingStatus.LOADING);
                    const wallpaperResponse = await uploadMultiImages([wallpaper.file]);
                    setStringWallpaper(wallpaperResponse[0]);
                    setUploadImgStatus1(LoadingStatus.SUCCESS);
                }
            } catch {
                dispatch(setOpenErrorSnackBar(t("Wallpaper-error-upload")));
                setUploadImgStatus1(LoadingStatus.ERROR);
            }
        };
        getWallpaperUrl();
    }, [wallpaper]);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<EditProfileFormProps>({
        defaultValues: {
            fullName: userData?.fullName || "",
            gender: userData?.gender || "",
            phoneNumber: userData?.phone.toString() || "",
            dateOfBirth: userData?.birthday,
            biO: userData?.about || ""
        },
        resolver: yupResolver(EditProfileFormSchema)
    });

    const onSubmit = (data: EditProfileFormProps): void => {
        const genders = ["Male", "Female", "Other"];

        dispatch(
            updatedUserData({
                phone: data.phoneNumber,
                fullName: data.fullName,
                about: data.biO,
                birthday: data.dateOfBirth,
                avatar: stringAvatar,
                wallpaper: stringWallpaper,
                gender: genders.findIndex((g) => g === data.gender).toString()
            })
        );

        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.padd}>
                    {/* <div className={classes.headBox}> */}
                    <div className={classes.flex}>
                        <div className={classes.header}>
                            <BorderColorIcon className={classes.icon} />
                            <b className={classes.textTitle}>{t("edit_profile")}</b>
                        </div>
                        <div className={classes.buttonBox}>
                            {" "}
                            <CloseButton onClose={onClose} />
                        </div>
                    </div>
                    {/* </div> */}
                </div>{" "}
                <DialogContent
                    style={{
                        width: 600,
                        height: 500,
                        padding: 0,
                        overflowX: "hidden"
                    }}
                >
                    <Box>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={wallpaper?.src}
                                alt={"wallpaper"}
                                src={userData?.wallpaper && !wallpaper?.src ? userData?.wallpaper : wallpaper?.src}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper} />
                            </div>
                        </div>
                        <div className={classes.avatarWrapper}>
                            <UploadProfileImage name={"avatar"} image={avatar} onChangeImage={setAvatar} />
                            <Avatar
                                key={avatar?.src}
                                src={userData?.avatar && !avatar?.src ? userData?.avatar : avatar?.src}
                            >
                                <img alt="default-img" src={DEFAULT_PROFILE_IMG} />
                            </Avatar>
                        </div>
                    </Box>

                    <FormControl
                        variant="outlined"
                        style={{
                            width: "100%",
                            padding: 32
                        }}
                    >
                        <FormGroup aria-label="position">
                            <Controller
                                name="fullName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <div>
                                        <TextField
                                            label={t("full_name")}
                                            variant="outlined"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            margin="normal"
                                        />
                                    </div>
                                )}
                            />
                            <Controller
                                name="gender"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div>
                                        <FormLabel component="legend">{t("gender")}</FormLabel>
                                        <RadioGroup
                                            {...field}
                                            onChange={(event) => field.onChange(event.target.value)}
                                            row
                                        >
                                            <FormControlLabel
                                                value="Male"
                                                control={
                                                    <Radio
                                                        classes={{ root: classes.radio, checked: classes.checked }}
                                                    />
                                                }
                                                label={t("male")}
                                                checked={field.value === "Male"}
                                            />
                                            <FormControlLabel
                                                value="Female"
                                                control={
                                                    <Radio
                                                        classes={{ root: classes.radio, checked: classes.checked }}
                                                    />
                                                }
                                                label={t("female")}
                                                checked={field.value === "Female"}
                                            />
                                            <FormControlLabel
                                                value="Other"
                                                control={
                                                    <Radio
                                                        classes={{ root: classes.radio, checked: classes.checked }}
                                                    />
                                                }
                                                label={t("other")}
                                                checked={field.value === "Other"}
                                            />
                                        </RadioGroup>
                                    </div>
                                )}
                            />

                            <Controller
                                name="dateOfBirth"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <div>
                                        <TextField
                                            label={t("date_of_birth")}
                                            type="date"
                                            variant="outlined"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </div>
                                )}
                            />

                            <Controller
                                name="phoneNumber"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <div>
                                        <TextField
                                            label={t("phone_number")}
                                            variant="outlined"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}
                                            margin="normal"
                                        />
                                    </div>
                                )}
                            />
                            <Controller
                                name="biO"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <div>
                                        <TextField
                                            label="Bio"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={value}
                                            onChange={onChange}
                                            margin="normal"
                                        />
                                    </div>
                                )}
                            />
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        borderTop: "1px solid grey",
                        alignItems: "center",
                        height: "50px"
                    }}
                >
                    <Button
                        disabled={
                            uploadImgStatus === LoadingStatus.LOADING || uploadImgStatus1 === LoadingStatus.LOADING
                        }
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        {t("save")}
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};

export default EditProfileModalNew;
