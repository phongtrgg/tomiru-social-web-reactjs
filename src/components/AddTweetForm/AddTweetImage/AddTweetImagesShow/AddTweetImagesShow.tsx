import React, { FC, ReactElement } from "react";
import { ImageObj } from "../../AddTweetForm";
import { Image } from "../../../../types/common";
import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import { CloseIcon } from "../../../../icons";
import { useDispatch } from "react-redux";
import { removeImages } from "../../../../store/ducks/addTweetForm/actionCreators";
import { useAddTweetImagesShowStyles } from "./AddTweetImagesShowStyle";
interface AddTweetImagesShowProps {
    images: ImageObj[];
}
const AddTweetImagesShow: FC<AddTweetImagesShowProps> = ({ images }): ReactElement | null => {
    const dispatch = useDispatch();
    const classes = useAddTweetImagesShowStyles();
    const onClickRemoveImage = (index: number): void => {
        dispatch(removeImages(index));
    };
    const imgItem = (img: ImageObj, i: number) => (
        <div
            className={
                images.length > 0
                    ? images.length < 3
                        ? classes.image12
                        : images.length < 6
                        ? classes.image36
                        : classes.image6
                    : "none"
            }
            key={i}
        >
            {" "}
            <img src={img.src} alt={img.src} />
            <div className={classes.imageRemove}>
                <ActionIconButton
                    actionText={"Remove"}
                    icon={CloseIcon}
                    onClick={() => {
                        onClickRemoveImage(i);
                    }}
                    size={"medium"}
                />
            </div>
        </div>
    );

    return (
        <div
            className={
                images.length > 0
                    ? images.length < 3
                        ? classes.box12
                        : images.length < 6
                        ? classes.box36
                        : classes.box6
                    : "none"
            }
        >
            {images.length > 0 ? images.map((img, i) => imgItem(img, i)) : null}
        </div>
    );
};
export default AddTweetImagesShow;
