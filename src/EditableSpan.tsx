import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanType = {
    value: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('EditableSpan is called')
    const {value, changeTitle} = props;

    const [title, setTitle] = useState<string>(value)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        //setTitle(value)
        setEditMode(true)
        //changeTitle(value)
    }

    const offEditMode = () => {
        setEditMode(false)
        changeTitle(title);
    }


    return (
        editMode
            ? <TextField
                onChange={onChangeTitle}
                value={title}
                onBlur={offEditMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{value}</span>
    )
})