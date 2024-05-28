

type Props = {
    label?: string
    onChange: any
    value: any
    type: any
    className?: string

}

export const Input = ({ onChange, label, value, type, className }: Props) => {



    return <div className="flex flex-col gap-2">
        <label>{label}</label>
        <input className={`input rounded-none ${className}`} onChange={onChange} value={value} type={type} />
    </div>

}
