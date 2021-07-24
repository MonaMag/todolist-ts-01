import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log('AddItemForm is called')
    const {
        addItem
    } = props;

    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('')

    const onClickAddItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            addItem(trimmedTitle)
            //addItem(trimmedTitle)
            setTitle('');
        } else {
            setError('Title is required');
        }
        //setTitle('');
    };

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null);
        }
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        <div>
            <TextField
                size={'small'}
                value={title}
                onKeyPress={onKeyPressAddItem}
                onChange={onChangeTitle}
                error={!!error}
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
})