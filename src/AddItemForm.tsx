
import React, {useState, KeyboardEvent, ChangeEvent} from "react";

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

    const errorMessage = error
        ? <div className={'error-message'}>Title is required</div>
        : null;

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onKeyPress={onKeyPressAddItem}
                onChange={onChangeTitle}
            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}