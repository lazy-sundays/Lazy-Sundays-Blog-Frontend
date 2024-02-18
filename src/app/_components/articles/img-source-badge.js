import Link from "next/link";


export default function ImageSourceBadge({ srcUrl = null, srcText = "", className = "" }) {

    return (
        <div className={` ${className}`}>
            <p>
                Image Source: {srcUrl ? 
                                    <Link 
                                        href={srcUrl}
                                        className="text-accentprimary hover:underline hover:decoration-accentprimary hover:decoration-1"
                                    >
                                            {srcText}
                                    </Link> 
                                    : <> {srcText} </>
                                 }
            </p>
        </div>
    );
}