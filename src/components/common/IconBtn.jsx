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
        className='cursor-pointer'
        >
            {
                children ? (
                    <div className='flex items-center gap-1 bg-yellow-50 py-2 px-4 rounded-md'>
                        <span>
                            {text}
                        </span>
                        {children}
                    </div>
                ) : (text)
            }
        </button>
    )
}
