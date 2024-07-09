import React from 'react'

export const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    customClasses,
    type
}) => {
    return (
        <button
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={`cursor-pointer bg-yellow-50 py-2 px-4 rounded-md text-black font-semibold ${customClasses}`}
        >
            {
                children ? (
                    <div className='flex items-center gap-1'>
                        <span >
                            {text}
                        </span>
                        {children}
                    </div>
                ) : (text)
            }
        </button>
    )
}
