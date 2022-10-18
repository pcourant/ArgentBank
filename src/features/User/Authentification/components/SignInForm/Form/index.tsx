import { FunctionComponent } from 'react';

type FormProps = { children?: React.ReactNode };

const Form: FunctionComponent<FormProps> = ({ children }) => {
    return <form>{children}</form>;
};

export default Form;
