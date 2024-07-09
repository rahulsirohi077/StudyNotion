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
                    <div className="flex gap-1 items-center bg-yellow-50 py-2 px-4 rounded-md text-black font-semibold">
                        <span>
                            {text}
                        </span>
                        {children}
                    </div>
                ) : (<div className="flex items-center bg-yellow-50 py-2 px-4 rounded-md text-black font-semibold">
                    {text}
                </div>)
            }
        </button>
    )
}
