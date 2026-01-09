'use client'
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form"

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TForm = {
  children: ReactNode;
  onsubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
} & TFormConfig;

const HCForm = ({children,onsubmit,defaultValues,resolver}: TForm) => {
    const FormConfig:TFormConfig = {
        resolver: '',
        defaultValues: {},
    }

    if (defaultValues) {
        FormConfig['defaultValues'] = defaultValues
    }
    if (defaultValues) {
        FormConfig['resolver'] = resolver
    }

    const methods = useForm(FormConfig)
    const {handleSubmit} = methods;
    return (
        <FormProvider {...methods}>
            <form className=" space-y-6" onSubmit={handleSubmit(onsubmit)}>{children}</form>
        </FormProvider>
    )
}

export default HCForm;