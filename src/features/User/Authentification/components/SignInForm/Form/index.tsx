import { FunctionComponent, PropsWithChildren } from 'react';

type FormProps = PropsWithChildren<{}>;

const Form: FunctionComponent<FormProps> = ({ children }) => {
    return <form>{children}</form>;
};

export default Form;
