import { FunctionComponent, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './FormField.module.css';

type FormFieldProps = PropsWithChildren<{
    type: string;
    name: string;
}>;

const FormField: FunctionComponent<FormFieldProps> = ({
    type,
    name,
    children,
}) => {
    const fieldClass = cx(
        type === 'checkbox' ? styles.inputRemember : styles.inputWrapper,
    );

    return (
        <div className={fieldClass}>
            <label htmlFor={name}>{children}</label>
            <input type={type} id={name} name={name} />
        </div>
    );
};

export default FormField;
