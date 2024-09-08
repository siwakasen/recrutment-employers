export default function SelectBox({
    options,
    currentValue,
    ...props
}) {
    return (
        <select
            {...props}
            defaultValue={currentValue}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:text-slate-200"
        >
            {options.map((option, index) => (
                <option key={index} value={option.value} className="dark:text-slate-200">
                    {option.label}
                </option>
            ))}
        </select>
    );
}
