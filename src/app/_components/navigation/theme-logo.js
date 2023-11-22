
import LogoDark from "/public/logo-dark.svg";
import LogoLight from "/public/logo-light.svg";

export default function ThemeLogo ({label, className}) {
    return (
        <>
            <LogoLight aria-label={`${label}`} className={`dark:hidden ${className}`}></LogoLight>
            <LogoDark aria-label={`${label}`}  className={`hidden dark:inline ${className}`}></LogoDark>
        </>
    )
}