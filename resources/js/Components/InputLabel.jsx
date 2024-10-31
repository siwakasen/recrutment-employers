export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                className
                    ? className
                    : `block font-medium text-sm text-gray-700 dark:text-gray-300 `
            }
        >
            {value ? value : children}
        </label>
    );
}
