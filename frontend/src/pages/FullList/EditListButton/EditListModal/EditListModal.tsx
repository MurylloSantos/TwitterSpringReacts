import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Dialog, DialogContent, Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

import { useEditListModalStyles } from "./EditListModalStyles";
import UploadProfileImage from "../../../../components/UploadProfileImage/UploadProfileImage";
import CreateListsModalInput
    from "../../../Lists/ListsHeader/CreateListsModal/CreateListsModalInput/CreateListsModalInput";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import ManageMembersModal from "./ManageMembersModal/ManageMembersModal";
import DeleteListModal from "./DeleteListModal/DeleteListModal";
import { editList } from "../../../../store/ducks/list/actionCreators";
import { uploadImage } from "../../../../util/upload-image-helper";
import { selectListItem } from "../../../../store/ducks/list/selectors";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";

interface EditListModalProps {
    visible?: boolean;
    onClose: () => void;
}

export interface EditListModalFormProps {
    id: number;
    listName: string;
    description: string;
    isPrivate: boolean;
    wallpaper: string;
}

const editListModalFormSchema = (t: TFunction<"translation", undefined>) => yup.object().shape({
    listName: yup.string().min(1, t("LIST_NAME_ERROR", { defaultValue: "List Name can’t be blank" })).required()
});

const EditListModal: FC<EditListModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 569 });
    const classes = useEditListModalStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const { t } = useTranslation();
    const [wallpaper, setWallpaper] = useState<ImageObj>();
    const [isListPrivate, setIsListPrivate] = useState<boolean>(false);
    const listWrapperSrc = list?.wallpaper ?? list?.altWallpaper;

    const { control, handleSubmit, formState: { errors } } = useForm<EditListModalFormProps>({
        defaultValues: {
            id: list?.id,
            listName: list?.listName,
            description: list?.description,
            isPrivate: list?.isPrivate,
            wallpaper: list?.wallpaper
        },
        resolver: yupResolver(editListModalFormSchema(t)),
        mode: "onChange"
    });

    useEffect(() => {
        setIsListPrivate(list?.isPrivate!);
    }, [visible]);

    const onSubmit = async (data: EditListModalFormProps): Promise<void> => {
        let wallpaperResponse: string | undefined = undefined;

        if (wallpaper) {
            wallpaperResponse = await uploadImage(wallpaper.file);
        }
        dispatch(editList({
            ...data,
            isPrivate: isListPrivate,
            wallpaper: wallpaperResponse
        }));
        onClose();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setIsListPrivate(event.target.checked);
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTitleComponent
                    title={t("EDIT_LIST", { defaultValue: "Edit List" })}
                    onClose={onClose}
                >
                    <Button type="submit" variant="contained" color="primary" size="small">
                        {t("DONE", { defaultValue: "Done" })}
                    </Button>
                </DialogTitleComponent>
                <DialogContent className={globalClasses.dialogContent}>
                    <div>
                        <div className={classes.wallpaperWrapper}>
                            <img
                                className={classes.wallpaperImg}
                                key={listWrapperSrc}
                                src={listWrapperSrc}
                                alt={listWrapperSrc}
                            />
                            <div className={classes.wallpaperEditImg}>
                                <UploadProfileImage name={"wallpaper"} image={wallpaper} onChangeImage={setWallpaper} />
                            </div>
                        </div>
                        <Controller
                            name="listName"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <CreateListsModalInput
                                    label={t("NAME", { defaultValue: "Name" })}
                                    name="name"
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
                                    label={t("DESCRIPTION", { defaultValue: "Description" })}
                                    name={"description"}
                                    onChange={onChange}
                                    value={value}
                                    maxTextLength={50}
                                    hasDescription
                                />
                            )}
                        />
                        <div className={globalClasses.itemInfoWrapper}>
                            <div className={classes.footerWrapper}>
                                <Typography variant={"body1"} component={"div"}>
                                    {t("MAKE_PRIVATE", { defaultValue: "Make private" })}
                                </Typography>
                                <Checkbox
                                    checked={isListPrivate}
                                    onChange={handleChange}
                                    name="private"
                                    color="primary"
                                />
                            </div>
                            <Typography variant={"subtitle2"} component={"div"}>
                                {t("MAKE_PRIVATE_DESCRIPTION", { defaultValue: "When you make a List private, only you can see it." })}
                            </Typography>
                        </div>
                        <ManageMembersModal />
                        <DeleteListModal />
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditListModal;
