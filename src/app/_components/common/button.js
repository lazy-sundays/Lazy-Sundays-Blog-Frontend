"use client"

export default function Button({ 
    onClick = (() => {}), 
    ariaLabel = "button", 
    children, 
    className = ``, 
    disabled = false
}) {

    return (
        <button 
            className={
                `relative group w-fit p-4 sm:px-10 md:px-14 lg:px-120 m-auto rounded-md font-semibold text-lg bg-bgsecondary border border-bgsecondary
                ${disabled && `opacity-30`}
                ${!disabled && `transition-transform ease-in delay-100 hover:ease-out group-hover:delay-200 hover:-translate-x-1 hover:-translate-y-1`} 
                ${className}`
            }
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            <span className={!disabled && `group-hover:transition-none group-hover:invisible transition-[visibility] delay-200 ease-linear`}>
                {children}
            </span>
            { !disabled && 
                <>
                    <div aria-hidden
                        className={`-z-10 absolute w-full h-full p-4 bg-accentprimary rounded-md top-0 left-0 text-bgprimary ${className}`}>
                            {/* "shadow" text allows smooth transition of color between all possible states */}
                            {children}
                    </div>
                    <div aria-hidden
                        className={`-z-20 absolute w-full h-full p-4 bg-accentsecondary rounded-md top-0 left-0
                            transition ease-in delay-150 group-hover:transition group-hover:ease-out group-hover:delay-150
                            group-hover:translate-x-0.5 group-hover:translate-y-0.5 ${className}`}
                    />
                    <div aria-hidden
                        className={`-z-30 absolute w-full h-full p-4 bg-accenttertiary rounded-md top-0 left-0
                            transition ease-in delay-200 group-hover:transition group-hover:ease-out group-hover:delay-100
                            group-hover:translate-x-1 group-hover:translate-y-1 ${className}`}
                    />
                </>
            }
        </button>
    );
}