import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useCreateListsModalStyles } from "./CreateListsModalStyles";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { uploadImage } from "../../../../util/upload-image-helper";
import CreateListsModalInput from "./CreateListsModalInput/CreateListsModalInput";
import { createList, fetchLists, fetchUserLists, resetStatus } from "../../../../store/ducks/lists/actionCreators";
import { wallpapers } from "../../../../util/wallpapers";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";
import SearchIcon from "@mui/icons-material/Search";
import { useNotificationItemStyles } from "../../../Notifications/NotificationsPage/NotificationItem/NotificationItemStyles";
import { useTranslation } from "react-i18next";
import { selectLoadingState } from "../../../../store/ducks/lists/selectors";
import { useCheckStatus } from "../../../../hook/useCheckStatus";

interface CreateListsModalProps {
    visible?: boolean;
    onClose: () => void;
}

interface CreateListsModalFormProps {
    listName: string;
    description: string;
    isPrivate: boolean;
    wallpaper: string;
}

const CreateListsModalFormSchema = yup.object().shape({
    listName: yup.string().min(1, "List Name can’t be blank").required()
});

const CreateListsModal: FC<CreateListsModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 550 });
    const classes = useCreateListsModalStyles();
    const classesAvatar = useNotificationItemStyles();
    const dispatch = useDispatch();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const status = useSelector(selectLoadingState);
    const { t } = useTranslation();
    const checkStatus = useCheckStatus();
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateListsModalFormProps>({
        resolver: yupResolver(CreateListsModalFormSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: CreateListsModalFormProps): Promise<void> => {
        const altWallpaper = Math.floor(Math.random() * wallpapers.length);
        let wallpaperResponse: string | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }

        dispatch(
            createList({
                ...data,
                altWallpaper: wallpapers[altWallpaper],
                wallpaper: wallpaperResponse
            })
        );
    };

    if (!visible) {
        return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks

    checkStatus(
        status,
        () => {
            dispatch(resetStatus());
            dispatch(fetchLists());
            dispatch(fetchUserLists());
            onClose();
        },
        () => {},
        "Group created successfully",
        "Group creation failed"
    );

    return (
        <Dialog open={visible}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent title={"Tạo Nhóm"} onClose={onClose} />

                <DialogContent className={(globalClasses.dialogContent, classes.dialogContent)}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ height: "100%" }}>
                            <div className={classes.wallpaperWrapper}>
                                <img className={classes.wallpaperImg} key={wallpaper?.src} src={wallpaper?.src} />
                                <div className={classes.wallpaperEditImg}>
                                    <UploadProfileImage
                                        name={"wallpaper"}
                                        image={wallpaper}
                                        onChangeImage={setWallpaper}
                                    />
                                </div>
                            </div>
                            <Controller
                                name="listName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <CreateListsModalInput
                                        label={"Tên  Nhóm"}
                                        name={"name"}
                                        helperText={errors.listName?.message}
                                        error={!!errors.listName}
                                        onChange={onChange}
                                        value={value}
                                        maxTextLength={25}
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <CreateListsModalInput
                                        label={"Mô Tả"}
                                        name={"description"}
                                        onChange={onChange}
                                        value={value}
                                        maxTextLength={50}
                                    />
                                )}
                            />

                            <div>
                                <Typography variant={"body1"} component={"div"}>
                                    <span style={{ fontWeight: "bold" }}> Gợi Ý</span>
                                </Typography>
                                <Box
                                    sx={{
                                        marginTop: 5,
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #ccc",
                                        borderRadius: "25px",
                                        padding: "2px 10px 2px 10px"
                                    }}
                                >
                                    <TextField
                                        variant="standard"
                                        placeholder={t("search_people")}
                                        InputProps={{
                                            disableUnderline: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Box>
                                <div>
                                    {" "}
                                    <div className={classes.footerWrapper}>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                display: "flex"
                                            }}
                                        >
                                            {" "}
                                            <div id={"userInfo"} style={{ marginTop: 4 }}>
                                                <Avatar
                                                    className={classesAvatar.notificationAvatar}
                                                    src={
                                                        "data:image/jpeg;base64,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"
                                                    }
                                                    alt={"sadasd"}
                                                />
                                            </div>
                                            <div>
                                                <Typography variant={"h6"} component={"div"}>
                                                    Bé
                                                </Typography>
                                                <Typography variant={"body1"} component={"div"}>
                                                    @applemeome
                                                </Typography>
                                            </div>
                                        </div>
                                        <Controller
                                            name="isPrivate"
                                            control={control}
                                            defaultValue={false}
                                            render={() => <Checkbox name="private" color="primary" />}
                                        />
                                    </div>
                                    <div className={classes.footerWrapper}>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                display: "flex"
                                            }}
                                        >
                                            {" "}
                                            <div id={"userInfo"} style={{ marginTop: 4 }}>
                                                <Avatar
                                                    className={classesAvatar.notificationAvatar}
                                                    src={
                                                        "data:image/jpeg;base64,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"
                                                    }
                                                    alt={"sadasd"}
                                                />
                                            </div>
                                            <div>
                                                <Typography variant={"h6"} component={"div"}>
                                                    Bé
                                                </Typography>
                                                <Typography variant={"body1"} component={"div"}>
                                                    @applemeome
                                                </Typography>
                                            </div>
                                        </div>
                                        <Controller
                                            name="isPrivate"
                                            control={control}
                                            defaultValue={false}
                                            render={() => <Checkbox name="private" color="primary" />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={globalClasses.itemInfoWrapper}>
                                <Typography variant={"body1"} component={"div"}>
                                    Nhóm Kín
                                </Typography>
                                <div className={classes.footerWrapper}>
                                    <Typography variant={"subtitle2"} component={"div"}>
                                        Nhóm kín Nếu bạn tạo nhóm kín, chỉ có bạn nhìn thấy
                                    </Typography>
                                    <Controller
                                        name="isPrivate"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field: { onChange, value } }) => (
                                            <Checkbox
                                                checked={value}
                                                onChange={onChange}
                                                name="private"
                                                color="primary"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                                <Button
                                    disabled={!watch("listName")}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Lưu
                                </Button>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={onClose}
                                    style={{ borderColor: "#A1A1A1", color: "black" }}
                                >
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateListsModal;
