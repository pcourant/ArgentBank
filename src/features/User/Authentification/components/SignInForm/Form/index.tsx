import { FunctionComponent, PropsWithChildren } from 'react';

// type FormProps = { children?: React.ReactNode };

type FormProps = PropsWithChildren<{
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}>;

const Form: FunctionComponent<FormProps> = ({ onSubmit, children }) => {
    return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
