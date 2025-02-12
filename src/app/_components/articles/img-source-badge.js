import Link from "next/link";


export default function ImageSourceBadge({ srcUrl = null, srcText, className = "" }) {

    return ( srcText &&
        <div className={`text-xs ${className}`}>
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