import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {

    const [error, setError] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')

    const onClickAddItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true);
        }
        setTitle('');
    };

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }

    return (
        <div>
            <TextField
                size={'small'}
                value={title}
                onKeyPress={onKeyPressAddItem}
                onChange={onChangeTitle}
                error={error}
                label={'Title'}
                variant={"outlined"}
                helperText={error && 'Title is required'}
            />
            <IconButton
                color={'primary'}
                onClick={onClickAddItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}