import React, { FC, memo, ReactElement, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MediaIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import { setImages } from "../../store/ducks/addTweetForm/actionCreators";
import { setOpenErrorSnackBar } from "../../store/ducks/actionSnackbar/actionCreators";
import { selectImages } from "../../store/ducks/addTweetForm/selector";
import { ImageObj } from "../AddTweetForm/AddTweetForm";

const UploadImages: FC = memo((): ReactElement => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const images = useSelector(selectImages);
    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleChangeFileInput = useCallback((event: Event): void => {
        if (event.target) {
            const target = event.target as HTMLInputElement;
            const files = target.files;
            if (files?.length && files.length > 0) {
                let imgs: ImageObj[] = [];
                for (const file of files) {
                    if (file.type.startsWith("image/")) {
                        const fileObj = new Blob([file]);
                        const img = { src: URL.createObjectURL(fileObj), file };
                        const IMGS = [...images, ...[...imgs, img]];
                        const size = IMGS.reduce((total, file) => total + file.file.size, 0) / (1024 * 1024);

                        if (size <= 100) {
                            imgs.push(img);
                        } else {
                            dispatch(setOpenErrorSnackBar("Total file's size must be more less than 100MB"));
                        }
                    } else {
                        dispatch(setOpenErrorSnackBar("File must be image"));
                    }
                }

                dispatch(setImages(imgs));
            }
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener("change", handleChangeFileInput);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener("change", handleChangeFileInput);
            }
        };
    }, []);

    return (
        <>
            <ActionIconButton actionText={"Media"} icon={MediaIcon} onClick={handleClickImage} size={"medium"} />
            <input ref={inputRef} type="file" id="upload-input" hidden multiple={true} />
        </>
    );
});

export default UploadImages;
