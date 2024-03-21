export const createExcerpt = (content, maxNumberOfWords, trailingIndicator = '...') => {
    const listOfWords = content.trim().split(' ');
    const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ');
    const excerpt = truncatedContent + trailingIndicator;
    const output = listOfWords.length > maxNumberOfWords ? excerpt : content;
    
    return output;
};