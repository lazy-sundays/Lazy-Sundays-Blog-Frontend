"use client"
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({children, style, language, PreTag, ...props}) {

    return(
        <SyntaxHighlighter
            {...props}
            style={oneDark}
            customStyle={{
                backgroundColor: 'rgb(var(--bg-code))',
                textShadow: "transparent",
                color: "rgb(var(--text-code))",
            }}
            codeTagProps={{

            
            }}
            language={language}
            PreTag={PreTag}
            showLineNumbers={true}
            showInlineLineNumbers={true}
        >
            {children}
        </SyntaxHighlighter>
    );
}