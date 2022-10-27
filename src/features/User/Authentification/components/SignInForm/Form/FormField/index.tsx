/* eslint-disable indent */
import {
    FunctionComponent,
    PropsWithChildren,
    ChangeEventHandler,
    HTMLInputTypeAttribute,
} from 'react';
import cx from 'classnames';

import styles from './FormField.module.css';

type FormFieldProps = PropsWithChildren<{
    type?: HTMLInputTypeAttribute;
    name?: string;
    required?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
}>;

const FormField: FunctionComponent<FormFieldProps> = ({
    type = 'text',
    name,
    required = false,
    onChange,
    placeholder,
    children,
}) => {
    const fieldClass = cx(
        type === 'checkbox' ? styles.inputRemember : styles.inputWrapper,
    );

    const inputAutoCompleteSwitch = (type: HTMLInputTypeAttribute) => {
        switch (type) {
            case 'password':
                return 'current-password';
            case 'email':
                return 'username';
            default:
                return undefined;
        }
    };

    return (
        <div className={fieldClass}>
            <label htmlFor={name}>{children}</label>
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={inputAutoCompleteSwitch(type)}
            />
        </div>
    );
};

export default FormField;
