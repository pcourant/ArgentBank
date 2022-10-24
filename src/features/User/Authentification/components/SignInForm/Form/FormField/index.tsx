import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './FormField.module.css';

type FormFieldProps = PropsWithChildren<{
    type: string;
    name?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
}>;

const FormField: FunctionComponent<FormFieldProps> = ({
    type,
    name,
    required = false,
    onChange,
    placeholder,
    children,
}) => {
    const fieldClass = cx(
        type === 'checkbox' ? styles.inputRemember : styles.inputWrapper,
    );

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
            />
        </div>
    );
};

export default FormField;
