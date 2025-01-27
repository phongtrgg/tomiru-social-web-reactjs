import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

import { SEARCH } from "../../../constants/path-constants";
import { TagResponse } from "../../../types/tag";
import { useTagsStyles } from "../TagsStyles";
import { useTranslation } from "react-i18next";

interface TagItemProps {
    tag: TagResponse;
    classes?: ReturnType<typeof useTagsStyles>;
}
const TagItem: FC<TagItemProps> = ({ tag, classes }): ReactElement => {
    const { t } = useTranslation();
    return (
        <Link to={{ pathname: SEARCH, state: { tag: tag.tagName } }}>
            <ListItem className={classes?.item}>
                <ListItemText
                    primary={tag.tagName}
                    secondary={
                        <Typography component="span" variant="body2" color="textSecondary">
                            {tag.tweetsQuantity} {t("tweets")}
                        </Typography>
                    }
                />
            </ListItem>
        </Link>
    );
};

export default TagItem;
