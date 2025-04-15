interface TruncateTextProp {
    text: string;
    maxLength?: number;
};

export const truncateText = ({text, maxLength}: TruncateTextProp) => {
    const maxTextLength = maxLength ?? 20;
    return text.length <= maxTextLength 
    ? text
    : `${text.substring(0, maxTextLength)}...`;
}