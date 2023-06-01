import FormInput from "./FormInput";

export default function FormAddressSection({ defaultValues }) {
    if (defaultValues === undefined) {
        defaultValues = {}
    }
    return (
        <>
            <FormInput label={"Street"} type={"text"} defaultValue={defaultValues.street} />
            <div className="flex space-x-3">
                <div className="w-2/6">
                    <FormInput label={"ZIP"} type={"text"} defaultValue={defaultValues.zip} />
                </div>
                <div className="w-3/6">
                    <FormInput label={"City"} type={"text"} defaultValue={defaultValues.city} />
                </div>
                <div className="w-1/6">
                    <FormInput label={"Country"} type={"text"} placeholder={'DE'} defaultValue={defaultValues.country} />
                </div>
            </div>
        </>
    )
}